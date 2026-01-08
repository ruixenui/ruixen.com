"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Gift, Percent, Star } from "lucide-react";

type PromoVariant = "default" | "festive" | "minimal" | "gradient";

interface BannerPromoProps {
  badge?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: PromoVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  onCtaClick?: () => void;
  className?: string;
}

const variantStyles = {
  default: "bg-primary text-primary-foreground",
  festive: "bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white",
  minimal: "bg-secondary text-secondary-foreground border-b",
  gradient:
    "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white",
};

const badgeStyles = {
  default: "bg-primary-foreground/20 text-primary-foreground",
  festive: "bg-white/20 text-white",
  minimal: "bg-primary text-primary-foreground",
  gradient: "bg-white/20 text-white",
};

export default function BannerPromo({
  badge,
  title,
  description,
  ctaLabel = "Shop now",
  ctaHref = "#",
  variant = "default",
  dismissible = true,
  onDismiss,
  onCtaClick,
  className,
}: BannerPromoProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden px-4 py-3",
        variantStyles[variant],
        className,
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 size-24 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -right-8 size-32 rounded-full bg-white/5" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
        {badge && (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
              badgeStyles[variant],
            )}
          >
            <Sparkles className="size-3" />
            {badge}
          </span>
        )}
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
          <span className="font-bold">{title}</span>
          {description && (
            <span className="text-sm opacity-90">{description}</span>
          )}
        </div>
        <Button
          size="sm"
          variant={variant === "minimal" ? "default" : "secondary"}
          className={cn(
            variant !== "minimal" &&
              "bg-white/20 text-inherit hover:bg-white/30",
          )}
          onClick={onCtaClick}
          asChild={!!ctaHref}
        >
          {ctaHref ? <a href={ctaHref}>{ctaLabel}</a> : <span>{ctaLabel}</span>}
        </Button>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-white/20"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export { BannerPromo, type BannerPromoProps };
