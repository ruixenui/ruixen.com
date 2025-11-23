"use client";

import * as React from "react";
import { useGradient } from "@/lib/use-gradient";
import { GradientPreview } from "@/components/generator/css/gradient-preview";
import { ControlsPanel } from "@/components/generator/css/controls-panel";
import { ColorStopList } from "@/components/generator/css/color-stop-list";
import { PresetsGrid } from "@/components/generator/css/presets-grid";
import { ExportButtons } from "@/components/generator/css/export-buttons";
import FAQSection from "@/components/sections/faq-section";
import { FAQItem } from "@/registry/ruixenui/staggered-faq-section";

const faqItems: FAQItem[] = [
  {
    id: "what-is-gradient",
    question: "What is a CSS gradient?",
    answer:
      "A CSS gradient is a smooth transition between two or more colors generated using linear, radial, or conic gradient functions. It removes the need for static image backgrounds and scales perfectly on any screen.",
  },
  {
    id: "generator-benefit",
    question: "Why use a CSS Gradient Generator?",
    answer:
      "A gradient generator helps you visually edit color stops, angles, and blending without writing manual CSS. It ensures smooth, professional gradients with one-click export for production code.",
  },
  {
    id: "types-of-gradients",
    question: "Which gradient types does CSS support?",
    answer:
      "CSS supports three main types: linear gradients for directional blends, radial gradients for circular fades, and conic gradients for rotational color sweeps.",
  },
  {
    id: "tailwind-support",
    question: "Can I use Tailwind CSS with gradients?",
    answer:
      "Yes. Tailwind supports gradients out of the box with utilities like bg-gradient-to-r. For custom multi-stop gradients, you can paste arbitrary values using bg-[linear-gradient(...)] and safelist them if generated dynamically.",
  },
  {
    id: "accessibility",
    question: "How do I make gradients accessible?",
    answer:
      "Ensure sufficient contrast between text and the gradient background. Use subtle color transitions, avoid extremely saturated midpoints, and test with accessibility contrast tools.",
  },
  {
    id: "best-use-cases",
    question: "Where should gradients be used in UI design?",
    answer:
      "Gradients work well for hero sections, buttons, cards, navigation bars, and subtle background textures. Use softer gradients for dashboards and bolder ones for landing pages.",
  },
  {
    id: "performance",
    question: "Do CSS gradients affect performance?",
    answer:
      "CSS gradients are rendered by the browser’s GPU and have minimal performance cost. They are usually lighter and faster than using image files.",
  },
  {
    id: "copy-export",
    question: "Can I export gradient code for CSS and Tailwind?",
    answer:
      "Yes. The generator provides direct export for background-image CSS and Tailwind arbitrary value utilities, ensuring your gradient looks identical in production.",
  },
  {
    id: "browser-compatibility",
    question: "Do gradients work in all browsers?",
    answer:
      "Yes, gradients are supported across all modern browsers. Legacy prefixes are rarely required today but can be added for older compatibility.",
  },
  {
    id: "presets",
    question: "Why should I use gradient presets?",
    answer:
      "Presets provide professionally balanced color combinations and stop spacing. They help you start quickly and avoid harsh transitions or amateur-looking blends.",
  },
];

export default function GradientGeneratorPage() {
  const {
    gradient,
    setType,
    setAngle,
    setOrigin,
    addStop,
    updateStop,
    removeStop,
    reorderStops,
    reverseStops,
    shuffleStops,
    toggleStopLock,
    setBlendMode,
    setSmoothness,
    applyPreset,
    randomize,
  } = useGradient();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 md:px-6 lg:py-16">
        <header className="flex flex-col gap-4 text-center py-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            CSS Gradient Generator
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Create beautiful gradients with pixel-perfect control. Drag stops,
            adjust colors, and export as CSS, Tailwind, PNG, or SVG.
          </p>
        </header>

        <section id="generator" className="grid gap-8 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-6">
            <ControlsPanel
              gradient={gradient}
              onTypeChange={setType}
              onAngleChange={setAngle}
              onOriginChange={setOrigin}
              onBlendModeChange={setBlendMode}
              onSmoothnessChange={setSmoothness}
              onReverse={reverseStops}
              onShuffle={shuffleStops}
              onRandom={randomize}
            />
            <PresetsGrid onSelectPreset={applyPreset} onRandom={randomize} />
            <ExportButtons gradient={gradient} />
          </div>
          <div className="space-y-6">
            <GradientPreview gradient={gradient} onOriginChange={setOrigin} />
            <ColorStopList
              stops={gradient.stops}
              onAddStop={() => addStop()}
              onUpdateStop={updateStop}
              onRemoveStop={removeStop}
              onToggleLock={toggleStopLock}
              onReorder={reorderStops}
            />
          </div>
        </section>

        <section id="faq" className="mx-auto">
          <FAQSection faqItems={faqItems} />
        </section>

        {/* SEO long‑form */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
          <SeoArticle />
        </section>
      </div>
    </main>
  );
}

