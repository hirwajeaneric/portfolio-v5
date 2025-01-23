import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ProgressBarProvider from "./ProgressBarProvider";
import { GalleryVerticalEnd } from "lucide-react"

const geistSans = localFont({
  src: "../../../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Jean Eric Hirwa - Portfolio",
    default: "Login - Jean Eric Hirwa - Portfolio",

  },
  description: "",
  keywords: ""
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative w-screen justify-center items-center flex-col bg-zinc-100 dark:bg-zinc-900 text-foreground`}>
        <ProgressBarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
              <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  Acme Inc.
                </a>
                {children}
              </div>
            </div>

          </ThemeProvider>
        </ProgressBarProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
