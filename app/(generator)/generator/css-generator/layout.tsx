import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ToolJsonLd } from "@/components/generator/tool-json-ld";

export const metadata: Metadata = {
  title: "CSS Gradient Generator — Copy CSS & Tailwind",
  description:
    "Build linear, radial and conic CSS gradients with a live editor. Drag color stops, pick presets, then copy ready-to-use CSS & Tailwind. Free, no signup.",
  keywords: [
    "css gradient generator",
    "gradient generator",
    "linear gradient css",
    "radial gradient css",
    "conic gradient",
    "tailwind gradient generator",
    "ui gradients",
    "ruixen ui tools",
  ],
  openGraph: {
    title: "CSS Gradient Generator — Linear, Radial & Conic | Ruixen UI",
    description:
      "Visual CSS gradient editor with color stops, presets and one-click export to CSS & Tailwind.",
    url: "/generator/css-generator",
    type: "website",
  },
  alternates: { canonical: "/generator/css-generator" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="CSS Gradient Generator"
        description="Free in-browser CSS gradient generator — build linear, radial and conic gradients with drag-and-drop color stops and copy ready-to-use CSS & Tailwind."
        path="/generator/css-generator"
      />
      {children}
    </>
  );
}
