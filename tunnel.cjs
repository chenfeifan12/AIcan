const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: 5173 });
  console.log('Tunnel URL:', tunnel.url);
  
  tunnel.on('close', () => {
    console.log('Tunnel closed');
  });
  
  tunnel.on('error', (err) => {
    console.error('Tunnel error:', err);
  });
})();