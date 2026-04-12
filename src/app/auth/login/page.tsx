import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Administrator sign in for the portfolio CMS.",
};

const coverSrc =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80";

function LoginFormFallback() {
  return (
    <div className="w-full h-56 rounded-lg border bg-muted/40 animate-pulse" aria-hidden />
  );
}

export default function AuthLoginPage() {
  const showDevHint = process.env.NODE_ENV === "development";

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium text-foreground">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <GalleryVerticalEnd className="size-4" aria-hidden />
            </span>
            Jean Eric Hirwa
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs space-y-6">
            <Suspense fallback={<LoginFormFallback />}>
              <LoginForm showDevHint={showDevHint} />
            </Suspense>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          <Link href="/" className="underline-offset-4 hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={coverSrc}
          alt="Workspace with laptop"
          fill
          priority
          sizes="50vw"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
