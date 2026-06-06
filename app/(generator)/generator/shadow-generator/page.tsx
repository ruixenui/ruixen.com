import ShadowGeneratorPage from "@/components/generator/shadow/shadow-generator-page";
import { GeneratorCta } from "@/components/generator/generator-cta";
import { RelatedTools } from "@/components/generator/related-tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailwind Shadow Generator — CSS Box-Shadow Tool",
  description:
    "Create soft, layered and neumorphic box-shadows with a live preview. Build elevation and inset shadows, then copy CSS & Tailwind instantly. Free, no signup.",
  keywords: [
    "shadow generator",
    "css box-shadow generator",
    "tailwind shadow generator",
    "neumorphism shadow",
    "soft ui",
    "material elevation",
    "ui shadows",
    "box-shadow tool",
    "ruixen ui tools",
  ],
  openGraph: {
    title: "Shadow Generator — Create Beautiful Shadows in Seconds | Ruixen UI",
    description:
      "Professional real-time shadow builder with presets, layers, and instant export to CSS & Tailwind.",
    url: "/generator/shadow-generator",
    type: "website",
  },
  alternates: { canonical: "/generator/shadow-generator" },
};

export default function Page() {
  return (
    <>
      <ShadowGeneratorPage />
      <GeneratorCta tool="shadow-generator" />
      <RelatedTools current="shadow-generator" />
    </>
  );
}
