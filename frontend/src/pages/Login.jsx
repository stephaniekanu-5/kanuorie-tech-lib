import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = async () => {
  try {
    setLoading(true);

    const data = await loginUser(formData);

    // ✅ STORE TOKEN
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    login(data);
    navigate("/profile");

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl w-96 text-white">
        
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white mb-4"
        />

        {/* Password with toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/70"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-300 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Remember Me */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-white text-purple-700 w-full py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-white font-medium underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}