"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/lib/stores/auth-store";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import { BlogStatus } from "@/generated/prisma/enums";
import { adminHeaders } from "./admin-fetch";
import { AdminHtmlEditor } from "./AdminHtmlEditor";
import { MediaAssetSelector } from "./MediaAssetSelector";

type Category = { id: string; name: string; slug: string };

type Post = {
  id: string;
  title: string;
  slug: string;
  introduction: string;
  content: string;
  coverImageUrl: string;
  readTime: string;
  status: (typeof BlogStatus)[keyof typeof BlogStatus];
  categoryId: string | null;
};

export function BlogPostForm({
  mode,
  categories,
  initial,
}: {
  mode: "create" | "edit";
  categories: Category[];
  initial: Post | null;
}) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [introduction, setIntroduction] = useState(initial?.introduction ?? "");
  const [editorContent, setEditorContent] = useState(initial?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.coverImageUrl ?? "");
  const [readTime, setReadTime] = useState(initial?.readTime ?? "5 min");
  const [status, setStatus] = useState<string>(initial?.status ?? BlogStatus.DRAFT);
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? "");

  useEffect(() => {
    if (!initial) return;
    setTitle(initial.title);
    setSlug(initial.slug);
    setIntroduction(initial.introduction);
    setEditorContent(initial.content);
    setCoverImageUrl(initial.coverImageUrl);
    setReadTime(initial.readTime);
    setStatus(initial.status);
    setCategoryId(initial.categoryId ?? "");
  }, [initial?.id]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const content = sanitizeHtml(editorContent);
    const payload: Record<string, unknown> = {
      title,
      introduction,
      content,
      coverImageUrl,
      readTime,
      status,
      categoryId: categoryId || null,
    };
    if (slug.trim()) payload.slug = slug.trim();

    try {
      const url =
        mode === "create" ? "/api/admin/blog-posts" : `/api/admin/blog-posts/${initial!.id}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        credentials: "include",
        headers: adminHeaders(csrfToken),
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string; slug?: string };
      if (!res.ok) {
        toast.error(data.error || "Save failed");
        return;
      }
      toast.success(mode === "create" ? "Post created" : "Post saved");
      router.push("/admin/blogs");
      router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!initial || !confirm("Delete this post permanently?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog-posts/${initial.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        toast.error(data.error || "Delete failed");
        return;
      }
      toast.success("Post deleted");
      router.push("/admin/blogs");
      router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basics</CardTitle>
          <CardDescription>Title, slug, and reading metadata.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">Slug (optional)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-post-url"
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            />
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div className="grid gap-2">
              <Label htmlFor="readTime">Read time</Label>
              <Input id="readTime" value={readTime} onChange={(e) => setReadTime(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BlogStatus.DRAFT}>Draft</SelectItem>
                  <SelectItem value={BlogStatus.PUBLISHED}>Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select value={categoryId || "__none__"} onValueChange={(v) => setCategoryId(v === "__none__" ? "" : v)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">— None —</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
          <CardDescription>Plain text or light markup shown under the title.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            id="intro"
            className="min-h-[120px]"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            required
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Body</CardTitle>
          <CardDescription>Rich HTML content (sanitized on save).</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminHtmlEditor
            label="Article body"
            value={editorContent}
            onChange={setEditorContent}
            minHeight={520}
            uploadFolder="blog"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cover image</CardTitle>
          <CardDescription>Paste a Cloudinary URL or pick from your library.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="cover">Cover image URL</Label>
              <Input id="cover" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} required />
            </div>
            <MediaAssetSelector value={coverImageUrl} onSelect={setCoverImageUrl} />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : mode === "create" ? "Create post" : "Save changes"}
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
