// src/api.js
const API = import.meta.env.VITE_API_URL;

export async function api(path, { method = "GET", body } = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  if (res.status === 401 && token) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.errors?.join(", ") || "Request failed");
  }
  return data;
}