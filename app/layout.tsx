import { Analytics } from "@/components/analytics";
import { PHProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
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
        url: absoluteUrl("/og"), // keeps your original constructMetadata image
        width: 1200,
        height: 630,
        alt: "Ruixen",
      },
      {
        url: "https://ruixen.com/ruixen_light.png", // explicit static image
        width: 1200,
        height: 630,
        alt: "Ruixen",
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
        url: "https://ruixen.com/ruixen_light.png",
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
          <PHProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <TooltipProvider>
                {children}
                <Toaster />
                <Analytics />
                <GitHubStarPopup />
              </TooltipProvider>
            </ThemeProvider>
          </PHProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
