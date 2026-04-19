import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Boxes,
  Droplet,
  Layers,
  Palette,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tools — Ruixen UI",
  description:
    "Creative tools built on top of Ruixen UI. Generate, design, and export assets for your product.",
};

type Tool = {
  href: string;
  title: string;
  tagline: string;
  description: string;
  badge?: "New" | "Beta";
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
};

const TOOLS: Tool[] = [
  {
    href: "/tools/extrude",
    title: "Extrude",
    tagline: "Extrude any SVG into a real-time 3D object",
    description:
      "Turn text, drawings, or SVG code into an interactive 3D scene. Apply PBR materials, lighting, textures, and export as PNG, GLB, STL, or embed code.",
    badge: "New",
    icon: Boxes,
    gradient: "from-indigo-500/20 via-violet-500/10 to-fuchsia-500/20",
  },
  {
    href: "/generator/css-generator",
    title: "Gradient Generator",
    tagline: "Design CSS gradients with a live preview",
    description:
      "Craft linear, radial, and conic gradients with stop-level control. Preview in real time and copy production-ready CSS for your components.",
    icon: Palette,
    gradient: "from-amber-400/25 via-rose-500/15 to-sky-500/25",
  },
  {
    href: "/generator/glass-morphism",
    title: "Glassmorphism",
    tagline: "Frosted-glass UI with blur, border, and tint",
    description:
      "Build glassmorphism panels by tuning blur, transparency, borders, shadows, and gradients. Export clean CSS or Tailwind-ready classes.",
    icon: Droplet,
    gradient: "from-sky-400/25 via-cyan-400/15 to-blue-500/25",
  },
  {
    href: "/generator/shadow-generator",
    title: "Shadow Generator",
    tagline: "Layered, soft, and neumorphism shadows",
    description:
      "Compose multi-layer box-shadows for cards, buttons, and modals. Switch between soft, hard, inset, and elevation styles — copy as CSS or Tailwind.",
    icon: Layers,
    gradient: "from-slate-500/25 via-zinc-500/15 to-stone-500/25",
  },
];

export default function ToolsLandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="container pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              Ruixen Tools
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Creative tools, built for product teams.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              A growing collection of focused, no-signup tools for designers
              and engineers. Generate assets, prototype ideas, and ship faster
              — all in the browser.
            </p>
          </div>
        </section>

        {/* Tools grid */}
        <section className="container pb-24 md:pb-32">
          <div className="mb-6 flex items-baseline gap-2">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              All tools
            </h2>
            <span className="text-xs text-muted-foreground/60">
              ({TOOLS.length})
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 transition-all hover:border-foreground/20 hover:bg-card/60",
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity group-hover:opacity-70",
                    tool.gradient,
                  )}
                />
                <div className="relative flex min-h-[240px] flex-col">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/80 backdrop-blur-sm">
                      <tool.icon className="h-5 w-5 text-foreground" />
                    </div>
                    {tool.badge && (
                      <span className="rounded-full bg-[var(--color-sidebar-label)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-sidebar-label-foreground)]">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-8 flex-1 space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-foreground/70">{tool.tagline}</p>
                    <p className="pt-1 text-sm leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                    Open tool
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}

            <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/20 p-6 text-center sm:col-span-2 lg:col-span-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-base font-medium text-foreground">
                More coming soon
              </h3>
              <p className="mt-2 max-w-[320px] text-xs leading-relaxed text-muted-foreground">
                Got an idea? Open an issue on our GitHub — we build what the
                community asks for.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
