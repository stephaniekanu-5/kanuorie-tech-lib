import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ FIXED KEY
  
console.log("TOKEN BEING SENT:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;