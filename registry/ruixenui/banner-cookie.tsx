"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BannerCookieProps {
  description?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
}

export default function BannerCookie({
  description = "This site uses cookies to improve your experience.",
  onAccept,
  onDecline,
  className,
}: BannerCookieProps) {
  const [leaving, setLeaving] = React.useState(false);
  const [gone, setGone] = React.useState(false);

  const dismiss = (cb?: () => void) => {
    setLeaving(true);
    setTimeout(() => {
      setGone(true);
      cb?.();
    }, 300);
  };

  if (gone) return null;

  return (
    <div
      className={cn(
        /* ── surface ── */
        "relative w-full max-w-[340px] overflow-hidden rounded-2xl border border-border bg-card p-5",
        /* ── depth: outline + tight + ambient ── */
        "shadow-[0_0_0_0.5px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.06),0_12px_24px_-6px_rgba(0,0,0,0.1)]",
        /* ── top-edge glass highlight ── */
        "after:pointer-events-none after:absolute after:inset-x-4 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-foreground/[0.06] after:to-transparent",
        /* ── entrance / exit ── */
        leaving
          ? "animate-[cookie-leave_0.25s_ease-out_forwards]"
          : "animate-[cookie-enter_0.5s_cubic-bezier(0.16,1,0.3,1)_both]",
        className,
      )}
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-4 flex items-center justify-end gap-3">
        {/* ── Decline: ghost + sliding underline reveal ── */}
        <button
          type="button"
          onClick={() => dismiss(onDecline)}
          className="group relative h-8 px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          Decline
          <span className="absolute inset-x-1 -bottom-px h-px origin-left scale-x-0 bg-current transition-transform duration-200 ease-out group-hover:scale-x-100" />
        </button>

        {/* ── Accept: pill + shadow elevator + press scale ── */}
        <button
          type="button"
          onClick={() => dismiss(onAccept)}
          className="h-8 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-[0.96]"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export { BannerCookie, type BannerCookieProps };
