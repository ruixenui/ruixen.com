"use client";

import * as React from "react";
import Link from "next/link";

/* ── types ─────────────────────────────────────────────────────── */
interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterSocial {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label?: string;
}

interface CorporateFooterProps {
  /** Custom brand mark — any ReactNode (SVG, icon, emoji). Falls back to a default geometric mark. */
  brandMark?: React.ReactNode;
  brandName?: string;
  tagline?: string;
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  copyright?: string;
}

/* ── decorative watermark ─────────────────────────────────────── */
function Watermark() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full translate-y-2/3 text-muted-foreground/[0.035]"
      viewBox="0 0 180 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="100" height="100" rx="28" fill="currentColor" />
      <rect
        x="80"
        y="80"
        width="100"
        height="140"
        rx="28"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── default mark ─────────────────────────────────────────────── */
function DefaultMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="size-[18px]"
      aria-hidden="true"
    >
      <rect width="18" height="18" rx="5" className="fill-foreground" />
    </svg>
  );
}

/* ── defaults ─────────────────────────────────────────────────── */
const defaults = {
  brandName: "ruixen ui",
  tagline: "Modern components for modern interfaces.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Components", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Pro", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Examples", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
  ] as FooterColumn[],
  socials: [] as FooterSocial[],
  copyright: `\u00A9 ${new Date().getFullYear()} ruixen ui`,
};

/* ── component ────────────────────────────────────────────────── */
export function CorporateFooter(props?: CorporateFooterProps) {
  const brandMark = props?.brandMark;
  const brandName = props?.brandName ?? defaults.brandName;
  const tagline = props?.tagline ?? defaults.tagline;
  const columns = props?.columns ?? defaults.columns;
  const socials = props?.socials ?? defaults.socials;
  const copyright = props?.copyright ?? defaults.copyright;

  return (
    <footer className="bg-background px-6 py-14 lg:py-20">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-card p-10 shadow-lg shadow-black/[0.04] ring-1 ring-border/50 dark:shadow-black/20 md:px-16 md:py-14">
        {/* decorative watermark */}
        <Watermark />

        {/* content — sits above watermark */}
        <div className="relative">
          {/* ── brand ──────────────────────────────────────────── */}
          <div className="flex items-center gap-2.5">
            {brandMark ?? <DefaultMark />}
            <span className="text-[16px] font-[590] tracking-[-0.02em] text-card-foreground">
              {brandName}
            </span>
          </div>
          <p className="mt-3 max-w-sm text-[13px] leading-[1.6] text-card-foreground/45">
            {tagline}
          </p>

          {/* ── separator ─────────────────────────────────────── */}
          <div className="my-8 h-px bg-border/50" />

          {/* ── columns ───────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-card-foreground/30">
                  {col.title}
                </p>
                <ul className="mt-3.5 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group/link inline-flex items-center text-[13px] text-card-foreground/50 transition-colors duration-150 hover:text-card-foreground"
                      >
                        <span className="transition-transform duration-150 group-hover/link:translate-x-0.5">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── separator ─────────────────────────────────────── */}
          <div className="mt-10 h-px bg-border/50" />

          {/* ── bottom bar ────────────────────────────────────── */}
          <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-[12px] text-card-foreground/25">{copyright}</p>

            {socials.length > 0 && (
              <div className="flex items-center gap-4">
                {socials.map(({ icon: Icon, href, label }, idx) => (
                  <Link
                    key={idx}
                    href={href}
                    aria-label={label}
                    className="text-card-foreground/25 transition-colors duration-150 hover:text-card-foreground/50"
                  >
                    <Icon className="size-3.5" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
