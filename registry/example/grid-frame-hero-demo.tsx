import { GridFrameHero } from "@/registry/ruixenui/grid-frame-hero";

export default function GridFrameHeroDemo() {
  return (
    <GridFrameHero
      title={
        <>
          Production-ready components{" "}
          <span className="max-md:hidden">for modern React apps</span>
          <span className="md:hidden">built right</span>
        </>
      }
      description="Copy, paste, and ship beautiful interfaces. Ruixen UI gives you a growing library of accessible components built with Tailwind CSS and TypeScript."
      primaryAction={{ href: "#", label: "Browse components" }}
      microcopy="Open-source. MIT licensed."
    />
  );
}
