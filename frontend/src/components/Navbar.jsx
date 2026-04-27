import { useState, useContext } from "react";
import {
  Menu,
  X,
  Home,
  Book,
  User,
  Settings,
  Bell,
  HelpCircle,
  Info,
  Phone,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/Logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { user, token, logout, unreadCount } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItem = ({ isActive }) =>
    `flex items-center gap-2 py-2 px-3 rounded-lg transition ${
      isActive
        ? "bg-purple-100 text-purple-600 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const closeMenu = () => setOpen(false);

  return (
    <nav className="bg-black sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src={logo} className="w-10 rounded-lg" alt="logo" />
          <h1 className="font-bold text-xl text-white">
            KanuorieTechLib
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* ADMIN (only for admin users) */}
          {user?.role === "admin" && (
            <NavLink to="/admin" className="text-white">
              Admin
            </NavLink>
          )}

          {/* 🔔 NOTIFICATION ICON */}
          <div className="relative">
            <Link to="/notifications" className="text-white text-xl">
              🔔
            </Link>

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl text-white"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-16 right-4 bg-white shadow-xl rounded-xl p-4 w-56 space-y-2">
          
          {user && (
            <p className="text-sm text-gray-500 px-3">
              👋 {user.name}
            </p>
          )}

          <NavLink to="/" onClick={closeMenu} className={navItem}>
            <Home size={18} /> Home
          </NavLink>

          {token && (
            <>
              <NavLink to="/profile" onClick={closeMenu} className={navItem}>
                <User size={18} /> Profile
              </NavLink>

              <NavLink to="/library" onClick={closeMenu} className={navItem}>
                <Book size={18} /> Library
              </NavLink>

              <NavLink to="/courses" onClick={closeMenu} className={navItem}>
                🎓 Courses
              </NavLink>

              <NavLink to="/notifications" onClick={closeMenu} className={navItem}>
                <Bell size={18} /> Notifications
              </NavLink>

              <NavLink to="/settings" onClick={closeMenu} className={navItem}>
                <Settings size={18} /> Settings
              </NavLink>
            </>
          )}

          {/* PUBLIC */}
          <NavLink to="/about" onClick={closeMenu} className={navItem}>
            <Info size={18} /> About
          </NavLink>

          <NavLink to="/help" onClick={closeMenu} className={navItem}>
            <HelpCircle size={18} /> Help
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu} className={navItem}>
            <Phone size={18} /> Contact
          </NavLink>

          {/* AUTH */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full py-2 px-3 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <NavLink to="/login" onClick={closeMenu} className={navItem}>
              <User size={18} /> Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}