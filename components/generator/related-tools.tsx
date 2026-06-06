import Link from "next/link";

type ToolKey =
  | "glass-morphism"
  | "css-generator"
  | "shadow-generator"
  | "gradients";

const TOOLS: {
  key: ToolKey;
  title: string;
  href: string;
  description: string;
}[] = [
  {
    key: "glass-morphism",
    title: "Glassmorphism Generator",
    href: "/generator/glass-morphism",
    description:
      "Frosted-glass UI with blur, transparency, borders and gradients.",
  },
  {
    key: "css-generator",
    title: "CSS Gradient Generator",
    href: "/generator/css-generator",
    description:
      "Linear, radial and conic gradients with live export to CSS & Tailwind.",
  },
  {
    key: "shadow-generator",
    title: "Shadow Generator",
    href: "/generator/shadow-generator",
    description:
      "Layered box-shadows, elevation and neumorphism — copy CSS & Tailwind.",
  },
  {
    key: "gradients",
    title: "Gradient Gallery",
    href: "/gradients",
    description: "Free 4K gradient backgrounds to copy as CSS or download.",
  },
];

/**
 * RelatedTools — contextual in-content cross-links between the free generators.
 * Universal component (no "use client"): renders in both server and client
 * page trees so the links are present in the server-rendered HTML for SEO.
 */
export function RelatedTools({ current }: { current: ToolKey }) {
  const others = TOOLS.filter((tool) => tool.key !== current);

  return (
    <section
      aria-labelledby="related-tools-heading"
      className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6 md:py-16"
    >
      <h2
        id="related-tools-heading"
        className="text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Related tools
      </h2>
      <p className="mt-2 text-muted-foreground">
        More free CSS &amp; Tailwind generators from Ruixen UI.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {others.map((tool) => (
          <Link
            key={tool.key}
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
    </section>
  );
}
