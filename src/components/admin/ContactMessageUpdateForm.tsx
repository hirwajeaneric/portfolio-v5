"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";
import { ContactStatus } from "@/generated/prisma/enums";

const statuses = Object.values(ContactStatus) as string[];

const textareaClass =
  "flex min-h-[72px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function ContactMessageUpdateForm({
  messageId,
  initialStatus,
  initialNotes,
  onSuccess,
}: {
  messageId: string;
  initialStatus: string;
  initialNotes: string | null;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [status, setStatus] = useState(initialStatus);
  const [adminNotes, setAdminNotes] = useState(initialNotes ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(initialStatus);
    setAdminNotes(initialNotes ?? "");
  }, [messageId, initialStatus, initialNotes]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contact-messages/${messageId}`, {
        method: "PATCH",
        credentials: "include",
        headers: adminHeaders(csrfToken),
        body: JSON.stringify({
          status,
          adminNotes: adminNotes.trim() || null,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Update failed");
        return;
      }
      toast.success("Message updated");
      onSuccess?.();
      if (!onSuccess) router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-3 mt-2">
      <div className="grid gap-1 max-w-xs">
        <Label>Status</Label>
        <select
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-1">
        <Label>Admin notes</Label>
        <textarea className={textareaClass} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} />
      </div>
      <Button type="submit" size="sm" disabled={loading}>
        {loading ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
