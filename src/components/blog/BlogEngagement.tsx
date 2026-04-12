"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Comment = { id: string; authorName: string; body: string; createdAt: string };

export function BlogEngagement({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [form, setForm] = useState({ authorName: "", authorEmail: "", body: "" });

  const refresh = async () => {
    setLoading(true);
    try {
      const [likesRes, commentsRes] = await Promise.all([
        fetch(`/api/public/posts/${slug}/likes`, { credentials: "include" }),
        fetch(`/api/public/posts/${slug}/comments`, { credentials: "include" }),
      ]);
      const likesData = await likesRes.json();
      const commentsData = await commentsRes.json();
      if (likesRes.ok) {
        setCount(likesData.count ?? 0);
        setLiked(!!likesData.liked);
      }
      if (commentsRes.ok) setComments(commentsData.comments ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, [slug]);

  const toggleLike = async () => {
    const res = await fetch(`/api/public/posts/${slug}/likes`, {
      method: "POST",
      credentials: "include",
    });
    const data = (await res.json()) as { count?: number; liked?: boolean; error?: string };
    if (res.ok) {
      setCount(data.count ?? 0);
      setLiked(!!data.liked);
    } else {
      toast.error(data.error || "Could not update like");
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/public/posts/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          authorName: form.authorName,
          authorEmail: form.authorEmail || undefined,
          body: form.body,
          website: honeypot,
        }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        toast.error(data.error || "Could not submit comment");
        return;
      }
      setForm({ authorName: "", authorEmail: "", body: "" });
      toast.success(data.message || "Thanks — your comment is awaiting moderation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 w-full border-t border-zinc-700 pt-10 space-y-10">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void toggleLike()}
          disabled={loading}
          className="gap-2 border-zinc-600"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />}
          <span>{count ?? 0} likes</span>
        </Button>
      </div>

      <div>
        <h3 className="text-xl text-zinc-200 mb-4">Comments</h3>
        {comments.length === 0 ? (
          <p className="text-zinc-500 text-sm">No published comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="border border-zinc-700 p-4 rounded-md bg-zinc-900/40">
                <p className="text-sm text-zinc-500 mb-1">
                  {c.authorName} · {new Date(c.createdAt).toLocaleDateString()}
                </p>
                <p className="text-zinc-300 whitespace-pre-wrap">{c.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={submitComment} className="space-y-4 w-full text-zinc-300 bg-zinc-800 border border-zinc-700 p-4">
        <p className="text-zinc-300 text-sm">Comments are moderated before they appear.</p>
        {/* Honeypot — must stay hidden */}
        <div className="hidden" aria-hidden="true">
          <Label htmlFor="website">Website</Label>
          <Input id="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cname">Name</Label>
          <Input
            id="cname"
            required
            value={form.authorName}
            placeholder="Enter your name"
            onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
            className="rounded-none border border-zinc-300 w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cemail">Email (optional)</Label>
          <Input
            id="cemail"
            type="email"
            value={form.authorEmail}
            placeholder="Enter your email"
            onChange={(e) => setForm((f) => ({ ...f, authorEmail: e.target.value }))}
            className="rounded-none border border-zinc-300 w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cbody">Comment</Label>
          <Textarea
            id="cbody"
            required
            minLength={4}
            rows={4}
            className="rounded-none border border-zinc-300 resize-none w-full"
            value={form.body}
            placeholder="Enter your comment"
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          />
        </div>
        <Button type="submit" disabled={submitting} className="w-full bg-zinc-300 text-zinc-900 hover:bg-zinc-700 hover:text-zinc-300 transition-all duration-300">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit comment"}
        </Button>
      </form>
    </div>
  );
}
