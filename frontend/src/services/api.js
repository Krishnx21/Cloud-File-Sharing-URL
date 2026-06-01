import { API_BASE_URL } from "../lib/constants.js";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("sharecloud_token");
  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token && token !== "undefined" && token !== "null") {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("sharecloud_token");
      localStorage.removeItem("sharecloud_user");
    }
    throw new Error(payload?.message || "Request failed");
  }

  return payload;
}
