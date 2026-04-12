import Link from "next/link";
import { TechnologyForm } from "@/components/admin/TechnologyForm";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="space-y-6 max-w-xl">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/technologies">← Back</Link>
      </Button>
      <h1 className="text-2xl font-semibold">New technology</h1>
      <TechnologyForm mode="create" initial={null} />
    </div>
  );
}
