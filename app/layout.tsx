import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteBanner } from "@/components/site-banner";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PHProvider } from "@/components/posthog-provider";
import { fontMono, fontSans } from "@/lib/fonts";
import { absoluteUrl, cn } from "@/lib/utils";
import { Provider as JotaiProvider } from "jotai";
import GitHubStarPopup from "@/components/github-star-popup";
import { siteConfig } from "@/config/site";

import "@/styles/globals.css";

import type { Viewport } from "next";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Ruixen UI — Marketing UI for shadcn in any stack",
    template: "%s | Ruixen UI",
  },
  description: siteConfig.description,
  authors: [{ name: "Srinath" }],
  keywords: siteConfig.keywords,
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
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Ruixen UI — Marketing UI for shadcn",
    description: siteConfig.description,
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/og"),
        width: 1200,
        height: 630,
        alt: "Ruixen UI — Marketing UI for shadcn projects, multi-stack",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruixen UI — Marketing UI for shadcn",
    description: siteConfig.description,
    creator: "@ruixen_ui",
    images: [
      {
        url: absoluteUrl("/og"),
        width: 1200,
        height: 630,
        alt: "Ruixen UI — Marketing UI for shadcn projects, multi-stack",
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
          <PHProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <TooltipProvider>
                <SiteBanner />
                {children}
                <Toaster />
                <Analytics />
                {/* <GitHubStarPopup /> */}
              </TooltipProvider>
            </ThemeProvider>
          </PHProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