function SeoArticle() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h2>What is a CSS Gradient Generator?</h2>
      <p>
        Gradients are one of the most powerful ways to add depth, mood, and
        visual hierarchy to modern interfaces. A{" "}
        <strong>CSS Gradient Generator</strong> helps designers and developers
        create smooth, consistent linear, radial, and conic gradients without
        manually adjusting color stops. This tool provides real-time preview,
        multi-stop editing, accessible color suggestions, and one-click export
        for production-ready CSS.
      </p>

      <h3>Why gradients matter in modern UI</h3>
      <p>
        Good gradients are subtle. They guide focus, create structure, and add
        brand personality. Instead of harsh transitions or random colors,
        effective gradients use{" "}
        <em>
          carefully spaced color stops, controlled angle direction, and balanced
          contrast
        </em>
        . This generator ensures every gradient is smooth, responsive, and
        visually clean across devices.
      </p>

      <h3>How to design the perfect gradient</h3>
      <ul>
        <li>
          <strong>Choose the right type:</strong> Use linear gradients for
          surfaces and buttons, radial gradients for soft glows, and conic
          gradients for charts or highlights.
        </li>
        <li>
          <strong>Color stop spacing:</strong> Avoid clustering stops. Even
          spacing creates smoother blending and reduces banding.
        </li>
        <li>
          <strong>Angle selection:</strong> Subtle angles (120–160°) often read
          best for UI backgrounds.
        </li>
        <li>
          <strong>Use brand tints:</strong> Gradients built from lighter and
          darker variations of the same hue look cleaner than random colors.
        </li>
        <li>
          <strong>Contrast check:</strong> Always ensure text remains readable
          over gradient surfaces.
        </li>
      </ul>

      <h3>Common gradient mistakes (and how this tool fixes them)</h3>
      <p>
        Many gradients look unprofessional because they are too saturated, use
        conflicting hues, or contain abrupt color jumps. This generator includes
        curated presets, smooth stop interpolation, and live contrast checking
        to help you build gradients that look polished and production-ready.
      </p>

      <h3>Types of gradients supported</h3>
      <ul>
        <li>
          <strong>Linear Gradients:</strong> Perfect for buttons, cards, and
          page sections.
        </li>
        <li>
          <strong>Radial Gradients:</strong> Great for glows, soft focuses, and
          elevated surfaces.
        </li>
        <li>
          <strong>Conic Gradients:</strong> Useful for charts, subtle accent
          rings, and spotlight effects.
        </li>
      </ul>

      <h3>Tailwind & CSS export</h3>
      <p>
        You can copy a production-ready <code>background-image</code> block or
        generate a Tailwind utility using the <code>bg-[...]</code> arbitrary
        value syntax that includes gradients with multiple color stops. For
        Tailwind projects that generate classes dynamically, remember to
        safelist these custom utilities.
      </p>

      <h3>Preset styles included</h3>
      <ul>
        <li>
          <strong>Soft UI pastel gradients</strong> ideal for dashboards and
          clean interfaces
        </li>
        <li>
          <strong>Modern neon/high-contrast gradients</strong> for landing pages
          and hero sections
        </li>
        <li>
          <strong>Minimal monochrome gradients</strong> for enterprise-style
          designs
        </li>
        <li>
          <strong>Glassmorphism compatible gradients</strong> with subtle
          transparency
        </li>
      </ul>

      <h3>Why this gradient generator ranks above others</h3>
      <p>
        Most gradient tools give only basic two-color sliders. This generator
        supports unlimited stops, intelligent previews, auto-generated balanced
        palettes, and export options for CSS, Tailwind, Figma tokens, and design
        systems. It’s built for real-world UI development and optimized for
        perfect results every time.
      </p>
    </article>
  );
}
