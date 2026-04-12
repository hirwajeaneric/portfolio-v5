"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";

type Service = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  heroImageUrl: string;
  showOnHome: boolean;
  homeSortOrder: number;
  technologies: unknown;
  sections: { title: string; description: string; sortOrder: number }[];
};

const ta =
  "flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm font-mono text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

function stringifyJson(value: unknown, fallback: string) {
  try {
    return JSON.stringify(value ?? JSON.parse(fallback), null, 2);
  } catch {
    return fallback;
  }
}

export function ServiceForm({ mode, initial }: { mode: "create" | "edit"; initial: Service | null }) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription ?? "");
  const [heroImageUrl, setHeroImageUrl] = useState(initial?.heroImageUrl ?? "");
  const [showOnHome, setShowOnHome] = useState(initial?.showOnHome ?? false);
  const [homeSortOrder, setHomeSortOrder] = useState(String(initial?.homeSortOrder ?? 0));
  const [technologiesJson, setTechnologiesJson] = useState(stringifyJson(initial?.technologies, "[]"));
  const [sectionsJson, setSectionsJson] = useState(
    stringifyJson(
      initial?.sections?.map((s) => ({ title: s.title, description: s.description, sortOrder: s.sortOrder })),
      "[]"
    )
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const technologies = JSON.parse(technologiesJson) as unknown;
      const sections = JSON.parse(sectionsJson) as unknown;
      if (!Array.isArray(technologies) || !technologies.every((t) => typeof t === "string")) {
        throw new Error("technologies must be a JSON array of strings");
      }
      if (!Array.isArray(sections)) throw new Error("sections must be a JSON array");
      for (const s of sections) {
        if (!s || typeof s !== "object" || typeof (s as { title?: unknown }).title !== "string") {
          throw new Error("Each section needs title and description");
        }
      }

      const payload: Record<string, unknown> = {
        name,
        shortDescription,
        heroImageUrl,
        showOnHome,
        homeSortOrder: Number.parseInt(homeSortOrder, 10) || 0,
        technologies,
        sections,
      };
      if (slug.trim()) payload.slug = slug.trim();

      const url = mode === "create" ? "/api/admin/services" : `/api/admin/services/${initial!.id}`;
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
      router.push("/admin/services");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid JSON");
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!initial || !confirm("Delete this service and all sections?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/services/${initial.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        toast.error(data.error || "Delete failed");
        return;
      }
      toast.success("Deleted");
      router.push("/admin/services");
      router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-4">
      <div className="grid gap-2">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Slug (optional)</Label>
        <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Short description</Label>
        <textarea className={ta} value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Hero image URL</Label>
        <Input value={heroImageUrl} onChange={(e) => setHeroImageUrl(e.target.value)} required />
      </div>
      <div className="flex items-center gap-2">
        <input id="sh" type="checkbox" checked={showOnHome} onChange={(e) => setShowOnHome(e.target.checked)} />
        <Label htmlFor="sh">Show on home</Label>
      </div>
      <div className="grid gap-2 max-w-xs">
        <Label>Home sort order</Label>
        <Input type="number" value={homeSortOrder} onChange={(e) => setHomeSortOrder(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Technologies (JSON string array, e.g. [&quot;React&quot;,&quot;Node&quot;])</Label>
        <textarea className={ta} value={technologiesJson} onChange={(e) => setTechnologiesJson(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Sections (JSON array of {`{ title, description, sortOrder? }`})</Label>
        <textarea className={`${ta} min-h-[200px]`} value={sectionsJson} onChange={(e) => setSectionsJson(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : mode === "create" ? "Create" : "Save"}
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
