import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("expense_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("expense_token");
      localStorage.removeItem("expense_user");
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  me: () => api.get("/auth/me")
};

export const expenseApi = {
  dashboard: () => api.get("/expenses/dashboard"),
  list: (params) => api.get("/expenses", { params }),
  create: (payload) => api.post("/expenses", payload),
  update: (id, payload) => api.put(`/expenses/${id}`, payload),
  remove: (id) => api.delete(`/expenses/${id}`)
};

export const getApiErrorMessage = (error, fallback = "Something went wrong") => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === "ERR_NETWORK") {
    return "Backend API is not running. Start the backend server and check your MongoDB connection string.";
  }
  return fallback;
};

export default api;
