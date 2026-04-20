import axios from "axios";

// ================= BASE SETUP ================= //

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// ✅ Attach token automatically (no repetition everywhere)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= TYPES ================= //

export type Status = "pending" | "contacted" | "quoted" | "closed";

export interface QuoteRequestPayload {
  name: string;
  phone: string;
  email?: string;
  company?: string;

  item_name: string;
  unit: string;

  quantity: number;
  message?: string;
  product_id?: number | null;
}

export interface QuoteRequest {
  id: number;
  user_id: number;

  name: string;
  phone: string;
  email?: string;
  company?: string;

  item_name: string;
  unit: string;
  quantity: number;
  message?: string;
  product_id?: number | null;

  status: Status;

  created_at: string;
  updated_at: string;
}

// ================= AUTH ================= //

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await API.post("/register", data);
  return response.data;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await API.post("/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/logout");
  return response.data;
};

export const getUser = async () => {
  const response = await API.get("/user");
  return response.data;
};

// ================= QUOTE REQUEST ================= //

// ✅ Create
export const submitQuoteRequest = async (
  data: QuoteRequestPayload
) => {
  const response = await API.post("/quote-requests", data);
  return response.data;
};

// ✅ Fetch (typed)
export const fetchQuoteRequests = async (): Promise<QuoteRequest[]> => {
  const response = await API.get("/quote-requests");
  return response.data.data;
};

// ✅ Update Status (NEW)
export const updateQuoteStatus = async (
  id: number,
  status: Status
): Promise<QuoteRequest> => {
  const response = await API.patch(
    `/quote-requests/${id}/status`,
    { status }
  );

  return response.data.data;
};