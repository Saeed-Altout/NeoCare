import Axios from "axios";
import { useAuthStore } from "@/stores/auth-store";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState();
    if (user && user.token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
