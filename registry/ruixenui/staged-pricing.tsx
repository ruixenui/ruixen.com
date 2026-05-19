"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

type BillingCycle = "monthly" | "annual";

export interface StagedPricingPlan {
  name: string;
  audience: string;
  features: string[];
  /** Monthly price. Number renders with `$` prefix, string renders verbatim (e.g. "Custom"). */
  monthly: number | string;
  /** Annual price (per user / month). Falls back to `monthly` if omitted. */
  annual?: number | string;
  /** Renders a "Save N%" badge next to the price when annual is active. */
  annualSavingsPct?: number;
  cta: { label: string; href?: string };
  /** Highlights this card with a primary ring + primary CTA. */
  highlighted?: boolean;
  /** Override the caption under the price line. */
  priceCaption?: string;
}

export interface StagedPricingProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  plans: StagedPricingPlan[];
  defaultCycle?: BillingCycle;
  hideToggle?: boolean;
  cycleLabels?: { monthly: string; annual: string };
  className?: string;
}

/* ── helpers ─────────────────────────────────────────────────── */

const gridColsByCount: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/* ── toggle ──────────────────────────────────────────────────── */

function CycleToggle({
  cycle,
  onChange,
  labels,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
  labels: { monthly: string; annual: string };
}) {
  return (
    <div className="rounded-xl bg-muted p-0.5">
      <div className="relative grid grid-cols-2 gap-x-0.5">
        <div
          aria-hidden
          className={cn(
            "absolute left-0 top-0 h-full w-[calc((100%-2px)/2)] rounded-[10px] bg-background shadow-sm ring-1 ring-border/50 transition-transform duration-500 ease-out",
            cycle === "annual" && "translate-x-[calc(100%+2px)]",
          )}
        />
        {(["monthly", "annual"] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            aria-pressed={cycle === c}
            className={cn(
              "isolate cursor-pointer rounded-[10px] px-5 py-2 text-sm transition-colors duration-500",
              cycle === c ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {labels[c]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── animated price ──────────────────────────────────────────── */

function AnimatedPrice({
  plan,
  cycle,
}: {
  plan: StagedPricingPlan;
  cycle: BillingCycle;
}) {
  const annual = plan.annual ?? plan.monthly;
  const monthly = plan.monthly;
  const annualIsNumber = typeof annual === "number";
  const monthlyIsNumber = typeof monthly === "number";
  const showDollar = annualIsNumber || monthlyIsNumber;

  // Identical static value (e.g. "Custom"): no animation.
  if (!annualIsNumber && !monthlyIsNumber && annual === monthly) {
    return (
      <span className="text-5xl font-semibold tracking-tight text-foreground">
        {monthly}
      </span>
    );
  }

  return (
    <span className="inline-flex items-start text-5xl font-semibold tracking-tight text-foreground">
      {showDollar && <span>$</span>}
      <span className="inline-grid overflow-y-hidden">
        <span
          aria-hidden={cycle !== "annual"}
          className={cn(
            "col-start-1 row-start-1 transition duration-500 ease-out",
            cycle === "annual"
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0",
          )}
        >
          {annual}
        </span>
        <span
          aria-hidden={cycle !== "monthly"}
          className={cn(
            "col-start-1 row-start-1 transition duration-500 ease-out",
            cycle === "monthly"
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0",
          )}
        >
          {monthly}
        </span>
      </span>
    </span>
  );
}

/* ── decorative frame ────────────────────────────────────────── */

function Crosshair({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute hidden lg:block", className)}
    >
      <div className="relative h-[7px] w-[7px]">
        <div className="absolute left-0 top-[3px] h-px w-full rounded-full bg-foreground/40" />
        <div className="absolute left-[3px] top-0 h-full w-px rounded-full bg-foreground/40" />
      </div>
    </div>
  );
}

function GridFrameLines({ columns }: { columns: number }) {
  return (
    <>
      {/* horizontal lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-3 left-0 col-span-full hidden h-px w-full -translate-y-1/2 bg-[linear-gradient(to_right,_transparent_0%,_var(--color-border)_6.5%,_var(--color-border)_93.5%,_transparent_100%)] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 left-0 col-span-full hidden h-px w-full translate-y-1/2 bg-[linear-gradient(to_right,_transparent_0%,_var(--color-border)_6.5%,_var(--color-border)_93.5%,_transparent_100%)] lg:block"
      />

      {/* vertical column-boundary lines (N+1 of them) */}
      {Array.from({ length: columns + 1 }, (_, i) => {
        const isLast = i === columns;
        return (
          <div
            key={`v-${i}`}
            aria-hidden
            className={cn(
              "pointer-events-none absolute -top-12 -bottom-12 hidden w-px bg-[linear-gradient(to_bottom,_transparent_0%,_var(--color-border)_11%,_var(--color-border)_89%,_transparent_100%)] lg:block",
              isLast ? "-right-3 translate-x-1/2" : "-left-3 -translate-x-1/2",
            )}
            style={{ gridColumnStart: i + 1 }}
          />
        );
      })}

      {/* corner crosshairs */}
      <Crosshair className="-left-3 -top-3 -translate-x-1/2 -translate-y-1/2" />
      <Crosshair className="-right-3 -top-3 translate-x-1/2 -translate-y-1/2" />
      <Crosshair className="-right-3 -bottom-3 translate-x-1/2 translate-y-1/2" />
      <Crosshair className="-left-3 -bottom-3 -translate-x-1/2 translate-y-1/2" />
    </>
  );
}

/* ── card ────────────────────────────────────────────────────── */

function PricingCard({
  plan,
  cycle,
}: {
  plan: StagedPricingPlan;
  cycle: BillingCycle;
}) {
  const showSavings =
    cycle === "annual" &&
    typeof plan.annualSavingsPct === "number" &&
    plan.annualSavingsPct > 0;

  const ctaButton = (
    <Button
      asChild={Boolean(plan.cta.href)}
      variant={plan.highlighted ? "default" : "outline"}
      className="h-11 w-full rounded-xl text-base lg:h-9 lg:rounded-[10px] lg:text-sm"
    >
      {plan.cta.href ? (
        <Link href={plan.cta.href}>{plan.cta.label}</Link>
      ) : (
        <span>{plan.cta.label}</span>
      )}
    </Button>
  );

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-3xl border bg-card px-[23px] pb-[23px] pt-[21px] shadow-sm",
        plan.highlighted
          ? "border-primary/40 ring-4 ring-primary/10"
          : "border-border",
      )}
    >
      <div className="flex flex-col">
        <header className="text-xl text-muted-foreground">{plan.name}</header>

        <div className="mt-4 lg:mt-8">
          <div className="flex items-start gap-2">
            <AnimatedPrice plan={plan} cycle={cycle} />
            {showSavings && (
              <span
                className={cn(
                  "mt-[6px] inline-flex items-center rounded-lg border border-primary/20 bg-primary/10 px-[7px] py-[3px] text-xs font-medium text-primary transition-opacity duration-300",
                  cycle === "annual" ? "opacity-100" : "opacity-0",
                )}
              >
                Save {plan.annualSavingsPct}%
              </span>
            )}
          </div>
          {plan.priceCaption !== undefined ? (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {plan.priceCaption}
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-muted-foreground">
              Per user/month, billed{" "}
              <span className="inline-grid">
                <span
                  aria-hidden={cycle !== "monthly"}
                  className={cn(
                    "col-start-1 row-start-1 transition-opacity duration-150",
                    cycle === "monthly" ? "opacity-100" : "opacity-0",
                  )}
                >
                  monthly
                </span>
                <span
                  aria-hidden={cycle !== "annual"}
                  className={cn(
                    "col-start-1 row-start-1 transition-opacity duration-150",
                    cycle === "annual" ? "opacity-100" : "opacity-0",
                  )}
                >
                  annually
                </span>
              </span>
            </p>
          )}
        </div>

        <div className="mt-5 text-pretty text-sm font-semibold text-foreground lg:mt-8">
          {plan.audience}
        </div>

        <ul className="mt-2.5 flex flex-col gap-y-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-pretty text-sm text-muted-foreground">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-col items-stretch lg:mt-8">
        {ctaButton}
      </div>
    </div>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function StagedPricing({
  title = "From zero to IPO.",
  description,
  plans,
  defaultCycle = "annual",
  hideToggle = false,
  cycleLabels = { monthly: "Monthly", annual: "Annual" },
  className,
}: StagedPricingProps) {
  const [cycle, setCycle] = React.useState<BillingCycle>(defaultCycle);

  const colsClass = gridColsByCount[plans.length] ?? "lg:grid-cols-4";

  return (
    <section className={cn("w-full bg-background py-20 lg:py-28", className)}>
      <div className="container">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-md text-balance text-center text-lg text-muted-foreground md:text-xl">
              {description}
            </p>
          )}
        </div>

        {!hideToggle && (
          <div className="mt-8 flex flex-col items-center">
            <CycleToggle
              cycle={cycle}
              onChange={setCycle}
              labels={cycleLabels}
            />
          </div>
        )}

        <div className="relative mt-10 lg:mt-20">
          <div
            className={cn(
              "relative grid grid-cols-1 gap-6 xl:mx-auto xl:max-w-[83.333%]",
              colsClass,
            )}
          >
            <GridFrameLines columns={plans.length} />
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} cycle={cycle} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StagedPricing;
