import type { Metadata } from "next";
import Link from "next/link";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "New service" };

export default function AdminNewServicePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/services">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold">New service</h1>
      </div>
      <ServiceForm mode="create" initial={null} />
    </div>
  );
}
