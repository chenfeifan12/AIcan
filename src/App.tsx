import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ToastContainer } from "./components/common/Toast";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import BottomNav from "./components/layout/BottomNav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Learn from "./pages/Learn";
import Module from "./pages/Module";
import Profile from "./pages/Profile";
import Community from "./pages/Community";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream dark:bg-primary-dark">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/learn/:language" element={<Learn />} />
            <Route path="/learn/:language/:module" element={<Module />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </AppLayout>
        <ToastContainer />
      </LanguageProvider>
    </Router>
  );
}
