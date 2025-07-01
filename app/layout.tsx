import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import RuixenSearch from "@/components/ruixen/RuixenSearch";

export const metadata: Metadata = {
  title:
    "Ruixen - Beautifully crafted UI components to elevate your web projects.",
  description:
    "Collection of customizable and open source components made with Next.js, Tailwind, Typescript, and Framer motion.",
  authors: [{ name: "Sreenath" }],
  openGraph: {
    title: "Ruixen",
    description:
      "Collection of customizable and open source components made with Next.js, Tailwind, Typescript, and Framer motion.",
    url: "https://www.ruixen.com/",
    siteName: "Ruixen",
    images: [
      {
        url: "https://i.ibb.co/HthN5FV/Screenshot-2024-09-01-223237.png",
        width: 1200,
        height: 630,
        alt: "Ruixen Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruixen",
    description:
      "Collection of customizable and open source components made with Next.js, Tailwind, Typescript, and Framer motion.",
    images: ["https://i.ibb.co/HthN5FV/Screenshot-2024-09-01-223237.png"],
  },
};

const IntroductionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    />
  </svg>
);

const InstallationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
    />
  </svg>
);

// Pages for ruixen Search
const pages = [
  { title: "Introduction", url: "/docs/introduction", icon: <IntroductionIcon /> },
  { title: "Installation", url: "/docs/installation", icon: <InstallationIcon /> },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B7DGE8GJRF"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B7DGE8GJRF');

              // Theme initialization
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                  if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else if (savedTheme === 'dark' || prefersDark) {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  console.error('Error setting theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <div className="hidden sm:flex">
          <RuixenSearch pages={pages} mode="dark" />
        </div>
        <main className="flex-grow">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
