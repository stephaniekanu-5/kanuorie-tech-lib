import { createContext, useState, useEffect } from "react";
import socket from "../socket";
import API from "../api/axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
  });

  const [notifications, setNotifications] = useState([]);

  // ✅ UNREAD COUNT
  const unreadCount = notifications?.filter((n) => !n.isRead).length;

  /* ========================
     LOAD FROM LOCAL STORAGE
  ======================== */
  useEffect(() => {
    const savedUser = localStorage.getItem("techlib-user");
    const savedToken = localStorage.getItem("techlib-token");
    const savedSettings = localStorage.getItem("techlib-settings");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  /* ========================
     SAVE USER
  ======================== */
  useEffect(() => {
    if (user) {
      localStorage.setItem("techlib-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("techlib-user");
    }
  }, [user]);

  /* ========================
     SAVE TOKEN
  ======================== */
  useEffect(() => {
    if (token) {
      localStorage.setItem("techlib-token", token);
    } else {
      localStorage.removeItem("techlib-token");
    }
  }, [token]);

  /* ========================
     SAVE SETTINGS
  ======================== */
  useEffect(() => {
    localStorage.setItem("techlib-settings", JSON.stringify(settings));
  }, [settings]);

  /* ========================
     SOCKET: JOIN USER ROOM
  ======================== */
  useEffect(() => {
    if (user?.id) {
      socket.emit("join", user.id);
    }
  }, [user?.id]);

  /* ========================
     FETCH NOTIFICATIONS
  ======================== */
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;

      try {
        const res = await API.get(`/notifications/${user.id}`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchNotifications();
  }, [user?.id]);

  /* ========================
     SOCKET LISTENER (REAL-TIME)
  ======================== */
useEffect(() => {
  const handleNewNotification = (notification) => {
    setNotifications((prev) => {
      const exists = prev.find((n) => n.id === notification.id);
      if (exists) return prev;

      return [notification, ...prev];
    });

    // 🔥 TOAST LOGIC (outside state update)
    if (notification.type === "admin") {
      toast("📢 Admin Message", {
        description: notification.message,
      });
    } 
    else if (notification.type === "course") {
      toast.success("🎓 New Course Assigned!");
    } 
    else {
      toast.success(notification.title, {
        description: notification.message,
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: "10px",
          padding: "12px",
        },
      });
    }
  };

  socket.on("notification", handleNewNotification);

  return () => {
    socket.off("notification", handleNewNotification);
  };
}, []);

  /* ========================
     AUTH FUNCTIONS
  ======================== */
  const login = (data) => {
    // ✅ FIXED STORAGE KEYS
    localStorage.setItem("techlib-token", data.token);
    localStorage.setItem("techlib-user", JSON.stringify(data.user));

    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setNotifications([]);

    // ✅ clean storage
    localStorage.removeItem("techlib-user");
    localStorage.removeItem("techlib-token");

    // ✅ disconnect socket (important)
    socket.disconnect();
  };

  /* ========================
     CONTEXT PROVIDER
  ======================== */
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login,
        logout,
        settings,
        setSettings,
        notifications,
        setNotifications,
        unreadCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}