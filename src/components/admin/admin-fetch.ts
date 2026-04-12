"use client";

/** Attach CSRF header for authenticated admin mutations. */
export function adminHeaders(csrfToken: string | null, init?: HeadersInit): Headers {
  const h = new Headers(init);
  h.set("Content-Type", "application/json");
  if (csrfToken) h.set("X-CSRF-Token", csrfToken);
  return h;
}
