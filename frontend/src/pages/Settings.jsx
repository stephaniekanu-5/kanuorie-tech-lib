import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import API from "../api/axios";

export default function Settings() {
  const {
    user,
    setUser,
    settings,
    setSettings,
    notifications,
    setNotifications,
  } = useContext(AuthContext);

  const [status, setStatus] = useState("");

  // ================= SAFE INIT =================
  useEffect(() => {
    if (user?.settings) {
      setSettings(user.settings);
    }
  }, [user, setSettings]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= SAVE SETTINGS =================
  const handleSave = async () => {
    try {
      const res = await API.put(`/users/${user.id}`, {
        settings,
      });

      setUser(res.data);

      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "Settings Updated ⚙️",
          message: "Your preferences were saved successfully",
          isRead: false,
        },
        ...prev,
      ]);

      setStatus("✅ Settings saved successfully");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to save settings");
    }
  };

  // ================= CLEAR LOCAL DATA =================
  const handleClearData = () => {
    const confirmClear = window.confirm(
      "This will clear only local browser data. Continue?"
    );

    if (!confirmClear) return;

    localStorage.clear();

    setSettings({
      darkMode: false,
      notifications: true,
    });

    setNotifications([]);
    setStatus("🗑️ Local data cleared");
  };

  // ================= COOKIE TOGGLE (IMPROVED) =================
  const toggleCookies = () => {
    const current = localStorage.getItem("cookiesAccepted");

    const next = current === "true" ? "false" : "true";
    localStorage.setItem("cookiesAccepted", next);

    setStatus(
      next === "true"
        ? "🍪 Cookies enabled"
        : "🚫 Cookies disabled"
    );
  };

  // ================= SAFE FALLBACK =================
  const safeSettings = settings || {
    darkMode: false,
    notifications: true,
  };

  return (
    <div
      className={`min-h-screen transition-all ${
        safeSettings.darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-50"
      }`}
    >
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Settings ⚙️</h1>

        {/* PROFILE */}
        <div
          className={`p-6 rounded-xl shadow mb-8 ${
            safeSettings.darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">
            Profile Settings
          </h2>

          <input
            type="text"
            name="name"
            value={safeSettings.name || ""}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-3 border rounded-lg text-black"
          />

          <input
            type="email"
            name="email"
            value={safeSettings.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg text-black"
          />
        </div>

        {/* PREFERENCES */}
        <div
          className={`p-6 rounded-xl shadow mb-8 ${
            safeSettings.darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">
            Preferences
          </h2>

          <div className="flex justify-between mb-4">
            <span>🌙 Dark Mode</span>
            <input
              type="checkbox"
              name="darkMode"
              checked={safeSettings.darkMode}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between">
            <span>🔔 Notifications</span>
            <input
              type="checkbox"
              name="notifications"
              checked={safeSettings.notifications}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div
          className={`p-6 rounded-xl shadow mb-8 ${
            safeSettings.darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">
            Actions
          </h2>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Save Settings
            </button>

            <button
              onClick={handleClearData}
              className="bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Clear Local Data
            </button>

            <button
              onClick={toggleCookies}
              className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              Toggle Cookie Preferences
            </button>
          </div>
        </div>

        {/* STATUS */}
        {status && (
          <p className="text-center text-sm">{status}</p>
        )}

        {/* FOOTER */}
        <footer className="text-center text-gray-500 py-6">
          © {new Date().getFullYear()} KanuorieTech. All rights reserved.
        </footer>
      </div>
    </div>
  );
}