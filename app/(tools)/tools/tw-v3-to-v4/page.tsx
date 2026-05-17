import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { TwV3ToV4Editor } from "@/components/tools/tw-v3-to-v4/editor";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Tailwind v3 to v4 Migrator — Ruixen Tools",
  description:
    "Free in-browser tool that converts Tailwind CSS v3 to v4-compatible syntax. Updates shadcn theme tokens, @tailwind directives, linear gradients, CSS variable arbitrary values, and a11y outline utilities.",
};

const pageUrl = `${siteConfig.url}/tools/tw-v3-to-v4`;

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tailwind v3 to v4 Migrator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  description:
    "A free in-browser tool that converts Tailwind CSS v3 source code to v4-compatible syntax, including shadcn theme tokens, @tailwind directives, gradient utilities, CSS variable arbitrary values, and outline accessibility classes.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: pageUrl,
  publisher: {
    "@type": "Organization",
    name: "Ruixen UI",
    url: siteConfig.url,
  },
};

export default function TwV3ToV4Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            href="/tools"
            className="transition-colors hover:text-foreground"
          >
            Tools
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">Tailwind v3 → v4 Migrator</span>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Tailwind v3 to v4 Migrator
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Paste Tailwind CSS v3 source — globals, component CSS, or HTML — and
            get the v4-compatible version. Handles shadcn theme tokens,
            <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono text-xs">
              @tailwind
            </code>
            directives, linear gradients, CSS variable arbitrary values, and the
            <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono text-xs">
              outline-none
            </code>
            accessibility rename.
          </p>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border bg-background">
          <TwV3ToV4Editor />
        </div>
        <div className="mt-6 rounded-xl border bg-card/40 p-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">A few things to know</p>
          <ul className="mt-2 flex list-disc flex-col gap-1 pl-4">
            <li>
              The transform is conservative — only patterns whose meaning is
              unambiguous are auto-converted. Renames that silently change
              visual output (default shadow scale, ring width, border color) are
              NOT applied. Review the v4 release notes for those.
            </li>
            <li>
              For the shadcn theme tokens to work in v4 you still need to expose
              them via <code>@theme inline</code> in your CSS — the variable
              rename is only half the migration.
            </li>
            <li>
              This tool runs entirely in your browser. Your code is not sent to
              any server.
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
