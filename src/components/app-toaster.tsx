"use client";

import { Toaster } from "@/components/ui/sonner";

/** Global Sonner (shadcn) host — mount once under `ThemeProvider` in the root layout. */
export function AppToaster() {
  return <Toaster richColors position="top-center" closeButton />;
}
