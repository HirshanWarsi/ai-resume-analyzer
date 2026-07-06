import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  timeout: 10000,
});

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("access_token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  localStorage.removeItem("access_token");
  delete api.defaults.headers.common.Authorization;
}

export function clearAuthToken() {
  setAuthToken(null);
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
    }

    return Promise.reject(error);
  },
);

export function getApiErrorMessage(
  error,
  fallback = "Something went wrong. Please try again.",
) {
  const status = error?.response?.status;
  const detail = error?.response?.data?.detail;
  const code = error?.code;
  const message = error?.message || "";

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail.map((item) => item?.msg || item).join(", ");
  }

  if (detail && typeof detail === "object") {
    return detail.msg || detail.error || fallback;
  }

  if (
    code === "ERR_NETWORK" ||
    message.toLowerCase().includes("network error")
  ) {
    return "We could not reach the server. Please check your connection and try again.";
  }

  if (message.toLowerCase().includes("timeout")) {
    return "The request timed out. Please try again in a moment.";
  }

  if (status === 401) {
    return "Your session has expired. Please sign in again.";
  }

  if (status === 403) {
    return "You do not have permission to view this resource.";
  }

  if (status === 404) {
    return "We could not find the requested item.";
  }

  if (status === 500) {
    return "The server hit a problem. Please try again in a moment.";
  }

  return fallback;
}

export default api;
