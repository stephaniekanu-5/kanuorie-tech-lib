import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Courses from "./pages/courses";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Admin from "./pages/Admin";
import TermsOfService from "./pages/TermsOfService.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const { settings } = useContext(AuthContext);

  return (
   <div className={settings.darkMode ? "bg-gray-900 text-gray-500" : "bg-gray-50"}>
    <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/termsOfService" element={<TermsOfService />} />

        {/* Protected Routes */}
        <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<Admin />} />
        {/* Fallback */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;