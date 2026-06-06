import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "UI Gradients — Free 4K Gradient Backgrounds",
  description:
    "Browse and download free 4K gradient backgrounds for UIs, hero sections and wallpapers. Copy CSS or export PNG in one click. Curated, modern gradient collection.",
  keywords: [
    "ui gradients",
    "gradient backgrounds",
    "4k gradients",
    "hero gradient background",
    "gradient wallpapers",
    "css gradients",
    "ruixen ui tools",
  ],
  openGraph: {
    title: "UI Gradients — Free 4K Gradient Backgrounds | Ruixen UI",
    description:
      "Curated 4K gradient backgrounds for UI, heroes and wallpapers. Copy CSS or download PNG instantly.",
    url: "/gradients",
    type: "website",
  },
  alternates: { canonical: "/gradients" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
