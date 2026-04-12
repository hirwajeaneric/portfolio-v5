"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";
import type { UserRole } from "@/lib/rbac";

export function UserRowEditor({
  user,
  currentUserId,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    active: boolean;
    requirePasswordReset: boolean;
  };
  currentUserId: string;
}) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [role, setRole] = useState(user.role);
  const [active, setActive] = useState(user.active);
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveProfile() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: adminHeaders(csrfToken),
        body: JSON.stringify({ role, active }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Could not update user");
        return;
      }
      toast.success("User updated");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function setPassword() {
    if (pwd.length < 8) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}/password`, {
        method: "PATCH",
        credentials: "include",
        headers: adminHeaders(csrfToken),
        body: JSON.stringify({ password: pwd }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Could not set password");
        return;
      }
      toast.success("Password updated");
      setPwd("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (user.id === currentUserId) return;
    if (!confirm(`Delete ${user.email}?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Could not delete user");
        return;
      }
      toast.success("User deleted");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const isSelf = user.id === currentUserId;

  return (
    <tr className="border-t border-zinc-200 dark:border-zinc-800 align-top">
      <td className="p-2 text-sm">{user.name}</td>
      <td className="p-2 text-sm font-mono text-xs">{user.email}</td>
      <td className="p-2">
        <select
          className="h-8 rounded border border-input bg-transparent px-2 text-xs"
          value={role}
          disabled={isSelf}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <option value="EDITOR">EDITOR</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </td>
      <td className="p-2">
        <label className="flex items-center gap-1 text-xs">
          <input type="checkbox" checked={active} disabled={isSelf} onChange={(e) => setActive(e.target.checked)} />
          active
        </label>
      </td>
      <td className="p-2 space-y-1">
        <Button size="sm" variant="secondary" type="button" disabled={loading} onClick={saveProfile}>
          Save role/status
        </Button>
      </td>
      <td className="p-2">
        <div className="flex flex-col gap-1 max-w-[200px]">
          <Input
            type="password"
            placeholder="New password"
            className="h-8 text-xs"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <Button size="sm" variant="outline" type="button" disabled={loading || pwd.length < 8} onClick={setPassword}>
            Set password
          </Button>
        </div>
      </td>
      <td className="p-2">
        <Button size="sm" variant="destructive" type="button" disabled={loading || isSelf} onClick={remove}>
          Delete
        </Button>
      </td>
    </tr>
  );
}
