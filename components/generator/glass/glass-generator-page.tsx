// components/glass/GlassGeneratorPage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PreviewPanel from "./preview-panel";
import CodeOutput from "./code-output";
import PresetGallery from "./preset-gallery";
import HistoryManager from "./history-manager";
import {
  defaultGlassState,
  GlassState,
  encodeStateToQuery,
  decodeStateFromQuery,
} from "@/lib/glass";
import { BUILT_IN_PRESETS } from "@/data/presets";
import ControlPanel from "./control-panel";
import FAQSection from "@/components/sections/faq-section";
import { FAQItem } from "@/registry/ruixenui/staggered-faq-section";
export default function GlassGeneratorPage() {
  const [state, setState] = useState<GlassState>(defaultGlassState);

  // Load from URL if present
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const raw = sp.get("s");
    if (raw) {
      const decoded = decodeStateFromQuery(raw);
      if (decoded) setState(decoded);
    }
  }, []);

  const update = (patch: Partial<GlassState>) => {
    setState((s) => ({ ...s, ...patch }));
  };

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const q = encodeStateToQuery(state);
    const url = new URL(window.location.href);
    url.searchParams.set("s", q);
    return url.toString();
  }, [state]);

  const faqItems: FAQItem[] = [
    {
      id: "glassmorphism",
      question: "What is glassmorphism?",
      answer:
        "Glassmorphism is a design style that layers translucent surfaces over colorful, blurred backgrounds.",
    },
    {
      id: "backdrop-filter",
      question: "How does CSS backdrop-filter work?",
      answer:
        "backdrop-filter applies effects to whatever is visually behind an element. Include the -webkit- prefix for WebKit.",
    },
    {
      id: "tailwind",
      question: "Is Tailwind good for glassmorphism?",
      answer:
        "Yes. Tailwind’s arbitrary values make custom blurs, RGBA backgrounds, and one-off shadows easy.",
    },
    {
      id: "browser-support",
      question: "Does glass UI work in all browsers?",
      answer:
        "Modern browsers support it; without support, the card still renders but without backdrop blur.",
    },
    {
      id: "dashboard-usage",
      question: "When should you use glass UI in dashboards?",
      answer:
        "Use it sparingly for key widgets. Prioritize contrast and legibility.",
    },
  ];

  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Glassmorphism Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build production‑ready CSS & Tailwind glass UI instantly. Real‑time
            preview, hover effects, and one‑click export.
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

      {/* Generator Split */}
      <section id="generator" className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4">
            <ControlPanel value={state} onChange={update} />
            <HistoryManager value={state} onChange={setState} />
          </div>

          <div className="space-y-4">
            <PreviewPanel value={state} onChange={update} />
            <CodeOutput value={state} shareUrl={shareUrl} />
          </div>
        </div>
      </section>

      {/* Presets */}
      <section id="presets">
        <PresetGallery
          builtins={BUILT_IN_PRESETS}
          onApply={(preset) => setState(preset)}
          current={state}
        />
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto">
        <FAQSection faqItems={faqItems} />
      </section>

      <Separator className="my-12" />

      {/* SEO Long-form */}
      <section id="seo_footer" className="mx-auto pb-20">
        <SeoFooterArticle />
      </section>
    </main>
  );
}

function SeoFooterArticle() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold">
      <h2 className="text-center">Build Beautiful, Legible Glass UI</h2>
      <p>
        Glassmorphism pairs translucent panels with blurred, colorful
        backgrounds to create depth without heavy gradients or 3D. The style
        works best in cards, popups, and overlays where you can keep copy short,
        contrast high, and motion subtle. Our generator outputs production‑ready
        CSS and Tailwind so you can move from idea to implementation in seconds.
      </p>
      <h3>Principles</h3>
      <ul>
        <li>
          <strong>Contrast first:</strong> Always check text against the blurred
          background; add an overlay or increase opacity when needed.
        </li>
        <li>
          <strong>Focus areas:</strong> Reserve glass for primary surfaces that
          benefit from depth.
        </li>
        <li>
          <strong>Performance minded:</strong> backdrop filters are
          GPU‑accelerated but can be heavy if overused.
        </li>
      </ul>
      <h3>Backdrops & Overlays</h3>
      <p>
        Most glass cards combine a translucent fill, a subtle border, and a soft
        shadow. The border helps edges read crisply; the shadow lifts the card
        away from the canvas. A gradient overlay can add polish and “specular”
        highlights that feel tactile without distracting animation.
      </p>
      <h3>Accessibility</h3>
      <p>
        Avoid placing dense content behind glass. If blur is low, keep the
        background quiet (grid or soft gradient). Provide dark and light modes
        and ensure interactive targets remain large and consistent. Keyboard
        users should be able to tab through sliders and toggles; this tool
        relies on shadcn/ui’s accessible primitives for that reason.
      </p>
      <h3>Use Cases</h3>
      <p>
        Dashboards, media overlays, and onboarding surfaces are ideal. For
        long‑form layouts or data‑heavy tables, consider a solid background with
        subtle elevation instead.
      </p>
      <h3>Production Tips</h3>
      <ul>
        <li>
          Prefer server or build‑time images for hero backgrounds; lazy‑load
          decorative assets.
        </li>
        <li>
          Use Tailwind’s arbitrary values for one‑off blurs and shadows;
          safelist if you generate classes dynamically.
        </li>
        <li>
          Keep transitions short; hover states should feel crisp, not floaty.
        </li>
      </ul>
      <p>
        With this generator you can iterate fast, preview hover behavior, export
        clean code, and share exact settings via URL—ideal for teams and design
        reviews.
      </p>
    </article>
  );
}
