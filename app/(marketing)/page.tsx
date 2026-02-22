import Hero from "@/components/sections/hero";
import { ComponentCategories } from "@/components/sections/component-categories";
import FAQSection from "@/components/sections/faq-section";
import { FAQItem } from "@/components/sections/faq-section";
import WallOfLove from "@/components/sections/wall-of-love";
import VideoShowcaseGrid from "@/components/sections/video-showcase-grid";
import InspirationsSection from "@/components/sections/inspirations-section";

export default function Home() {
  const faqItems: FAQItem[] = [
    {
      id: "installation",
      question: "How do I add a component to my project?",
      answer:
        "Run npx shadcn@latest add with the component URL — for example: npx shadcn@latest add \"https://ruixen.com/r/invert-tabs\". The CLI copies the source file into your project with dependencies resolved. No package to install, no provider to wrap.",
    },
    {
      id: "animations",
      question: "What makes the animations different from CSS transitions?",
      answer:
        "Every component uses spring physics via motion/react instead of fixed-duration CSS transitions. Springs have stiffness, damping, and mass — so a short move snaps while a long move overshoots and settles. The motion adapts to distance naturally, the way physical objects do.",
    },
    {
      id: "tailwind",
      question: "Which Tailwind version do I need?",
      answer:
        "Both are supported. Components default to Tailwind v4. For v3, swap the registry prefix: npx shadcn@latest add \"https://ruixen.com/r/tw3/invert-tabs\". Your selection persists across the docs.",
    },
    {
      id: "primitives",
      question: "Can I use Radix or Base UI primitives?",
      answer:
        "Yes. Every component ships in four registry variants — Tailwind v4, Tailwind v3, Radix primitives, and Base UI primitives. Pick the one that matches your stack from the docs sidebar.",
    },
    {
      id: "license",
      question: "Can I use this in commercial projects?",
      answer:
        "Yes. Ruixen UI is MIT licensed. Use it in personal, commercial, or client projects without restriction. The source is yours once you add it.",
    },
    {
      id: "pro",
      question: "What does Ruixen Pro include?",
      answer:
        "Pro adds 50+ premium templates and advanced compositions on top of the free library at pro.ruixen.com. One-time purchase with lifetime updates. The core 170+ components remain free and open-source.",
    },
  ];

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ruixen UI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: "https://ruixen.com",
    description:
      "170+ free, open-source React components built with Tailwind CSS, TypeScript & Framer Motion. Supports Tailwind v3 + v4, Radix & Base UI primitives.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Ruixen UI",
      url: "https://ruixen.com",
    },
    programmingLanguage: ["TypeScript", "React", "JavaScript"],
    license: "https://opensource.org/licenses/MIT",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Hero />
      <ComponentCategories />
      {/* <VideoShowcaseGrid /> */}
      {/* <InspirationsSection /> */}
      <WallOfLove />
      <FAQSection faqItems={faqItems} className="py-16 md:py-24" />

      {/* Twitter CTA */}
      <section className="w-full py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center px-4">
          <p className="text-sm uppercase tracking-[0.15em] text-foreground/30 mb-4">
            New components every week
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Follow the build
          </h2>
          <p className="mt-4 text-foreground/50 text-base leading-relaxed max-w-lg mx-auto">
            Spring configs, interaction breakdowns, and new component drops.
            Everything ships in public.
          </p>
          <a
            href="https://twitter.com/ruixen_ui"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <svg
              height="14"
              viewBox="0 0 1200 1227"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
            </svg>
            @ruixen_ui
          </a>
        </div>
      </section>
    </>
  );
}
