import axios from "axios";

export const baseURL = "https://forms-101-backend.onrender.com/";

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("admin_dashboard");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
