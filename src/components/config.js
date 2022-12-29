import axios from 'axios';

// export const baseURL = 'http://localhost:5000/';
export const baseURL = 'https://forms-101-backend.onrender.com/';

export const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('mern_admin_dashboard');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
