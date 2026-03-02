import axiosInstance from './axios';
import { AUTH_ENDPOINTS } from './endpoints';

// register
export const registerApi = async (payload) => {
  const { data } = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, payload);
  return data;
};

// login
export const loginApi = async (credentials) => {
  const { data } = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, credentials);
  return data;
};

// logout
export const logoutApi = async () => {
  const { data } = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
  return data;
};

// me
export const getMeApi = async () => {
  const { data } = await axiosInstance.get(AUTH_ENDPOINTS.ME);
  return data;
};

// update user
export const updateMeApi = async (payload) => {
  const { data } = await axiosInstance.patch(AUTH_ENDPOINTS.ME, payload);
  return data;
};

// linkedin redirect
export const linkedinOAuthRedirect = () => {
  window.location.replace(`${import.meta.env.VITE_API_BASE_URL}/auth/linkedin`);
};

// auth health
export const authHealthApi = async () => {
  const { data } = await axiosInstance.get(AUTH_ENDPOINTS.AUTH_HEALTH);
  return data;
};
