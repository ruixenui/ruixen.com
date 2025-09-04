"use client";

import AuroraHeroSection from "../ruixenui/aurora-hero-section";

export default function DemoPage() {
  return (
    <AuroraHeroSection
      title="Next.js + Tailwind + Shadcn = ❤️"
      description="Speed up your workflow with ready-to-use components."
      githubLink="https://github.com/vercel/next.js"
      githubLabel="Star on GitHub"
      primaryButton={{ label: "Install Now", href: "/install" }}
      secondaryButton={{ label: "View Docs", href: "/docs" }}
    />
  );
}
