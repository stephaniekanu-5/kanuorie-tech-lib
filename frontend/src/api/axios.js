import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

// 🔐 Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ FIXED KEY
  
console.log("TOKEN BEING SENT:", token);

 if (token && config.url !== "/auth/register") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default API;