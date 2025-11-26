// frontend/src/services/api.js
import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://skillfolio.onrender.com";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  }
});

// Disable caching globally for safety
api.defaults.headers.common["Cache-Control"] = "no-cache";
api.defaults.headers.common["Pragma"] = "no-cache";
api.defaults.headers.common["Expires"] = "0";

export default api;
