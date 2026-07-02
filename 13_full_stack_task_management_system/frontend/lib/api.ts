const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

export const getToken = () =>
  typeof window !== "undefined"
    ? (document.cookie
        .split("; ")
        .find((r) => r.startsWith("tm_token="))
        ?.split("=")[1] ?? null)
    : null;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error ?? "Request failed");
  }
  return res.json();
}
