"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, ArrowRight, Sparkles, Megaphone, Zap } from "lucide-react";

type BannerVariant = "default" | "gradient" | "minimal" | "accent";

interface BannerAnnouncementProps {
  children: React.ReactNode;
  variant?: BannerVariant;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles = {
  default: "bg-primary text-primary-foreground",
  gradient:
    "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white",
  minimal: "bg-muted/50 text-foreground border-b",
  accent: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
};

export default function BannerAnnouncement({
  children,
  variant = "default",
  icon,
  actionLabel,
  actionHref,
  dismissible = true,
  onDismiss,
  className,
}: BannerAnnouncementProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center gap-x-3 px-4 py-2.5 text-sm",
        variantStyles[variant],
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <p className="text-center font-medium">{children}</p>
      {actionLabel && actionHref && (
        <a
          href={actionHref}
          className="group inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline"
        >
          {actionLabel}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      )}
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

export { BannerAnnouncement, type BannerAnnouncementProps };
