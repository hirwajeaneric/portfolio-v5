import type { Metadata } from "next";
import { AdminMediaLibrary } from "@/components/admin/AdminMediaLibrary";

export const metadata: Metadata = { title: "Media" };

export default function AdminMediaPage() {
  return <AdminMediaLibrary />;
}
