const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

// ---------- Sign In ----------
export async function signInAPI(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Invalid credentials");
  return data;
}

// ---------- Sign Up ----------
export async function signUpAPI(payload: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
}

// ---------- Forgot Password (send code) ----------
export async function forgotPasswordAPI(email: string) {
  const res = await fetch(`${API_BASE}/auth/forgotPasswords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send reset code");
  return data;
}

// ---------- Verify Reset Code ----------
export async function verifyResetCodeAPI(resetCode: string) {
  const res = await fetch(`${API_BASE}/auth/verifyResetCode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetCode }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Invalid reset code");
  return data;
}

// ---------- Reset Password ----------
export async function resetPasswordAPI(email: string, newPassword: string) {
  const res = await fetch(`${API_BASE}/auth/resetPassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to reset password");
  return data;
}

// ---------- Change Password (Logged in user) ----------
export async function changePasswordAPI(
  token: string,
  currentPassword: string,
  password: string,
  rePassword: string
) {
  const res = await fetch(`${API_BASE}/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ currentPassword, password, rePassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to change password");
  return data;
}

export async function updateProfileAPI(token: string, payload: { name: string; email: string; phone: string }) {
  const res = await fetch(`${API_BASE}/users/updateMe`, { method: "PUT", headers: { "Content-Type": "application/json", token }, body: JSON.stringify(payload) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update profile");
  return data;
}

export async function verifyTokenAPI(token: string) {
  const res = await fetch(`${API_BASE}/auth/verifyToken`, { headers: { token } });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Session has expired");
  return data;
}
