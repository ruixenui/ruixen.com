// app/glass/page.tsx
import GlassGeneratorPage from "@/components/generator/glass/glass-generator-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Glassmorphism Generator – Free CSS & Tailwind Tool (2025) | Ruixen UI",
  description:
    "Generate beautiful glassmorphism UI instantly. Customize blur, transparency, borders, shadows and gradients. Export CSS & Tailwind. 100% free, modern, fast and easy.",
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
    url: "https://www.ruixen.com/tools/glass",
    type: "website",
  },
  alternates: { canonical: "https://www.ruixen.com/tools/glass" },
}

export default function Page() {
  return <GlassGeneratorPage />
}
