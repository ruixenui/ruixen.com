import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Gradient Collection | Ruixen UI - Free 4K Gradients",
  description:
    "Download beautiful, high-quality 4K gradients for your next project. Free collection of 23+ premium gradients in 5 categories. PNG, JPG, WebP formats available.",
  keywords: [
    "gradients",
    "free gradients",
    "4K gradients",
    "background gradients",
    "hero gradients",
    "design resources",
    "web design",
    "UI backgrounds",
  ],
  openGraph: {
    title: "Gradient Collection | Ruixen UI",
    description:
      "Download beautiful, high-quality 4K gradients for your next project. Free collection of 23+ premium gradients.",
    type: "website",
    url: "https://ruixen.com/gradients",
    images: [
      {
        url: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gradients/hero_gradient/hero-gradients-01.png",
        width: 3840,
        height: 2160,
        alt: "Ruixen UI Gradient Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Collection | Ruixen UI",
    description:
      "Download beautiful, high-quality 4K gradients for free. 23+ premium gradients in 5 categories.",
    images: [
      "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gradients/hero_gradient/hero-gradients-01.png",
    ],
  },
};

interface GradientsLayoutProps {
  children: React.ReactNode;
}

export default async function GradientsLayout({
  children,
}: GradientsLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </>
  );
}
