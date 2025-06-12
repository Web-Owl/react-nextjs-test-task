import axios from 'axios';

const API_BASE = 'http://o-complex.com:1337';

export interface Review {
  id: number;
  text: string;
}

export interface Product {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductsResponse {
  page: number;
  amount: number;
  total: number;
  items: Product[];
}

export async function fetchReviews(): Promise<Review[]> {
  const res = await axios.get<Review[]>(`${API_BASE}/reviews`);
  return res.data;
}

export async function fetchProducts(page: number, page_size: number): Promise<ProductsResponse> {
  const res = await axios.get<ProductsResponse>(`${API_BASE}/products`, {
    params: { page, page_size },
  });
  return res.data;
}

export interface OrderItem {
  id: number;
  quantity: number;
}

export interface OrderPayload {
  phone: string;
  cart: OrderItem[];
}

export interface OrderResponse {
  success: number;
  error?: string;
}

export async function sendOrder(payload: OrderPayload): Promise<OrderResponse> {
  const res = await axios.post<OrderResponse>(`${API_BASE}/order`, payload, {
    headers: { 'content-type': 'application/json' },
  });
  return res.data;
}