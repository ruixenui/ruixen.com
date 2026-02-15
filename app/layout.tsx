import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
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
  metadataBase: new URL("https://ruixen.com"),
  title: {
    default:
      "Ruixen UI - 350+ Free React & Tailwind CSS Components | Open Source",
    template: "%s | Ruixen UI",
  },
  description:
    "350+ free, open-source React components built with Tailwind CSS, TypeScript & Framer Motion. Supports Tailwind v3 + v4, Radix & Base UI primitives. Copy-paste into Next.js projects.",
  authors: [{ name: "Srinath" }],
  keywords: [
    "react component library",
    "tailwind css components",
    "react ui library",
    "nextjs components",
    "shadcn alternative",
    "free react components",
    "tailwind ui components",
    "open source react components",
    "copy paste react components",
    "tailwind v3 v4 components",
    "radix ui components",
    "base ui components",
    "typescript react components",
    "framer motion components",
    "accessible react components",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ruixen.com",
  },
  openGraph: {
    title: "Ruixen UI - 350+ Free React & Tailwind CSS Components",
    description:
      "350+ free, open-source React components built with Tailwind CSS, TypeScript & Framer Motion. Copy-paste into your Next.js projects.",
    url: "https://ruixen.com/",
    siteName: "Ruixen UI",
    images: [
      {
        url: "https://ruixen.com/website_preview.png",
        width: 1200,
        height: 630,
        alt: "Ruixen UI - React & Tailwind CSS Component Library",
      },
      {
        url: absoluteUrl("/og"),
        width: 1200,
        height: 630,
        alt: "Ruixen UI - React & Tailwind CSS Component Library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruixen UI - 350+ Free React & Tailwind CSS Components",
    description:
      "350+ free, open-source React components built with Tailwind CSS, TypeScript & Framer Motion. Copy-paste into your Next.js projects.",
    creator: "@ruixen_ui",
    images: [
      {
        url: "https://ruixen.com/website_preview.png",
        width: 1200,
        height: 630,
        alt: "Ruixen UI",
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
          "relative flex w-full flex-col justify-center overflow-x-hidden bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <JotaiProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider>
              <SiteBanner />
              {children}
              <Toaster />
              <Analytics />
              {/* <GitHubStarPopup /> */}
            </TooltipProvider>
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
