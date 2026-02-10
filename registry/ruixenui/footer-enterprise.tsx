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

interface FooterEnterpriseProps {
  /** Custom brand mark — any ReactNode (SVG, icon, emoji). Falls back to a default geometric mark. */
  brandMark?: React.ReactNode;
  brandName?: string;
  description?: string;
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  bottomLinks?: FooterLink[];
  copyright?: string;
}

/* ── default mark ─────────────────────────────────────────────── */
function DefaultMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="size-5"
      aria-hidden="true"
    >
      <rect width="20" height="20" rx="5" className="fill-foreground" />
      <rect
        x="5"
        y="5"
        width="10"
        height="10"
        rx="2.5"
        className="fill-background"
      />
    </svg>
  );
}

/* ── defaults ─────────────────────────────────────────────────── */
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
        { label: "Pricing", href: "#" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Startups", href: "#" },
        { label: "Enterprise", href: "#" },
        { label: "Developers", href: "#" },
        { label: "Designers", href: "#" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "CLI", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Guides", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Community", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ] as FooterColumn[],
  socials: [] as FooterSocial[],
  bottomLinks: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ] as FooterLink[],
  copyright: `\u00A9 ${new Date().getFullYear()} ruixen ui. All rights reserved.`,
};

/* ── component ────────────────────────────────────────────────── */
export function FooterEnterprise(props?: FooterEnterpriseProps) {
  const brandMark = props?.brandMark;
  const brandName = props?.brandName ?? defaults.brandName;
  const description = props?.description ?? defaults.description;
  const columns = props?.columns ?? defaults.columns;
  const socials = props?.socials ?? defaults.socials;
  const bottomLinks = props?.bottomLinks ?? defaults.bottomLinks;
  const copyright = props?.copyright ?? defaults.copyright;

  return (
    <footer className="border-t border-foreground/[0.06] bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        {/* ── top tier: brand + socials ──────────────────────── */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              {brandMark ?? <DefaultMark />}
              <span className="text-[16px] font-[590] tracking-[-0.02em] text-foreground">
                {brandName}
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.6] text-foreground/40">
              {description}
            </p>
          </div>

          {socials.length > 0 && (
            <div className="flex items-center gap-3.5">
              {socials.map(({ icon: Icon, href, label }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  aria-label={label}
                  className="text-foreground/25 transition-colors duration-150 hover:text-foreground/60"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── separator ───────────────────────────────────────── */}
        <div className="my-10 h-px bg-foreground/[0.06]" />

        {/* ── middle tier: columns ────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/30">
                {col.title}
              </p>
              <ul className="mt-3.5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-foreground/45 transition-colors duration-150 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── separator ───────────────────────────────────────── */}
        <div className="mt-14 h-px bg-foreground/[0.06]" />

        {/* ── bottom tier: copyright + legal ──────────────────── */}
        <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[11px] text-foreground/20">{copyright}</p>

          {bottomLinks.length > 0 && (
            <div className="flex items-center gap-5">
              {bottomLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] text-foreground/25 transition-colors duration-150 hover:text-foreground/50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
