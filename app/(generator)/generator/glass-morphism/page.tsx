// app/glass/page.tsx
import GlassGeneratorPage from "@/components/generator/glass/glass-generator-page";
import { GeneratorCta } from "@/components/generator/generator-cta";
import { RelatedTools } from "@/components/generator/related-tools";
import { ToolJsonLd } from "@/components/generator/tool-json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glassmorphism Generator — Free CSS & Tailwind",
  description:
    "Generate glassmorphism UI instantly — tune blur, transparency, borders and gradients with a live preview. Copy production-ready CSS & Tailwind. Free, no signup.",
  keywords: [
    "glassmorphism generator",
    "css glass generator",
    "tailwind glassmorphism",
    "frosted glass css",
    "blur backdrop filter tool",
    "glass ui generator",
    "frosted card css",
    "glassmorphism online tool",
    "ruixen ui tools",
  ],
  openGraph: {
    title: "Glassmorphism Generator – Free CSS & Tailwind Tool | Ruixen UI",
    description:
      "Create beautiful frosted glass UI with real-time preview. Blur, transparency, borders, gradients and export-ready CSS & Tailwind.",
    url: "/generator/glass-morphism",
    type: "website",
  },
  alternates: { canonical: "/generator/glass-morphism" },
};

export default function Page() {
  return (
    <>
      <ToolJsonLd
        name="Glassmorphism Generator"
        description="Free in-browser glassmorphism generator — tune blur, transparency, borders and gradients with a live preview and copy production-ready CSS & Tailwind."
        path="/generator/glass-morphism"
      />
      <GlassGeneratorPage />
      <GeneratorCta tool="glass-morphism" />
      <RelatedTools current="glass-morphism" />
    </>
  );
}
