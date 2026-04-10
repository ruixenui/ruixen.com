"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, Sparkles } from "lucide-react";

import { trackEvent } from "@/lib/events";

interface PricingSnapshot {
  amountCents: number;
  display: string;
  currency: string;
}

const FALLBACK: PricingSnapshot = {
  amountCents: 5900,
  display: "$59",
  currency: "USD",
};

const FEATURES = [
  "All 50+ premium components",
  "Production templates (Intellune, Nguyen)",
  "Lifetime updates — no subscription",
  "Commercial license included",
  "Source code via shadcn CLI",
  "Priority support on Discord",
  "Early access to new releases",
  "Unlimited projects",
];

const FREE_VS_PRO = [
  {
    label: "Components",
    free: "170+ open-source",
    pro: "170+ free + 50+ premium",
  },
  { label: "Templates", free: "1 portfolio", pro: "2 production templates" },
  { label: "Motion & theming", free: "Basic", pro: "Advanced presets" },
  { label: "Updates", free: "Community", pro: "Lifetime, priority" },
  { label: "Commercial license", free: "MIT", pro: "Included" },
  { label: "Support", free: "GitHub", pro: "Discord priority" },
];

export function PricingLanding() {
  const [price, setPrice] = useState<PricingSnapshot>(FALLBACK);

  useEffect(() => {
    trackEvent({ name: "oss_pricing_page_viewed" });
    let cancelled = false;
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((data: PricingSnapshot) => {
        if (!cancelled && data?.display) setPrice(data);
      })
      .catch(() => {
        // Keep the fallback
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCtaClick = (surface: string) =>
    trackEvent({
      name: "oss_pro_cta_clicked",
      properties: { surface },
    });

  const checkoutHref = `https://pro.ruixen.com/pricing?ref=oss_pricing_page`;

  return (
    <main className="relative">
      {/* Hero */}
      <section className="container mx-auto max-w-3xl px-4 pt-16 text-center md:pt-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/60 bg-blue-50/40 dark:bg-blue-950/20 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
          <Sparkles className="size-3" />
          <span>Lifetime access, one payment</span>
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Ruixen Pro — one payment, lifetime access
        </h1>
        <p className="mt-4 text-balance text-lg text-muted-foreground">
          50+ premium React components, 2 production templates, unlimited
          updates. Pay once, ship forever.
        </p>
      </section>

      {/* Price card */}
      <section className="container mx-auto max-w-md px-4 py-12 md:py-16">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight">
              {price.display}
            </span>
            <span className="text-muted-foreground">{price.currency}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            One-time payment, lifetime access
          </p>

          <ul className="mt-6 space-y-3">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                  <Check className="h-2.5 w-2.5 text-emerald-500" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href={checkoutHref}
            target="_blank"
            onClick={() => handleCtaClick("pricing_page")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:opacity-90"
          >
            Get Lifetime — {price.display}
            <ChevronRight className="size-4" />
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            14-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Free vs Pro */}
      <section className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <h2 className="text-center text-2xl font-semibold md:text-3xl">
          Free vs Pro
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          The 170+ free components stay free forever. Pro adds the premium tier
          on top.
        </p>
        <div className="mt-10 overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="p-4 font-medium">&nbsp;</th>
                <th className="p-4 font-medium">Free (OSS)</th>
                <th className="p-4 font-medium">Pro</th>
              </tr>
            </thead>
            <tbody>
              {FREE_VS_PRO.map((row) => (
                <tr key={row.label} className="border-t">
                  <td className="p-4 font-medium">{row.label}</td>
                  <td className="p-4 text-muted-foreground">{row.free}</td>
                  <td className="p-4">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto max-w-2xl px-4 pb-24 text-center">
        <Link
          href={checkoutHref}
          target="_blank"
          onClick={() => handleCtaClick("pricing_page_bottom")}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90"
        >
          Get Lifetime — {price.display}
          <ChevronRight className="size-4" />
        </Link>
        <p className="mt-4 text-xs text-muted-foreground">
          Questions? Email{" "}
          <a className="underline" href="mailto:support@ruixen.com">
            support@ruixen.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
