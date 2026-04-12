"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "@/lib/rbac";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  requirePasswordReset?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  csrfToken: string | null;
  login: (email: string, password: string) => Promise<{
    success: boolean;
    requirePasswordReset?: boolean;
    error?: string;
  }>;
  logout: (intentional?: boolean) => Promise<void>;
  checkSession: () => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<{ success: boolean; error?: string }>;
  setCSRFToken: (token: string) => void;
}

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  csrfToken?: string | null
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };
    if (csrfToken) headers["X-CSRF-Token"] = csrfToken;

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers,
    });

    const data = (await response.json()) as T & { error?: string; message?: string };

    if (!response.ok) {
      return {
        success: false,
        error: (data as { error?: string }).error || (data as { message?: string }).message || "Request failed",
      };
    }

    return { success: true, data: data as T };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      csrfToken: null,

      login: async (email: string, password: string) => {
        const result = await apiRequest<{
          user: User;
          csrfToken: string;
          requirePasswordReset?: boolean;
        }>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        if (result.success && result.data) {
          set({
            user: result.data.user,
            isAuthenticated: true,
            csrfToken: result.data.csrfToken,
          });
          return {
            success: true,
            requirePasswordReset: result.data.requirePasswordReset ?? false,
          };
        }
        return { success: false, error: result.error };
      },

      logout: async (intentional: boolean = false) => {
        const csrfToken = get().csrfToken;
        await apiRequest("/api/auth/logout", { method: "POST" }, csrfToken);
        if (typeof window !== "undefined" && !intentional) {
          const p = window.location.pathname;
          if (!p.startsWith("/auth/") && p !== "/admin/dashboard") {
            sessionStorage.setItem("redirectAfterLogin", p);
          }
        } else if (typeof window !== "undefined") {
          sessionStorage.removeItem("redirectAfterLogin");
        }
        set({ user: null, isAuthenticated: false, csrfToken: null });
      },

      refreshSession: async () => {
        const result = await apiRequest<{ user: User }>("/api/auth/session/refresh", { method: "POST" });
        if (result.success && result.data) {
          set({ user: result.data.user, isAuthenticated: true });
          return { success: true };
        }
        set({ user: null, isAuthenticated: false, csrfToken: null });
        return { success: false, error: result.error };
      },

      checkSession: async () => {
        const result = await apiRequest<{ user: User }>("/api/auth/session/me", { method: "GET" });
        if (result.success && result.data) {
          set({ user: result.data.user, isAuthenticated: true });
          return { success: true };
        }
        set({ user: null, isAuthenticated: false, csrfToken: null });
        return { success: false, error: result.error };
      },

      setCSRFToken: (token: string) => set({ csrfToken: token }),
    }),
    {
      name: "portfolio-auth",
      partialize: (s) => ({
        user: s.user,
        isAuthenticated: s.isAuthenticated,
        csrfToken: s.csrfToken,
      }),
    }
  )
);
