import axios from "axios";

export interface QuoteRequestPayload {
  name: string;
  phone: string;
  email?: string;
  company?: string;

  item_name: string; // ✅ NEW
  unit: string;      // ✅ NEW

  quantity: number;
  message?: string;
  product_id?: number | null;
}

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// ================= AUTH FUNCTIONS ================= //

// ✅ Register User
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await API.post("/register", data);
  return response.data; // { user, token, message }
};

// ✅ Login User
export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await API.post("/login", data);
  return response.data; // { user, token, message }
};

// ✅ Logout User
export const logoutUser = async (token: string) => {
  const response = await API.post(
    "/logout",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data; // { message: "Logged out successfully" }
};

// ✅ Get Authenticated User
export const getUser = async (token: string) => {
  const response = await API.get("/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // user object
};

// ================= QUOTE REQUEST ================= //

export const submitQuoteRequest = async (data: QuoteRequestPayload) => {
  const response = await API.post("/quote-requests", data);
  return response.data;
};

export const fetchQuoteRequests = async () => {
  const response = await API.get("/quote-requests");
  return response.data;
};