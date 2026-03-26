"use client";

import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PricingFeature {
  text: string;
  tooltip?: string;
}

interface PricingTier {
  label: string;
  price: string;
  priceSuffix?: string;
  cta: string;
  ctaHref?: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
}

interface PricingCardsTooltipProps {
  tiers?: PricingTier[];
  showCornerMarks?: boolean;
  className?: string;
}

const defaultTiers: PricingTier[] = [
  {
    label: "STARTER",
    price: "Free",
    cta: "Get Started",
    ctaHref: "#",
    description: "Perfect for side projects and experimentation",
    features: [
      {
        text: "Up to 3 projects",
        tooltip: "Create and manage up to 3 active projects",
      },
      {
        text: "Basic analytics",
        tooltip: "Track page views and basic user metrics",
      },
      {
        text: "Community support",
        tooltip: "Get help from our active community forums",
      },
      {
        text: "Standard API access",
        tooltip: "1,000 API calls per month included",
      },
      {
        text: "Email notifications",
        tooltip: "Receive alerts for important events",
      },
    ],
  },
  {
    label: "PRO",
    price: "29",
    priceSuffix: "/mo",
    cta: "Upgrade to Pro",
    ctaHref: "#",
    description: "For professionals who need more power",
    highlighted: true,
    features: [
      {
        text: "Unlimited projects",
        tooltip: "No limits on the number of projects you can create",
      },
      {
        text: "Advanced analytics",
        tooltip: "Detailed insights with custom dashboards and reports",
      },
      {
        text: "Priority support",
        tooltip: "Get responses within 24 hours from our team",
      },
      {
        text: "Unlimited API access",
        tooltip: "No rate limits on API calls",
      },
      {
        text: "Custom integrations",
        tooltip: "Connect with your favorite tools via webhooks",
      },
      {
        text: "Team collaboration",
        tooltip: "Invite up to 10 team members to your workspace",
      },
      {
        text: "Export & backup",
        tooltip: "Download your data anytime in multiple formats",
      },
    ],
  },
];

function CornerMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-3 h-3 text-red-400", className)}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 2L10 10M10 2L2 10" />
    </svg>
  );
}

function FeatureRow({ feature }: { feature: PricingFeature }) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-start gap-3 py-2">
      <div className="flex items-start gap-3">
        <Check className="w-4 h-4 mt-0.5 shrink-0 text-foreground" />
        <span className="text-sm text-foreground/80">{feature.text}</span>
      </div>
      {feature.tooltip && (
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="shrink-0 rounded-full p-0.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="max-w-[200px] text-xs bg-foreground text-background"
          >
            {feature.tooltip}
          </TooltipContent>
        </Tooltip>
      )}
    </li>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div className="flex flex-col h-full">
      {/* Label */}
      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
        {tier.label}
      </p>

      {/* Price */}
      <div className="mb-4">
        {tier.priceSuffix ? (
          <div className="flex items-baseline gap-1">
            <span className="text-5xl md:text-6xl font-light tracking-tight text-foreground">
              {tier.price}
            </span>
            <span className="text-lg text-muted-foreground">
              {tier.priceSuffix}
            </span>
          </div>
        ) : (
          <span className="text-5xl md:text-6xl font-light tracking-tight text-foreground">
            {tier.price}
          </span>
        )}
      </div>

      {/* CTA Button */}
      <a
        href={tier.ctaHref || "#"}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors mb-4",
          tier.highlighted
            ? "bg-gradient-to-r from-rose-400 to-red-400 text-white hover:from-rose-500 hover:to-red-500"
            : "bg-foreground text-background hover:bg-foreground/90",
        )}
      >
        {tier.cta}
      </a>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>

      {/* Features */}
      <ul className="space-y-0 divide-y divide-border/50">
        {tier.features.map((feature, idx) => (
          <FeatureRow key={idx} feature={feature} />
        ))}
      </ul>
    </div>
  );
}

export default function PricingCardsTooltip({
  tiers = defaultTiers,
  showCornerMarks = false,
  className,
}: PricingCardsTooltipProps) {
  return (
    <TooltipProvider>
      <section className={cn("py-12 px-4 sm:px-6 lg:px-8", className)}>
        <div className="relative mx-auto max-w-4xl">
          {/* Corner marks */}
          {showCornerMarks && (
            <>
              <CornerMark className="absolute -top-2 -left-2" />
              <CornerMark className="absolute -top-2 -right-2" />
              <CornerMark className="absolute -bottom-2 -left-2" />
              <CornerMark className="absolute -bottom-2 -right-2" />
              <CornerMark className="absolute -top-2 left-1/2 -translate-x-1/2" />
              <CornerMark className="absolute -bottom-2 left-1/2 -translate-x-1/2" />
            </>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {tiers.map((tier, idx) => (
              <PricingCard key={idx} tier={tier} />
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
