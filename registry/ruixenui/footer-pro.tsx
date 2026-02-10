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

interface FooterProProps {
  /** Custom brand mark — any ReactNode (SVG, icon, emoji). Falls back to a default geometric mark. */
  brandMark?: React.ReactNode;
  brandName?: string;
  description?: string;
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  bottomLinks?: FooterLink[];
  /** Status text shown with a breathing indicator dot. Pass `undefined` to hide. */
  statusText?: string;
  copyright?: string;
}

/* ── default brand mark ────────────────────────────────────────── */
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

/* ── defaults ──────────────────────────────────────────────────── */
const defaults = {
  brandName: "ruixen ui",
  description:
    "Modern, fast, and customizable React components — built with Tailwind CSS, TypeScript, and accessibility in mind.",
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
        { label: "Contact", href: "#" },
      ],
    },
  ] as FooterColumn[],
  socials: [] as FooterSocial[],
  bottomLinks: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ] as FooterLink[],
  statusText: "All systems operational",
  copyright: `\u00A9 ${new Date().getFullYear()} ruixen ui`,
};

/* ── component ─────────────────────────────────────────────────── */
export default function FooterPro(props?: FooterProProps) {
  const brandMark = props?.brandMark;
  const brandName = props?.brandName ?? defaults.brandName;
  const description = props?.description ?? defaults.description;
  const columns = props?.columns ?? defaults.columns;
  const socials = props?.socials ?? defaults.socials;
  const bottomLinks = props?.bottomLinks ?? defaults.bottomLinks;
  const statusText = props?.statusText ?? defaults.statusText;
  const copyright = props?.copyright ?? defaults.copyright;

  return (
    <footer className="border-t border-foreground/[0.06] bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        {/* ── content: brand + columns ──────────────────────────── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* brand */}
          <div className="shrink-0 lg:max-w-[280px]">
            <div className="flex items-center gap-2.5">
              {brandMark ?? <DefaultMark />}
              <span className="text-[15px] font-[590] tracking-[-0.015em] text-foreground">
                {brandName}
              </span>
            </div>
            <p className="mt-4 text-[13px] leading-[1.6] text-foreground/45">
              {description}
            </p>
          </div>

          {/* columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/30">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group/link inline-flex items-center text-[13px] text-foreground/50 transition-colors duration-150 hover:text-foreground"
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
        </div>

        {/* ── bottom ───────────────────────────────────────────── */}
        <div className="mt-14 border-t border-foreground/[0.06] pt-6">
          {/* status indicator */}
          {statusText && (
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] text-foreground/30">
                {statusText}
              </span>
            </div>
          )}

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-[12px] text-foreground/25">{copyright}</p>

            <div className="flex items-center gap-5">
              {bottomLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[12px] text-foreground/30 transition-colors duration-150 hover:text-foreground/60"
                >
                  {link.label}
                </Link>
              ))}

              {socials.length > 0 && bottomLinks.length > 0 && (
                <div className="h-3 w-px bg-foreground/[0.08]" />
              )}

              {socials.map(({ icon: Icon, href, label }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  aria-label={label}
                  className="text-foreground/30 transition-colors duration-150 hover:text-foreground/60"
                >
                  <Icon className="size-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
