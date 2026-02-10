"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   Inline Morphing — a single pill surface that reshapes
   across input → loading → confirmation. No separate button,
   no status message — the pill IS all three states.
   ═══════════════════════════════════════════════════════════ */

export interface BannerNewsletterProps {
  title?: string;
  onSubscribe?: (email: string) => Promise<void> | void;
  onDismiss?: () => void;
  className?: string;
}

export function BannerNewsletter({
  title = "Stay in the loop",
  onSubscribe,
  onDismiss,
  className,
}: BannerNewsletterProps) {
  const [mounted, setMounted] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">(
    "idle",
  );
  const [error, setError] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onDismissRef = React.useRef(onDismiss);
  onDismissRef.current = onDismiss;

  /* entrance expand */
  React.useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true));
    });
  }, []);

  const handleDismiss = React.useCallback(() => {
    setDismissed(true);
    setTimeout(() => onDismissRef.current?.(), 350);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status !== "idle") return;

    setStatus("loading");
    try {
      await onSubscribe?.(email);
      setStatus("success");
      setTimeout(handleDismiss, 2000);
    } catch {
      setStatus("idle");
      setError(true);
      inputRef.current?.focus();
      setTimeout(() => setError(false), 600);
    }
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
            "relative flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-12 py-3",
            "after:pointer-events-none after:absolute after:bottom-0 after:inset-x-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border after:to-transparent",
            "transition-[opacity,transform] duration-150",
            dismissed && "opacity-0 -translate-y-1",
            className,
          )}
        >
          {/* title */}
          <span className="text-sm font-medium text-foreground/70">
            {title}
          </span>

          {/* ── Morphing Pill ── */}
          <div
            className={cn(
              "relative h-9 overflow-hidden rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              status === "idle" &&
                !error &&
                "w-64 border-border bg-foreground/[0.03] focus-within:border-foreground/20",
              status === "idle" &&
                error &&
                "w-64 border-destructive/40 bg-foreground/[0.03] animate-[nl-shake_0.4s_ease-out]",
              status === "loading" &&
                "w-40 border-foreground/15 bg-foreground/[0.03]",
              status === "success" &&
                "w-[136px] border-emerald-500/30 bg-emerald-500/[0.06] animate-[nl-land_0.4s_ease-out]",
            )}
          >
            {/* idle: input + magnetic arrow */}
            <form
              onSubmit={handleSubmit}
              className={cn(
                "absolute inset-0 flex items-center transition-opacity duration-200",
                status === "idle"
                  ? "opacity-100"
                  : "pointer-events-none opacity-0",
              )}
            >
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="h-full flex-1 bg-transparent pl-4 pr-1 text-sm text-foreground outline-none placeholder:text-muted-foreground/40"
                required
              />
              <button
                type="submit"
                className={cn(
                  "mr-1.5 flex size-6 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  email
                    ? "scale-100 bg-foreground text-background"
                    : "scale-75 bg-transparent text-foreground/20",
                )}
              >
                <ArrowRight className="size-3" />
              </button>
            </form>

            {/* loading: spinner + text */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-200",
                status === "loading"
                  ? "opacity-100 delay-150"
                  : "pointer-events-none opacity-0",
              )}
            >
              <svg
                className="size-3.5 animate-[nl-spin_0.8s_linear_infinite]"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-foreground/10"
                />
                <path
                  d="M14.5 8a6.5 6.5 0 0 0-6.5-6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="text-foreground/50"
                />
              </svg>
              <span className="text-xs font-medium text-foreground/40">
                Subscribing
              </span>
            </div>

            {/* success: drawn checkmark + text */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center gap-1.5 transition-opacity duration-200",
                status === "success"
                  ? "opacity-100 delay-150"
                  : "pointer-events-none opacity-0",
              )}
            >
              <svg
                className="size-3.5 text-emerald-500"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8.5L6.5 12L13 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                  className={
                    status === "success"
                      ? "animate-[nl-check_0.4s_cubic-bezier(0.65,0,0.35,1)_0.2s_forwards]"
                      : ""
                  }
                />
              </svg>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {"You're in"}
              </span>
            </div>
          </div>

          {/* dismiss */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-foreground/20 transition-all duration-150 hover:bg-foreground/5 hover:text-foreground/50 active:scale-90"
            aria-label="Dismiss"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
