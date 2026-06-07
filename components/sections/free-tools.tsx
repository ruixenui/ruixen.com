import Link from "next/link";

/**
 * FreeTools — homepage section linking to the free generator tools.
 *
 * The homepage is the site's highest-authority page, yet it previously
 * linked to none of the tools. Tools are Ruixen's only proven organic
 * channel (≈60% of all search impressions), but they sit on page 2.
 * These contextual, keyword-anchored links pass homepage equity straight
 * to the tool pages to help push them onto page 1 — and give crawlers a
 * first-class path to them.
 */
const TOOLS: { title: string; href: string; description: string }[] = [
  {
    title: "Glassmorphism Generator",
    href: "/generator/glass-morphism",
    description:
      "Frosted-glass UI — tune blur, transparency, borders and gradients, then copy CSS or Tailwind.",
  },
  {
    title: "CSS Gradient Generator",
    href: "/generator/css-generator",
    description:
      "Linear, radial and conic gradients with stop-level control and one-click CSS & Tailwind export.",
  },
  {
    title: "Tailwind Shadow Generator",
    href: "/generator/shadow-generator",
    description:
      "Layered box-shadows, elevation and neumorphism — copy as CSS or Tailwind in a click.",
  },
  {
    title: "UI Gradients",
    href: "/gradients",
    description:
      "Free 4K gradient backgrounds for heroes and cards — copy the CSS or download the PNG.",
  },
];

export function FreeTools() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.15em] text-foreground/30 mb-4">
            Free tools — no signup
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Free CSS &amp; Tailwind generators
          </h2>
          <p className="mt-4 text-foreground/50 text-base leading-relaxed">
            Design glassmorphism, gradients and shadows in the browser and copy
            production-ready CSS or Tailwind — no account, no install.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-border p-5 transition-colors hover:bg-accent"
            >
              <div className="font-semibold text-foreground">{tool.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
