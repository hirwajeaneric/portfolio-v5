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
  slug: string;
  name: string;
  category: string;
  iconKey: string;
  sortOrder: number;
  active: boolean;
};

export function TechnologyForm({ mode, initial }: { mode: "create" | "edit"; initial: Row | null }) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [loading, setLoading] = useState(false);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [iconKey, setIconKey] = useState(initial?.iconKey ?? "");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [active, setActive] = useState(initial?.active ?? true);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload: Record<string, unknown> = {
      name,
      category,
      iconKey,
      sortOrder: Number.parseInt(sortOrder, 10) || 0,
      active,
    };
    if (slug.trim()) payload.slug = slug.trim();

    try {
      const url =
        mode === "create" ? "/api/admin/technologies" : `/api/admin/technologies/${initial!.id}`;
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
      router.push("/admin/technologies");
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
      const res = await fetch(`/api/admin/technologies/${initial.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      if (res.ok) {
        toast.success("Deleted");
        router.push("/admin/technologies");
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
    <form onSubmit={submit} className="max-w-xl space-y-4">
      <div className="grid gap-2">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Slug (optional)</Label>
        <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Category</Label>
        <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Icon key (Simple Icons slug)</Label>
        <Input value={iconKey} onChange={(e) => setIconKey(e.target.value)} required />
      </div>
      <div className="grid gap-2 max-w-xs">
        <Label>Sort order</Label>
        <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <input id="actt" type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        <Label htmlFor="actt">Active</Label>
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
