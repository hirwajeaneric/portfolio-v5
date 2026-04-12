"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";

export function BlogCategoryCreateForm() {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: Record<string, string> = { name };
      if (slug.trim()) payload.slug = slug.trim();
      const res = await fetch("/api/admin/blog-categories", {
        method: "POST",
        credentials: "include",
        headers: adminHeaders(csrfToken),
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Failed");
        return;
      }
      toast.success("Category added");
      setName("");
      setSlug("");
      router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-3 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
      <div className="grid gap-1">
        <Label htmlFor="cname">Name</Label>
        <Input id="cname" value={name} onChange={(e) => setName(e.target.value)} required className="min-w-[200px]" />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="cslug">Slug (optional)</Label>
        <Input id="cslug" value={slug} onChange={(e) => setSlug(e.target.value)} className="min-w-[160px]" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "…" : "Add category"}
      </Button>
    </form>
  );
}
