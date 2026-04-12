"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";

const DEFAULT_SEED_EMAIL = "admin@example.com";
const DEFAULT_SEED_PASSWORD = "ChangeMe123!";

export function LoginForm({ showDevHint = false }: { showDevHint?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      toast.error(result.error || "Sign in failed");
      return;
    }
    toast.success("Signed in");
    const next = searchParams.get("next");
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("redirectAfterLogin");
      if (saved) {
        sessionStorage.removeItem("redirectAfterLogin");
        router.push(saved);
        router.refresh();
        return;
      }
    }
    if (next && next.startsWith("/") && !next.startsWith("//")) {
      router.push(next);
    } else {
      router.push("/admin/dashboard");
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to manage content. Use an account from your database (for example the seeded admin).
        </p>
      </div>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      {showDevHint ? (
        <div className="rounded-lg border border-dashed bg-muted/50 p-3 text-left text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Local testing (after `pnpm prisma db seed`)</p>
          <p className="mt-1 font-mono">Email: {DEFAULT_SEED_EMAIL}</p>
          <p className="mt-0.5 font-mono">Password: {DEFAULT_SEED_PASSWORD}</p>
          <p className="mt-2">
            If you seeded with <code className="rounded bg-muted px-1">SEED_ADMIN_EMAIL</code> /{" "}
            <code className="rounded bg-muted px-1">SEED_ADMIN_PASSWORD</code>, use those values
            instead (see RUNBOOK.md).
          </p>
        </div>
      ) : null}
    </div>
  );
}
