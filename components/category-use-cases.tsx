import Link from "next/link";

import { USE_CASE_ENTRIES, type SectionType } from "@/lib/use-case-content";

const USE_CASE_LABELS: Record<string, string> = {
  saas: "For SaaS",
  agency: "For agencies",
  ecommerce: "For ecommerce",
  portfolio: "For portfolios",
};

interface CategoryUseCasesProps {
  type: SectionType;
}

export function CategoryUseCases({ type }: CategoryUseCasesProps) {
  const entries = USE_CASE_ENTRIES.filter((e) => e.type === type);
  if (entries.length < 2) return null;

  return (
    <section className="my-10 not-prose">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        Browse by use case
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Curated picks and use-case-specific guidance for the four most common
        landing-page contexts.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {entries.map((entry) => (
          <Link
            key={entry.useCase}
            href={`/sections/${entry.type}/for-${entry.useCase}`}
            className="group flex flex-col rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-foreground/20 hover:bg-card/60"
          >
            <div className="text-sm font-semibold text-foreground">
              {USE_CASE_LABELS[entry.useCase]}
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {entry.lead.split(/(?<=[.!?])\s+/)[0]}
            </p>
            <div className="mt-auto pt-3 text-xs font-medium text-foreground/80 transition-colors group-hover:text-foreground">
              See picks →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
