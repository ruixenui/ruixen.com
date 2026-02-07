"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";

interface BannerAnnouncementProps {
  children: React.ReactNode;
  badge?: string;
  action?: { label: string; href: string };
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export default function BannerAnnouncement({
  children,
  badge,
  action,
  dismissible = true,
  onDismiss,
  className,
}: BannerAnnouncementProps) {
  const [mounted, setMounted] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true));
    });
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) setTimeout(onDismiss, 350);
  };

  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] ease-[cubic-bezier(0.16,1,0.3,1)]",
        mounted && !dismissed
          ? "[grid-template-rows:1fr] duration-500"
          : "[grid-template-rows:0fr] duration-300",
      )}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "relative flex items-center justify-center gap-2.5 border-b px-10 py-2.5 text-sm",
            "bg-muted/40",
            /* ── shimmer sweep ── */
            "before:pointer-events-none before:absolute before:inset-0",
            "before:bg-[length:250%_100%] before:bg-no-repeat",
            "before:bg-[linear-gradient(110deg,transparent_30%,hsl(var(--foreground)/0.04)_44%,hsl(var(--foreground)/0.08)_50%,hsl(var(--foreground)/0.04)_56%,transparent_70%)]",
            "before:animate-[banner-shimmer_1.8s_ease-out_0.3s_1_both]",
            /* ── content fade on dismiss ── */
            "transition-[opacity,transform] duration-150",
            dismissed && "opacity-0 -translate-y-1",
            className,
          )}
        >
          {badge && (
            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {badge}
            </span>
          )}

          <p className="text-center font-medium text-foreground/80">
            {children}
          </p>

          {action && (
            <a
              href={action.href}
              className="group inline-flex shrink-0 items-center gap-0.5 font-semibold text-foreground transition-colors hover:text-foreground/70"
            >
              {action.label}
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          )}

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-foreground/30 transition-all duration-150 hover:bg-foreground/5 hover:text-foreground/60 active:scale-90"
              aria-label="Dismiss"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { BannerAnnouncement, type BannerAnnouncementProps };
