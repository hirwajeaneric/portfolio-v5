"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";
import { CommentStatus } from "@/generated/prisma/enums";

export function CommentActions({
  commentId,
  currentStatus,
  onAfterChange,
}: {
  commentId: string;
  currentStatus: string;
  /** Called after a successful PATCH or DELETE (e.g. refetch a client-side table). */
  onAfterChange?: () => void;
}) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [loading, setLoading] = useState(false);

  async function setStatus(status: (typeof CommentStatus)[keyof typeof CommentStatus]) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/comments/${commentId}`, {
        method: "PATCH",
        credentials: "include",
        headers: adminHeaders(csrfToken),
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success("Comment updated");
        onAfterChange?.();
        if (!onAfterChange) router.refresh();
      } else {
        const data = (await res.json()) as { error?: string };
        toast.error(data.error || "Update failed");
      }
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this comment?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      if (res.ok) {
        toast.success("Comment deleted");
        onAfterChange?.();
        if (!onAfterChange) router.refresh();
      } else {
        const data = (await res.json()) as { error?: string };
        toast.error(data.error || "Delete failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-1">
      {currentStatus !== CommentStatus.APPROVED ? (
        <Button type="button" size="sm" variant="secondary" disabled={loading} onClick={() => setStatus(CommentStatus.APPROVED)}>
          Approve
        </Button>
      ) : null}
      {currentStatus !== CommentStatus.REJECTED ? (
        <Button type="button" size="sm" variant="outline" disabled={loading} onClick={() => setStatus(CommentStatus.REJECTED)}>
          Reject
        </Button>
      ) : null}
      {currentStatus !== CommentStatus.SPAM ? (
        <Button type="button" size="sm" variant="outline" disabled={loading} onClick={() => setStatus(CommentStatus.SPAM)}>
          Spam
        </Button>
      ) : null}
      {currentStatus !== CommentStatus.PENDING ? (
        <Button type="button" size="sm" variant="ghost" disabled={loading} onClick={() => setStatus(CommentStatus.PENDING)}>
          Pending
        </Button>
      ) : null}
      <Button type="button" size="sm" variant="destructive" disabled={loading} onClick={remove}>
        Delete
      </Button>
    </div>
  );
}
