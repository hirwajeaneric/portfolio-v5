"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";

type Row = { id: string; label: string; value: string; sortOrder: number };

export function SiteStatisticForm({ mode, initial }: { mode: "create" | "edit"; initial: Row | null }) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState(initial?.label ?? "");
  const [value, setValue] = useState(initial?.value ?? "");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        label,
        value,
        sortOrder: Number.parseInt(sortOrder, 10) || 0,
      };
      const url =
        mode === "create" ? "/api/admin/site-statistics" : `/api/admin/site-statistics/${initial!.id}`;
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
      router.push("/admin/statistics");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!initial || !confirm("Delete?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/site-statistics/${initial.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      if (res.ok) {
        toast.success("Deleted");
        router.push("/admin/statistics");
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
    <form onSubmit={submit} className="max-w-md space-y-4">
      <div className="grid gap-2">
        <Label>Label</Label>
        <Input value={label} onChange={(e) => setLabel(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Value</Label>
        <Input value={value} onChange={(e) => setValue(e.target.value)} required />
      </div>
      <div className="grid gap-2 max-w-[140px]">
        <Label>Sort</Label>
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
