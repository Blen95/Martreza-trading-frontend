// src/services/api.ts

import axios from "axios";

// ================= BASE SETUP ================= //

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export interface Product {
  id: number;

  name: string;

  category?: string;

  description?: string;

  image?: string;

  origin?: string;

  sku?: string;

  quantity: number;

  unit: string;

  minimum_stock: number;

  price?: number;

  is_active: boolean;

  created_at?: string;
}

// ================= TYPES ================= //

export type Status =
  | "pending"
  | "contacted"
  | "quoted"
  | "closed";

// ================= ITEM ================= //

export interface QuoteRequestItem {
  id?: number;

  category: string;
  brand?: string;
  size?: string;

  unit: string;
  quantity: number;

  design?: string;
  design_url?: string;

  design2?: string;
  design2_url?: string;
}

// ================= QUOTE REQUEST ================= //

export interface QuoteRequestPayload {
  name: string;
  phone: string;
  email?: string;
  company?: string;

  items: {
    category: string;
    brand?: string;
    size?: string;

    unit: string;
    quantity: number;

    design?: File | null;
  }[];
}

export interface QuoteRequest {
  id: number;

  user_id: number | null;

  name: string;
  phone: string;
  email: string;
  company?: string;

  status: Status;

  quoted_price?: number | null;
  initial_payment?: number | null;
  estimated_arrival?: string | null;

  quoted_at?: string | null;
  status_updated_at?: string | null;

  created_at: string;
  updated_at: string;

  items: QuoteRequestItem[];
}

// ================= AUTH ================= //

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (
  data: RegisterPayload
) => {
  const response = await API.post("/register", data);

  return response.data;
};

export interface LoginPayload {
  email: string;
  password: string;
}
// ================= ORDERS ================= //

export type OrderStatus =
  | "requested"
  | "reviewing"
  | "awaiting_payment"
  | "paid"
  | "processing"
  | "completed"
  | "cancelled";

export interface Receipt {
  id: number;
  file_path: string;
  url?: string;
  status: string;
}

export interface Order {
  id: number;

  quote_request_id: number;

  status: OrderStatus;

  approved_at?: string;

  created_at: string;

  quote_request?: QuoteRequest;

  receipts?: Receipt[];
}

export const loginUser = async (
  data: LoginPayload
) => {
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

export const submitQuoteRequest = async (
  data: FormData
) => {
  const response = await API.post(
    "/quote-requests",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const fetchQuoteRequests = async (): Promise<
  QuoteRequest[]
> => {
  const response = await API.get("/quote-requests");

  return response.data.data;
};

// ================= ADMIN UPDATE ================= //

export interface QuoteUpdatePayload {
  status: Status;

  quoted_price?: number;

  initial_payment?: number;

  estimated_arrival?: string;
}

export const updateQuote = async (
  id: number,
  data: QuoteUpdatePayload
): Promise<QuoteRequest> => {
  const response = await API.patch(
    `/quote-requests/${id}/quote`,
    data
  );

  return response.data.data;
};
// ================= PLACE ORDER ================= //

export const placeOrder = async (
  quoteRequestId: number,
  receipt: File
): Promise<Order> => {
  const formData = new FormData();

  formData.append(
    "quote_request_id",
    String(quoteRequestId)
  );

  formData.append("receipt", receipt);

  const response = await API.post(
    "/orders",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

// ================= FETCH ORDERS ================= //

export const fetchOrders = async (): Promise<
  Order[]
> => {
  const response = await API.get(
    "/orders"
  );

  return response.data.data;
};

// ================= UPDATE ORDER STATUS ================= //

export const updateOrderStatus =
  async (
    id: number,
    status: OrderStatus
  ): Promise<Order> => {
    const response =
      await API.patch(
        `/orders/${id}/status`,
        { status }
      );

    return response.data.data;
  };

  export async function fetchProducts() {
  const token = localStorage.getItem("token");

  const res = await API.get("/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function createProduct(data: FormData | object) {
  const token = localStorage.getItem("token");

  const res = await API.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function updateProduct(
  id: number,
  data: object
) {
  const token = localStorage.getItem("token");

  const res = await API.put(
    `/products/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function deleteProduct(id: number) {
  const token = localStorage.getItem("token");

  const res = await API.delete(
    `/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function fetchLowStockProducts() {
  const token = localStorage.getItem("token");

  const res = await API.get(
    "/products-low-stock",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
export default API;