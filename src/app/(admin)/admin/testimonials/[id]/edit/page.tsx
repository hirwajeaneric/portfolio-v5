import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();
  return (
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/testimonials">← Back</Link>
      </Button>
      <h1 className="text-2xl font-semibold">Edit testimonial</h1>
      <TestimonialForm mode="edit" initial={t} />
    </div>
  );
}
