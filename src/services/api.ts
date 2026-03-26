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
  baseURL: "http://localhost:8000/api",
});

// ✅ Submit Quote Request
export const submitQuoteRequest = async (data: QuoteRequestPayload) => {
  const response = await API.post("/quote-requests", data);
  return response.data;
};

// ✅ Fetch all requests (for admin later)
export const fetchQuoteRequests = async () => {
  const response = await API.get("/quote-requests");
  return response.data;
};