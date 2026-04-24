import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("prepforge_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("prepforge_token");
      localStorage.removeItem("prepforge_user");
      // Silently handle 401 without forcing redirect to /login
    }
    return Promise.reject(error);
  }
);

export default API;
