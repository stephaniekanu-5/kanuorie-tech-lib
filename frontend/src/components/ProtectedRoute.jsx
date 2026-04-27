import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext);

  // ⛔ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Admin only
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}