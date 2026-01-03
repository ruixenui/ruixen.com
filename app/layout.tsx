import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteBanner } from "@/components/site-banner";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fontMono, fontSans } from "@/lib/fonts";
import { absoluteUrl, cn } from "@/lib/utils";
import { Provider as JotaiProvider } from "jotai";
import GitHubStarPopup from "@/components/github-star-popup";

import "@/styles/globals.css";

import type { Viewport } from "next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Ruixen - Beautifully crafted UI components to elevate your web projects.",
  description:
    "Collection of customizable and open source components made with Next.js, Tailwind, Typescript, and Framer Motion.",
  authors: [{ name: "Srinath" }],
  openGraph: {
    title: "Ruixen",
    description:
      "Collection of customizable and open source components made with Next.js, Tailwind, Typescript, and Framer Motion.",
    url: "https://ruixen.com/",
    siteName: "Ruixen",
    images: [
      {
        url: "https://ruixen.com/website_preview.png",
        width: 1200,
        height: 630,
        alt: "Ruixen UI",
      },
      {
        url: absoluteUrl("/og"),
        width: 1200,
        height: 630,
        alt: "Ruixen UI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruixen",
    description:
      "Collection of customizable and open source components made with Next.js, Tailwind, Typescript, and Framer Motion.",
    images: [
      {
        url: "https://ruixen.com/website_preview.png",
        width: 1200,
        height: 630,
        alt: "Ruixen",
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative flex w-full flex-col justify-center overflow-x-hidden scroll-smooth bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <JotaiProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <SmoothScrollProvider>
              <TooltipProvider>
                <SiteBanner />
                {children}
                <Toaster />
                <Analytics />
                <GitHubStarPopup />
              </TooltipProvider>
            </SmoothScrollProvider>
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
