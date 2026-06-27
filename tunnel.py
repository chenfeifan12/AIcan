"""localtunnel client using HTTP CONNECT proxy"""
import socket
import ssl
import json
import urllib.request
import sys
import threading
import time

PROXY_HOST = "127.0.0.1"
PROXY_PORT = 18080
LOCAL_PORT = 5173
LOCALTUNNEL_HOST = "loca.lt"

# Step 1: Register tunnel
req = urllib.request.Request(f"https://{LOCALTUNNEL_HOST}/?new", method="POST")
resp = urllib.request.urlopen(req, timeout=10)
data = json.loads(resp.read())
tunnel_url = data["url"]
remote_port = data["port"]
print(f"\n{'='*60}")
print(f"  PUBLIC URL: {tunnel_url}")
print(f"{'='*60}\n")
sys.stdout.flush()

# Step 2: HTTP CONNECT through proxy
sock = socket.create_connection((PROXY_HOST, PROXY_PORT), timeout=10)
connect_req = f"CONNECT {LOCALTUNNEL_HOST}:{remote_port} HTTP/1.1\r\nHost: {LOCALTUNNEL_HOST}:{remote_port}\r\n\r\n"
sock.sendall(connect_req.encode())

# Read proxy response
resp_data = b""
while b"\r\n\r\n" not in resp_data:
    chunk = sock.recv(4096)
    if not chunk:
        print("Proxy connection failed")
        sys.exit(1)
    resp_data += chunk

if b"200" not in resp_data.split(b"\r\n")[0]:
    print(f"Proxy error: {resp_data.split(b'\\r\\n')[0].decode()}")
    sys.exit(1)

print("Connected via proxy")
sys.stdout.flush()

# Step 3: TLS handshake
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
sock.settimeout(30)
tls = ctx.wrap_socket(sock, server_hostname=LOCALTUNNEL_HOST)
sock.settimeout(None)
print("TLS established")
sys.stdout.flush()

# Step 4: Relay loop
# localtunnel sends HTTP requests as raw bytes through this TLS connection
# Format: <request line>\r\n<headers>\r\n\r\n<body>
# We read, forward to local, send back response

def handle_request(request_bytes):
    """Forward request to local server and return response"""
    try:
        local = socket.create_connection(("127.0.0.1", LOCAL_PORT), timeout=10)
        local.sendall(request_bytes)
        
        # Read response
        response = b""
        local.settimeout(10)
        while True:
            try:
                chunk = local.recv(65536)
                if not chunk:
                    break
                response += chunk
                # Stop reading if we have full response
                if b"\r\n\r\n" in response:
                    # Check for Content-Length
                    header_end = response.find(b"\r\n\r\n")
                    headers = response[:header_end].decode("latin-1", errors="replace")
                    body = response[header_end + 4:]
                    cl = None
                    for line in headers.split("\r\n"):
                        if line.lower().startswith("content-length:"):
                            cl = int(line.split(":", 1)[1].strip())
                            break
                    if cl is not None and len(body) >= cl:
                        break
                    # If no Content-Length, check for chunked or connection close
                    if "transfer-encoding: chunked" in headers.lower():
                        if body.endswith(b"0\r\n\r\n"):
                            break
                    # For connection: close, read until EOF
                    if "connection: close" in headers.lower():
                        continue
                    # Otherwise assume we got it all
                    break
            except socket.timeout:
                break
        local.close()
        return response
    except Exception as e:
        print(f"Forward error: {e}")
        return b"HTTP/1.0 502 Bad Gateway\r\n\r\n"

while True:
    try:
        # Read request from tunnel
        request_data = bytearray()
        tls.settimeout(60)
        while True:
            try:
                chunk = tls.recv(65536)
            except socket.timeout:
                print("Tunnel idle, sending keepalive...")
                break
            if not chunk:
                print("Tunnel disconnected")
                sys.exit(0)
            request_data.extend(chunk)
            if b"\r\n\r\n" in request_data:
                # Check if we need to read body
                header_end = request_data.find(b"\r\n\r\n")
                headers = request_data[:header_end].decode("latin-1", errors="replace")
                cl = None
                for line in headers.split("\r\n"):
                    if line.lower().startswith("content-length:"):
                        cl = int(line.split(":", 1)[1].strip())
                        break
                if cl is not None:
                    body_start = header_end + 4
                    current_body = request_data[body_start:]
                    if len(current_body) >= cl:
                        break
                else:
                    break
        
        if len(request_data) == 0:
            continue
        
        # Forward to local and get response
        response = handle_request(bytes(request_data))
        if response:
            tls.sendall(response)
    except Exception as e:
        print(f"Error: {e}")
        time.sleep(1)