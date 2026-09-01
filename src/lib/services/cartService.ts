const API_BASE = process.env.NEXT_PUBLIC_API_V2_URL || "https://ecommerce.routemisr.com/api/v2";

// ---------- Get Logged User Cart ----------
export async function getCart(token: string) {
  const res = await fetch(`${API_BASE}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch cart");
  }

  return res.json();
}

// ---------- Add Product to Cart ----------
export async function addToCart(token: string, productId: string) {
  const res = await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add to cart");
  }

  return res.json();
}

// ---------- Update Cart Product Quantity ----------
export async function updateCartQuantity(token: string, productId: string, count: number) {
  const res = await fetch(`${API_BASE}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ count }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update quantity");
  }

  return res.json();
}

export async function removeCartItem(token: string, productId: string) {
  const res = await fetch(`${API_BASE}/cart/${productId}`, { method: "DELETE", headers: { token } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Failed to remove item from cart");
  return data;
}

// ---------- Clear User Cart ----------
export async function clearCart(token: string) {
  const res = await fetch(`${API_BASE}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to clear cart");
  }

  // The RouteMISR API might return empty string or an object on successful clear.
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

// ---------- Apply Coupon To Cart ----------
export async function applyCoupon(token: string, couponName: string) {
  const res = await fetch(`${API_BASE}/cart/applyCoupon`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ couponName }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to apply coupon");
  }

  return res.json();
}
