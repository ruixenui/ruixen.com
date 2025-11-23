"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ControlPanel from "./control-panel";
import PreviewPanel from "./preview-panel";
import CodeOutput from "./code-output";
import PresetGallery from "./preset-gallery";
import {
  defaultShadowState,
  ShadowState,
  buildLayersFromBase,
} from "@/lib/shadow";
import { FAQItem } from "@/registry/ruixenui/staggered-faq-section";
import FAQSection from "@/components/sections/faq-section";

const faqItems: FAQItem[] = [
  {
    id: "what-is-shadow",
    question: "What is a multi-layer UI shadow?",
    answer:
      "A multi-layer UI shadow uses several stacked box-shadow layers with different blur, spread, and opacity values to create realistic depth. Ruixen UI’s Shadow Generator builds these layers automatically.",
  },
  {
    id: "how-it-works",
    question: "How does the Shadow Generator work?",
    answer:
      "It blends multiple soft shadows—ambient, penumbra, and umbra—based on your offset, blur, and opacity inputs. The generator previews changes in real time and outputs clean CSS or Tailwind-compatible shadow classes.",
  },
  {
    id: "tailwind",
    question: "Can I use these shadows with Tailwind CSS?",
    answer:
      "Yes. Ruixen UI exports fully formatted `shadow-[...]` arbitrary values. For dynamic or user-generated shadows, safelist them in your Tailwind config.",
  },
  {
    id: "common-mistakes",
    question: "Why do many shadows look harsh or unprofessional?",
    answer:
      "Most shadows look bad because they use one dark layer, too much opacity, or incorrect offsets. Ruixen UI avoids these issues by generating balanced, multi-layer, low-opacity shadows that mimic natural lighting.",
  },
  {
    id: "best-use-cases",
    question: "Where should I use strong versus subtle shadows?",
    answer:
      "Use subtle, wide-blur shadows for surfaces and layout sections, and stronger, more defined shadows for floating cards, modals, and interactive components.",
  },
  {
    id: "performance",
    question: "Do multi-layer shadows affect performance?",
    answer:
      "No. Modern browsers render box-shadows efficiently. Ruixen UI keeps layers optimized so your UI stays smooth even with complex shadows.",
  },
  {
    id: "design-guidelines",
    question: "How many shadow layers should I use?",
    answer:
      "Two to three layers typically give the most natural results. Increase blur as the shadow moves outward, and reduce opacity for each additional layer—Ruixen UI applies this automatically.",
  },
  {
    id: "accessibility",
    question: "How do shadows affect accessibility?",
    answer:
      "Shadows guide attention and improve focus indicators. Ensure sufficient contrast between components and backgrounds. Avoid overly dark shadows in dark mode.",
  },
];

export default function ShadowGeneratorPage() {
  const [state, setState] = useState<ShadowState>(() => {
    const s = { ...defaultShadowState };
    s.layers = buildLayersFromBase(s.base);
    return s;
  });

  // when base changes and manual edits are not locked, rebuild layers
  useEffect(() => {
    if (!state.manual) {
      setState((s) => ({ ...s, layers: buildLayersFromBase(s.base) }));
    }
  }, [
    state.base.layers,
    state.base.x,
    state.base.y,
    state.base.blur,
    state.base.spread,
    state.base.opacity,
    state.base.color,
    state.base.inset,
    state.manual,
  ]);

  const update = (patch: Partial<ShadowState>) =>
    setState((s) => ({ ...s, ...patch }));

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Shadow Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Create modern shadows for cards, modals, and buttons. Build smooth,
            layered, hard, inset, and neumorphism shadows.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#generator">
              <Button size="lg">Start Creating</Button>
            </a>
            <a href="#presets">
              <Button variant="outline" size="lg">
                View Presets
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Generator */}
      <section id="generator" className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4">
            <ControlPanel state={state} setState={setState} />
          </div>
          <div className="space-y-4">
            <PreviewPanel state={state} setState={setState} />
            <CodeOutput state={state} />
          </div>
        </div>
      </section>

      {/* Presets */}
      <section id="presets" className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <PresetGallery state={state} setState={setState} />
      </section>

      <section id="faq" className="mx-auto">
        <FAQSection faqItems={faqItems} />
      </section>

      {/* SEO long‑form */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
        <SeoArticle />
      </section>
    </main>
  );
}
function SeoArticle() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h2>What is a Shadow Generator?</h2>
      <p>
        Shadows are essential for creating depth, hierarchy, and focus in modern
        interfaces. A professional shadow is never a single dark blur—it is a
        carefully crafted blend of <em>multiple layers</em> with different
        blurs, opacities, and offsets. The Ruixen UI Shadow Generator automates
        this process, giving you realistic, multi-layer shadows with a live
        preview and one-click export for CSS and Tailwind.
      </p>

      <h3>How to Tune Shadows for Perfect UI Depth</h3>
      <ul>
        <li>
          <strong>Blur vs. Spread:</strong> Blur determines softness while
          spread controls how far the shadow extends. For buttons or chips, keep
          spread near 0 for crisp edges.
        </li>
        <li>
          <strong>Opacity:</strong> Overly dark shadows look artificial. The
          ideal UI shadow uses low opacity—typically between 0.06 and 0.24 per
          layer for natural depth.
        </li>
        <li>
          <strong>Offset:</strong> Positive Y offsets simulate light coming from
          above. Use negative offsets sparingly unless intentionally creating a
          lifted glow or special highlight effect.
        </li>
        <li>
          <strong>Layer Count:</strong> Two or three layers create the most
          realistic results. Increase blur with distance and decrease opacity
          per layer for a natural fade.
        </li>
      </ul>

      <h3>Why Most Shadows Look Bad</h3>
      <p>
        Many shadows appear harsh because they rely on a single dark layer,
        overly sharp edges, or mismatched opacity. Professional shadows use
        subtle layering and controlled softness. With Ruixen UI, preset systems
        like Material, Soft UI, Floating, and Minimal give you expertly tuned
        shadows that you can refine further.
      </p>

      <h3>Neumorphism & Inset Shadows</h3>
      <p>
        Neumorphism uses soft highlights and low-contrast inset shadows to
        create raised or pressed surfaces. While visually appealing, it should
        be used sparingly and with strict contrast checks, especially when
        placing text on neumorphic surfaces. Ruixen UI supports both outer and
        inset shadow configurations.
      </p>

      <h3>Exporting CSS & Tailwind Shadow Classes</h3>
      <p>
        Ruixen UI allows you to copy a production-ready CSS{" "}
        <code>box-shadow</code>
        block or generate a Tailwind class using an arbitrary{" "}
        <code>shadow-[...]</code> value. Multiple comma-separated layers are
        included automatically. If you generate dynamic classes in a Tailwind
        environment, make sure to safelist them in your configuration.
      </p>

      <h3>Why Ruixen UI Shadows Feel More Professional</h3>
      <p>
        Every shadow generated is built with design-system consistency,
        realistic light physics, and subtle blending. This ensures the shadows
        integrate perfectly into dashboards, modals, cards, and landing-page UI
        elements—without looking heavy or outdated.
      </p>
    </article>
  );
}
