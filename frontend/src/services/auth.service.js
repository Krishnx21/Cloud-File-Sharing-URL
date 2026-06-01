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
