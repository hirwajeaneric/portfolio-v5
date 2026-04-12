"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";
import { AwardKind } from "@/generated/prisma/enums";

type Row = {
  id: string;
  kind: (typeof AwardKind)[keyof typeof AwardKind];
  title: string;
  issuer: string | null;
  description: string | null;
  issuedAt: Date | null;
  attachmentUrl: string | null;
  attachmentPublicId: string | null;
  thumbnailUrl: string | null;
  sortOrder: number;
};

const ta =
  "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

function dateInput(iso: Date | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toISOString().slice(0, 10);
}

export function AwardForm({ mode, initial }: { mode: "create" | "edit"; initial: Row | null }) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [loading, setLoading] = useState(false);

  const [kind, setKind] = useState(initial?.kind ?? AwardKind.AWARD);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [issuer, setIssuer] = useState(initial?.issuer ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [issuedAt, setIssuedAt] = useState(dateInput(initial?.issuedAt ?? null));
  const [attachmentUrl, setAttachmentUrl] = useState(initial?.attachmentUrl ?? "");
  const [attachmentPublicId, setAttachmentPublicId] = useState(initial?.attachmentPublicId ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnailUrl ?? "");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload: Record<string, unknown> = {
      kind,
      title,
      issuer: issuer.trim() || null,
      description: description.trim() || null,
      issuedAt: issuedAt.trim() ? `${issuedAt.trim()}T12:00:00.000Z` : null,
      attachmentUrl: attachmentUrl.trim() || null,
      attachmentPublicId: attachmentPublicId.trim() || null,
      thumbnailUrl: thumbnailUrl.trim() || null,
      sortOrder: Number.parseInt(sortOrder, 10) || 0,
    };

    try {
      const url = mode === "create" ? "/api/admin/awards" : `/api/admin/awards/${initial!.id}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        credentials: "include",
        headers: adminHeaders(csrfToken),
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Save failed");
        return;
      }
      toast.success("Saved");
      router.push("/admin/awards");
      router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!initial || !confirm("Delete?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/awards/${initial.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      if (res.ok) {
        toast.success("Deleted");
        router.push("/admin/awards");
        router.refresh();
      } else {
        const data = (await res.json()) as { error?: string };
        toast.error(data.error || "Delete failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      <div className="grid gap-2 max-w-xs">
        <Label>Kind</Label>
        <select
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          value={kind}
          onChange={(e) => setKind(e.target.value as (typeof AwardKind)[keyof typeof AwardKind])}
        >
          <option value={AwardKind.AWARD}>Award</option>
          <option value={AwardKind.CERTIFICATE}>Certificate</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Issuer</Label>
        <Input value={issuer} onChange={(e) => setIssuer(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Description</Label>
        <textarea className={ta} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="grid gap-2 max-w-xs">
        <Label>Issued date</Label>
        <Input type="date" value={issuedAt} onChange={(e) => setIssuedAt(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Attachment URL</Label>
        <Input value={attachmentUrl} onChange={(e) => setAttachmentUrl(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Attachment public ID</Label>
        <Input value={attachmentPublicId} onChange={(e) => setAttachmentPublicId(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Thumbnail URL</Label>
        <Input value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
      </div>
      <div className="grid gap-2 max-w-xs">
        <Label>Sort order</Label>
        <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          Save
        </Button>
        {mode === "edit" ? (
          <Button type="button" variant="destructive" disabled={loading} onClick={remove}>
            Delete
          </Button>
        ) : null}
      </div>
    </form>
  );
}
