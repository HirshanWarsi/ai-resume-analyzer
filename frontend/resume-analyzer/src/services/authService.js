import api from "./api";

export function loginUser(email, password) {
  return api.post(
    "/auth/login",
    new URLSearchParams({ username: email, password }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );
}

export function registerUser(payload) {
  return api.post("/auth/register", payload);
}

export function getCurrentUser() {
  return api.get("/auth/me");
}
