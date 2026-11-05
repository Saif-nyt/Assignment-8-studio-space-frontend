import { authClient } from "@/lib/auth-client";

export const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

export async function prepareAuthCookie() {
  const tokenResponse = await authClient.token();
  const token = tokenResponse?.data?.token;

  if (!token) return null;

  try {
    await fetch(`${API_BASE}/auth/session`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    // The bearer token below is still used as a fallback by authFetch.
  }

  return token;
}

export async function authFetch(url, options = {}) {
  const token = await prepareAuthCookie();

  if (!token) {
    throw new Error("Authentication token missing. Please log in again.");
  }

  const headers = new Headers(options.headers || {});
  const requestOptions = {
    ...options,
    headers,
    credentials: "include",
  };

  let response = await fetch(url, requestOptions);

  if (response.status === 401) {
    headers.set("Authorization", `Bearer ${token}`);
    response = await fetch(url, requestOptions);
  }

  return response;
}
