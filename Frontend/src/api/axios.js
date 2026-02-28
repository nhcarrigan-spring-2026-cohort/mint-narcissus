import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/authSlice';

// BASE API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// AXIOS CLIENT
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // if error
    if (error.response) {
      const { status } = error.response;

      // Unauthorized → force logout
      if (status === 401) {
        store.dispatch(logout());
      }

      // Forbidden
      if (status === 403) {
        console.error('Forbidden access');
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
