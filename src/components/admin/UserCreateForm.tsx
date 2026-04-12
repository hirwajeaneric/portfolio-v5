"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";

export function UserCreateForm() {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "EDITOR">("EDITOR");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        credentials: "include",
        headers: adminHeaders(csrfToken),
        body: JSON.stringify({ name, email, password, role, active: true }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Failed");
        return;
      }
      toast.success("User created");
      setName("");
      setEmail("");
      setPassword("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap gap-3 items-end border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
      <div className="grid gap-1">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required className="min-w-[160px]" />
      </div>
      <div className="grid gap-1">
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="min-w-[200px]" />
      </div>
      <div className="grid gap-1">
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
      </div>
      <div className="grid gap-1">
        <Label>Role</Label>
        <select
          className="flex h-9 rounded-md border border-input bg-transparent px-3 text-sm"
          value={role}
          onChange={(e) => setRole(e.target.value as "ADMIN" | "EDITOR")}
        >
          <option value="EDITOR">Editor</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <Button type="submit" disabled={loading}>
        Add user
      </Button>
    </form>
  );
}
