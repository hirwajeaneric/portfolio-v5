import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminProjectsDataTable } from "@/components/admin/AdminProjectsDataTable";

export const metadata: Metadata = { title: "Projects" };

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">New project</Link>
        </Button>
      </div>
      <AdminProjectsDataTable />
    </div>
  );
}
