import type { Metadata } from "next";
import Link from "next/link";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "New testimonial" };

export default function Page() {
  return (
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/testimonials">← Back</Link>
      </Button>
      <h1 className="text-2xl font-semibold">New testimonial</h1>
      <TestimonialForm mode="create" initial={null} />
    </div>
  );
}
