import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/widgets/Navbar";
import Footer from "@/components/widgets/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ProgressBarProvider from "./ProgressBarProvider";
import Providers from "../providers";
import { Analytics } from "@vercel/analytics/next"

const geistSans = localFont({
  src: "../../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Jean Eric Hirwa Portfolio",
    default: "Jean Eric Hirwa - Portfolio",

  },
  description: "Hello, Welcome to my personal portfolio, explore my works, and let's get in touch! I am a software developer with a passion for building things, both digitally and creatively. He enjoys combining his tech skills with his design background to create innovative solutions. Currently, he is working on empowering women through tech at IRO. Outside of work, he loves exploring new ideas, dancing, and diving into a good book or movie.",
  keywords: "Jean Eric Hirwa, hirwajeaneric, Hirwa Jean Eric,  software developer, web developer, web design, software engineer, wordpress developer, artist, tech lead, backend engineer, frontend engineer, full-stack developer, fullstack developer, database engineer, Information Technology, Author, Artist"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative flex w-screen justify-center items-center flex-col bg-zinc-100 dark:bg-zinc-900 text-foreground`}>
        <ProgressBarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex w-full flex-1 flex-col justify-start items-start z-10">
              <Providers>{children}</Providers>
            </main>
            <Footer />
          </ThemeProvider>
        </ProgressBarProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
