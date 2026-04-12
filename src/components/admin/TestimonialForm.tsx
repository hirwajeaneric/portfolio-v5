"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";

type Row = {
  id: string;
  headline: string | null;
  quote: string;
  authorName: string;
  authorRole: string | null;
  companyLogoUrl: string | null;
  avatarUrl: string | null;
  featured: boolean;
  sortOrder: number;
};

const ta =
  "flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function TestimonialForm({ mode, initial }: { mode: "create" | "edit"; initial: Row | null }) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [loading, setLoading] = useState(false);

  const [headline, setHeadline] = useState(initial?.headline ?? "");
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [authorName, setAuthorName] = useState(initial?.authorName ?? "");
  const [authorRole, setAuthorRole] = useState(initial?.authorRole ?? "");
  const [companyLogoUrl, setCompanyLogoUrl] = useState(initial?.companyLogoUrl ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatarUrl ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload: Record<string, unknown> = {
      headline: headline.trim() || null,
      quote,
      authorName,
      authorRole: authorRole.trim() || null,
      companyLogoUrl: companyLogoUrl.trim() || null,
      avatarUrl: avatarUrl.trim() || null,
      featured,
      sortOrder: Number.parseInt(sortOrder, 10) || 0,
    };

    try {
      const url =
        mode === "create" ? "/api/admin/testimonials" : `/api/admin/testimonials/${initial!.id}`;
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
      router.push("/admin/testimonials");
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
      const res = await fetch(`/api/admin/testimonials/${initial.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      if (res.ok) {
        toast.success("Deleted");
        router.push("/admin/testimonials");
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
      <div className="grid gap-2">
        <Label>Headline (optional)</Label>
        <Input value={headline} onChange={(e) => setHeadline(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Quote</Label>
        <textarea className={ta} value={quote} onChange={(e) => setQuote(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Author name</Label>
        <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Author role</Label>
        <Input value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Company logo URL</Label>
        <Input value={companyLogoUrl} onChange={(e) => setCompanyLogoUrl(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Avatar URL</Label>
        <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <input id="ft" type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        <Label htmlFor="ft">Featured</Label>
      </div>
      <div className="grid gap-2 max-w-xs">
        <Label>Sort order</Label>
        <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : "Save"}
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
