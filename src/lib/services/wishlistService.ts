const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1"; 

// ---------- Get Logged User Wishlist ----------
export async function getWishlist(token: string) {
  const res = await fetch(`${API_BASE}/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    // Adding no-cache or revalidate if needed, but fetch usually respects cache headers
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch wishlist");
  }

  return res.json();
}

// ---------- Add Product to Wishlist ----------
export async function addToWishlist(token: string, productId: string) {
  const res = await fetch(`${API_BASE}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add to wishlist");
  }

  return res.json();
}

// ---------- Remove Product from Wishlist ----------
export async function removeFromWishlist(token: string, productId: string) {
  const res = await fetch(`${API_BASE}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to remove from wishlist");
  }

  return res.json();
}
