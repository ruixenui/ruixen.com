import ShadowGeneratorPage from "@/components/generator/shadow/shadow-generator-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shadow Generator — Beautiful Shadows in Seconds | Ruixen UI (2025)",
  description:
    "Generate beautiful modern UI shadows for cards, buttons, modals and components. Build layered, soft, hard, inset, neumorphism and elevation shadows. Export CSS and Tailwind instantly.",
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
    url: "https://www.ruixen.com/tools/shadow",
    type: "website",
  },
  alternates: { canonical: "https://www.ruixen.com/tools/shadow" },
};

export default function Page() {
  return <ShadowGeneratorPage />;
}
