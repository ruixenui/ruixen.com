import { StructuredHeroSection } from "@/registry/ruixenui/structured-hero-section";

/* ── demo ─────────────────────────────────────────────────────── */

export default function StructuredHeroSectionDemo() {
  return (
    <StructuredHeroSection
      announcement="600+ Components and Counting"
      announcementAction={{ label: "Browse", href: "/docs/components" }}
      title={
        <>
          Modern Components{" "}
          <span className="max-sm:hidden">for Every Interface</span>
          <span className="sm:hidden">Built Right</span>
        </>
      }
      description="Modern, fast, and customizable React components built with Tailwind CSS, TypeScript, and accessibility in mind. Set up in minutes."
      primaryAction={{ href: "/docs/components", label: "Get Started" }}
      secondaryAction={{
        href: "https://pro.ruixen.com",
        label: "Get Pro Access",
      }}
      cards={[{}, {}, {}]}
      trustedBy={{
        heading: "Built with the technologies you trust",
        action: { label: "View documentation", href: "/docs" },
        logos: [
          <span
            key="react"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            React
          </span>,
          <span
            key="nextjs"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            Next.js
          </span>,
          <span
            key="tailwind"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            Tailwind CSS
          </span>,
          <span
            key="typescript"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            TypeScript
          </span>,
          <span
            key="framer"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            Framer Motion
          </span>,
          <span
            key="shadcn"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            shadcn/ui
          </span>,
          <span
            key="radix"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            Radix UI
          </span>,
          <span
            key="zod"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            Zod
          </span>,
        ],
      }}
    />
  );
}
