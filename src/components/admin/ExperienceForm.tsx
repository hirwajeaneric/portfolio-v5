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
  company: string;
  title: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  current: boolean;
  bullets: unknown;
  sortOrder: number;
};

const ta =
  "flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm font-mono text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

function bulletsString(b: unknown) {
  try {
    return JSON.stringify(Array.isArray(b) ? b : [], null, 2);
  } catch {
    return "[]";
  }
}

export function ExperienceForm({ mode, initial }: { mode: "create" | "edit"; initial: Row | null }) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState(initial?.company ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [startDate, setStartDate] = useState(initial?.startDate ?? "");
  const [endDate, setEndDate] = useState(initial?.endDate ?? "");
  const [current, setCurrent] = useState(initial?.current ?? false);
  const [bulletsJson, setBulletsJson] = useState(bulletsString(initial?.bullets));
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const bullets = JSON.parse(bulletsJson) as unknown;
      if (!Array.isArray(bullets) || !bullets.every((x) => typeof x === "string")) {
        throw new Error("bullets must be a JSON array of strings");
      }
      const payload = {
        company,
        title,
        location: location.trim() || null,
        startDate,
        endDate: endDate.trim() || null,
        current,
        bullets,
        sortOrder: Number.parseInt(sortOrder, 10) || 0,
      };
      const url =
        mode === "create" ? "/api/admin/experience" : `/api/admin/experience/${initial!.id}`;
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
      router.push("/admin/experience");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid JSON");
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!initial || !confirm("Delete?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/experience/${initial.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      if (res.ok) {
        toast.success("Deleted");
        router.push("/admin/experience");
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
        <Label>Company</Label>
        <Input value={company} onChange={(e) => setCompany(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Location</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div className="grid gap-2 max-w-xs">
        <Label>Start date</Label>
        <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div className="grid gap-2 max-w-xs">
        <Label>End date</Label>
        <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <input id="cur" type="checkbox" checked={current} onChange={(e) => setCurrent(e.target.checked)} />
        <Label htmlFor="cur">Current role</Label>
      </div>
      <div className="grid gap-2">
        <Label>Bullets (JSON string array)</Label>
        <textarea className={ta} value={bulletsJson} onChange={(e) => setBulletsJson(e.target.value)} />
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
