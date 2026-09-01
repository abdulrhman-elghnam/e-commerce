import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

// Shared authenticated fetch helper
async function authFetch(url: string, options: RequestInit = {}) {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { token } : {}),
      ...(options.headers || {}),
    },
  });
}

// ---------- GET All Orders ----------
export async function getAllOrders() {
  const res = await authFetch(`${API_BASE}/orders/`);
  if (!res.ok) throw new Error(`Failed to get orders: ${res.statusText}`);
  return res.json();
}

// ---------- GET User Orders ----------
export async function getUserOrders(userId: string) {
  const res = await authFetch(`${API_BASE}/orders/user/${userId}`);
  if (!res.ok) throw new Error(`Failed to get user orders: ${res.statusText}`);
  return res.json();
}

// ---------- POST Checkout Session ----------
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export async function createCheckoutSession(
  cartId: string,
  shippingAddress: ShippingAddress,
  returnUrl: string = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
) {
  const res = await authFetch(
    `${API_BASE}/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Checkout session failed");
  }

  return res.json();
}

export async function createCashOrder(token: string, cartId: string, shippingAddress: ShippingAddress) {
  const res = await fetch(`${API_BASE}/orders/${cartId}`, { method: "POST", headers: { "Content-Type": "application/json", token }, body: JSON.stringify({ shippingAddress }) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Could not place the order");
  return data;
}
