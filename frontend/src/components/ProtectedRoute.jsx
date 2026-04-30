import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const { user, token } = useContext(AuthContext);

  // ⏳ WAIT FOR AUTH STATE TO HYDRATE
  if (token === undefined || token === null) {
    return null; // or a loader spinner
  }

  // ⛔ NOT LOGGED IN
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 ADMIN CHECK
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}