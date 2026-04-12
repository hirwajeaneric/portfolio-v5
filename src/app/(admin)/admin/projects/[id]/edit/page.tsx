import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = await prisma.project.findUnique({ where: { id }, select: { name: true } });
  return { title: p ? `Edit: ${p.name}` : "Edit project" };
}

export default async function AdminEditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/projects">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">Edit project</h1>
      </div>
      <ProjectForm mode="edit" initial={project} />
    </div>
  );
}
