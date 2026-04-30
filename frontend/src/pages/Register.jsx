import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { registerUser, loginUser } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleRegister = async () => {
  try {
    setLoading(true);

    await registerUser(formData);

    const loginData = await loginUser({
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });

    login(loginData);
    navigate("/profile");

  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl w-96 text-white">
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white mb-4"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white mb-4"
        />
        <input
         type="text"
          name="role"
          placeholder="Role (e.g. Developer, Designer)"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white mb-4"
        />
        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white pr-12"
          />
          <input
            type="hidden"
            name="confirmPassword"
            value={formData.password}
          />
          <input
            type="hidden"
            name="username"
            value={formData.email.split("@")[0]}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/70"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-300 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="bg-white text-purple-700 w-full py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-medium underline">
            Login 
          </Link>
        </p>
      </div>
    </div>
  );
}