import Link from "next/link";
import { AwardForm } from "@/components/admin/AwardForm";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/awards">← Back</Link>
      </Button>
      <h1 className="text-2xl font-semibold">New award</h1>
      <AwardForm mode="create" initial={null} />
    </div>
  );
}
