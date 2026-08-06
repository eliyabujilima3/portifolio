import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach admin JWT (if present) to every request automatically.
api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("admin_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function submitContactForm(payload: ContactPayload) {
  const { data } = await api.post("/contact", payload);
  return data;
}

export async function adminLogin(email: string, password: string) {
  const { data } = await api.post("/admin/login", { email, password });
  return data as { token: string };
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export async function fetchMessages(params: { search?: string; page?: number } = {}) {
  const { data } = await api.get("/admin/messages", { params });
  return data as { messages: ContactMessage[]; total: number };
}

export async function fetchStats() {
  const { data } = await api.get("/admin/messages/stats");
  return data as {
    total: number;
    unread: number;
    read: number;
    today: number;
  };
}

export async function markMessageRead(id: number, read: boolean) {
  const { data } = await api.patch(`/admin/messages/${id}`, { read });
  return data;
}

export async function deleteMessage(id: number) {
  const { data } = await api.delete(`/admin/messages/${id}`);
  return data;
}

export async function downloadMessagesCsv() {
  const response = await api.get("/admin/messages/export", { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "contact_messages.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
