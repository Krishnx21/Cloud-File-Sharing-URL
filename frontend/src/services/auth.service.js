import { apiRequest } from "./api.js";

export async function loginUser(credentials) {
  const payload = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });

  return payload;
}

export async function registerUser(values) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(values)
  });
}

export async function getCurrentUser() {
  return apiRequest("/auth/current-user");
}

export async function forgotPassword(email) {
  return apiRequest("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email })
  });
}

export async function resetPassword({ token, password }) {
  return apiRequest("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password })
  });
}
