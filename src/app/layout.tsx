import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { AppToaster } from "@/components/app-toaster";

const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.erichirwa.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s - Jean Eric Hirwa Portfolio",
    default: "Jean Eric Hirwa - Portfolio",
  },
  description:
    "Hello, Welcome to my personal portfolio, explore my works, and let's get in touch! I am a software developer with a passion for building things, both digitally and creatively.",
  keywords:
    "Jean Eric Hirwa, hirwajeaneric, Hirwa Jean Eric, software developer, web developer, portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
          <AppToaster />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
