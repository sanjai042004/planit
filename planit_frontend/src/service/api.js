import axios from "axios"

export const api = axios.create({
    baseURL:"https://planit-ikfy.onrender.com/api" || "https://localhost:5000/api"})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
