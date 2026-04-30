import { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import socket from "../socket"; // ✅ USE SHARED SOCKET

export default function Notifications() {
  const {
    user,
    settings,
    notifications = [],
    setNotifications,
  } = useContext(AuthContext);

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;

      try {
        const res = await API.get(`/notifications/${user.id}`);
        setNotifications(res.data || []);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchNotifications();
  }, [user?.id, setNotifications]);

  /* ================= REAL-TIME NOTIFICATIONS ================= */
  useEffect(() => {
    if (!user?.id) return;

    // ✅ ensure connection only when needed
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", user.id);

    const handleNotification = (newNotification) => {
      setNotifications((prev = []) => {
        const exists = prev.find((n) => n.id === newNotification.id);
        if (exists) return prev;

        return [newNotification, ...prev];
      });
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [user?.id, setNotifications]);

  /* ================= MARK AS READ ================= */
  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);

      setNotifications((prev = []) =>
        prev.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  /* ================= CLEAR ALL ================= */
  const clearAll = async () => {
    if (!user?.id) return;

    const confirmClear = window.confirm("Clear all notifications?");
    if (!confirmClear) return;

    try {
      await API.delete(`/notifications/${user.id}`);
      setNotifications([]);
    } catch (err) {
      console.error("Failed to clear notifications", err);
    }
  };

  /* ================= UNREAD COUNT ================= */
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div
      className={`min-h-screen ${
        settings?.darkMode ? "bg-gray-900 text-white" : "bg-gray-50"
      }`}
    >
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">
          Notifications 🔔
        </h1>

        {unreadCount > 0 && (
          <p className="text-sm text-blue-500 mb-4">
            {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
          </p>
        )}

        {/* CLEAR BUTTON */}
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="mb-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear All
          </button>
        )}

        {/* EMPTY STATE */}
        {notifications.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No notifications yet.
          </div>
        )}

        {/* LIST */}
        <div className="space-y-4">
          {notifications.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-xl shadow flex justify-between items-center ${
                note.isRead
                  ? settings?.darkMode
                    ? "bg-gray-800"
                    : "bg-gray-200"
                  : settings?.darkMode
                  ? "bg-gray-700 border-l-4 border-blue-500"
                  : "bg-white border-l-4 border-blue-600"
              }`}
            >
              <div>
                <p className="font-semibold">{note.title}</p>
                <p className="text-sm opacity-70">{note.message}</p>

                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded mt-2 inline-block">
                  {note.type}
                </span>
              </div>

              {!note.isRead && (
                <button
                  onClick={() => markAsRead(note.id)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}