import type { Metadata } from "next";
import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "New project" };

export default function AdminNewProjectPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/projects">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">New project</h1>
      </div>
      <ProjectForm mode="create" initial={null} />
    </div>
  );
}
