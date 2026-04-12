import Link from "next/link";
import { SiteStatisticForm } from "@/components/admin/SiteStatisticForm";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="space-y-6 max-w-md">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/statistics">← Back</Link>
      </Button>
      <h1 className="text-2xl font-semibold">New statistic</h1>
      <SiteStatisticForm mode="create" initial={null} />
    </div>
  );
}
