"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import { adminHeaders } from "./admin-fetch";
import { AdminHtmlEditor } from "./AdminHtmlEditor";
import { MediaAssetSelector } from "./MediaAssetSelector";
import { ProjectCategory } from "@/generated/prisma/enums";

const categories = Object.values(ProjectCategory) as string[];

type Project = {
  id: string;
  name: string;
  slug: string;
  category: (typeof ProjectCategory)[keyof typeof ProjectCategory];
  description: string | null;
  deliverable: string | null;
  challenge: string | null;
  goal: string | null;
  result: string | null;
  client: string;
  timeline: string;
  link: string;
  imageUrl: string;
  typeLabel: string;
  technologies: unknown;
  otherLinks: unknown;
  gallery: unknown;
  published: boolean;
  sortOrder: number;
};

const textareaClass =
  "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

function stringifyJson(value: unknown, fallback: string) {
  try {
    return JSON.stringify(value ?? JSON.parse(fallback), null, 2);
  } catch {
    return fallback;
  }
}

export function ProjectForm({ mode, initial }: { mode: "create" | "edit"; initial: Project | null }) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? ProjectCategory.Web);
  const [descriptionHtml, setDescriptionHtml] = useState(initial?.description ?? "");
  const [deliverable, setDeliverable] = useState(initial?.deliverable ?? "");
  const [challenge, setChallenge] = useState(initial?.challenge ?? "");
  const [goal, setGoal] = useState(initial?.goal ?? "");
  const [result, setResult] = useState(initial?.result ?? "");
  const [client, setClient] = useState(initial?.client ?? "");
  const [timeline, setTimeline] = useState(initial?.timeline ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [typeLabel, setTypeLabel] = useState(initial?.typeLabel ?? "");
  const [technologiesJson, setTechnologiesJson] = useState(stringifyJson(initial?.technologies, "[]"));
  const [otherLinksJson, setOtherLinksJson] = useState(stringifyJson(initial?.otherLinks, "[]"));
  const [galleryJson, setGalleryJson] = useState(stringifyJson(initial?.gallery, "[]"));
  const [published, setPublished] = useState(initial?.published ?? true);
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));

  useEffect(() => {
    if (!initial) return;
    setDescriptionHtml(initial.description ?? "");
    setImageUrl(initial.imageUrl);
  }, [initial?.id]);

  function parseJsonField(raw: string, field: string): unknown {
    try {
      return JSON.parse(raw) as unknown;
    } catch {
      throw new Error(`Invalid JSON in ${field}`);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const technologies = parseJsonField(technologiesJson, "technologies");
      const otherLinks = parseJsonField(otherLinksJson, "otherLinks");
      const gallery = parseJsonField(galleryJson, "gallery");
      if (!Array.isArray(technologies) || !Array.isArray(otherLinks) || !Array.isArray(gallery)) {
        throw new Error("technologies, otherLinks, and gallery must be JSON arrays");
      }

      const descriptionSanitized = sanitizeHtml(descriptionHtml).trim();
      const payload: Record<string, unknown> = {
        name,
        category,
        description: descriptionSanitized ? descriptionSanitized : null,
        deliverable: deliverable || null,
        challenge: challenge || null,
        goal: goal || null,
        result: result || null,
        client,
        timeline,
        link,
        imageUrl,
        typeLabel,
        technologies,
        otherLinks,
        gallery,
        published,
        sortOrder: Number.parseInt(sortOrder, 10) || 0,
      };
      if (slug.trim()) payload.slug = slug.trim();

      const url =
        mode === "create" ? "/api/admin/projects" : `/api/admin/projects/${initial!.id}`;
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
      toast.success(mode === "create" ? "Project created" : "Project saved");
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid JSON");
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!initial || !confirm("Delete this project permanently?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects/${initial.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        toast.error(data.error || "Delete failed");
        return;
      }
      toast.success("Project deleted");
      router.push("/admin/projects");
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
        <Label htmlFor="pname">Name</Label>
        <Input id="pname" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pslug">Slug (optional)</Label>
        <Input id="pslug" value={slug} onChange={(e) => setSlug(e.target.value)} />
      </div>
      <div className="grid gap-2 max-w-md">
        <Label htmlFor="pcat">Category</Label>
        <select
          id="pcat"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value as (typeof ProjectCategory)[keyof typeof ProjectCategory])}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ptype">Type label</Label>
        <Input id="ptype" value={typeLabel} onChange={(e) => setTypeLabel(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pclient">Client</Label>
        <Input id="pclient" value={client} onChange={(e) => setClient(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ptime">Timeline</Label>
        <Input id="ptime" value={timeline} onChange={(e) => setTimeline(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="plink">Link</Label>
        <Input id="plink" value={link} onChange={(e) => setLink(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pimg">Image URL</Label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <Input
            id="pimg"
            className="flex-1"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <MediaAssetSelector value={imageUrl} onSelect={setImageUrl} />
        </div>
      </div>
      <div className="grid gap-2">
        <AdminHtmlEditor
          label="Description"
          value={descriptionHtml}
          onChange={setDescriptionHtml}
          minHeight={360}
          uploadFolder="portfolio"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pdel">Deliverable</Label>
        <textarea id="pdel" className={textareaClass} value={deliverable} onChange={(e) => setDeliverable(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pch">Challenge</Label>
        <textarea id="pch" className={textareaClass} value={challenge} onChange={(e) => setChallenge(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pgoal">Goal</Label>
        <textarea id="pgoal" className={textareaClass} value={goal} onChange={(e) => setGoal(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pres">Result</Label>
        <textarea id="pres" className={textareaClass} value={result} onChange={(e) => setResult(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ptech">Technologies (JSON array)</Label>
        <textarea
          id="ptech"
          className={`${textareaClass} min-h-[120px] font-mono text-xs`}
          value={technologiesJson}
          onChange={(e) => setTechnologiesJson(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pol">Other links (JSON array)</Label>
        <textarea
          id="pol"
          className={`${textareaClass} min-h-[100px] font-mono text-xs`}
          value={otherLinksJson}
          onChange={(e) => setOtherLinksJson(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pgal">Gallery (JSON array of image URLs)</Label>
        <textarea
          id="pgal"
          className={`${textareaClass} min-h-[100px] font-mono text-xs`}
          value={galleryJson}
          onChange={(e) => setGalleryJson(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <input id="ppub" type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        <Label htmlFor="ppub">Published</Label>
      </div>
      <div className="grid gap-2 max-w-xs">
        <Label htmlFor="psort">Sort order</Label>
        <Input id="psort" type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : mode === "create" ? "Create project" : "Save changes"}
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
