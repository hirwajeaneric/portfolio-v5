import Link from "next/link";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/experience">← Back</Link>
      </Button>
      <h1 className="text-2xl font-semibold">New experience</h1>
      <ExperienceForm mode="create" initial={null} />
    </div>
  );
}
