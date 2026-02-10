"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   Fluid Numerals — digits that roll like a physical odometer.
   Each digit is independent: when 10→09 the tens-place rolls
   1→0 separately from the ones-place rolling 0→9.
   ═══════════════════════════════════════════════════════════ */

export interface BannerCountdownProps {
  title: string;
  endDate: Date;
  action?: { label: string; href: string };
  onExpire?: () => void;
  onDismiss?: () => void;
  className?: string;
}

/* ── time math ── */
function calc(end: Date) {
  const s = Math.max(0, Math.floor((end.getTime() - Date.now()) / 1000));
  return {
    total: s,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/* ── single rolling digit (0-9) ── */
function Digit({ value }: { value: number }) {
  const [cur, setCur] = React.useState(value);
  const [prev, setPrev] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (value !== cur) {
      setPrev(cur);
      setCur(value);
      const id = setTimeout(() => setPrev(null), 400);
      return () => clearTimeout(id);
    }
  }, [value, cur]);

  return (
    <span className="relative inline-flex h-[1.4em] w-[0.62em] items-center justify-center overflow-hidden">
      {prev !== null && (
        <span className="absolute inset-0 flex items-center justify-center animate-[digit-out_0.35s_ease-in_forwards]">
          {prev}
        </span>
      )}
      <span
        key={cur}
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          prev !== null &&
            "animate-[digit-in_0.35s_cubic-bezier(0.16,1,0.3,1)]",
        )}
      >
        {cur}
      </span>
    </span>
  );
}

/* ── digit pair container ── */
function Pair({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center rounded-md bg-foreground/[0.04] px-2.5 py-1.5 font-mono text-xl font-medium tabular-nums leading-none text-foreground">
      <Digit value={Math.floor(value / 10)} />
      <Digit value={value % 10} />
    </div>
  );
}

/* ── main banner ── */
export function BannerCountdown({
  title,
  endDate,
  action,
  onExpire,
  onDismiss,
  className,
}: BannerCountdownProps) {
  const [mounted, setMounted] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [time, setTime] = React.useState(() => calc(endDate));
  const expiredRef = React.useRef(false);
  const onExpireRef = React.useRef(onExpire);
  onExpireRef.current = onExpire;

  /* entrance expand */
  React.useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true));
    });
  }, []);

  /* tick */
  React.useEffect(() => {
    const id = setInterval(() => {
      const t = calc(endDate);
      setTime(t);
      if (t.total <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current?.();
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) setTimeout(onDismiss, 350);
  };

  const tick = time.seconds % 2 === 0;

  const colonCn = cn(
    "self-center text-sm font-extralight text-muted-foreground transition-opacity duration-500",
    tick ? "opacity-30" : "opacity-10",
  );

  const labelCn =
    "text-center text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground/30";

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
            "relative flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-12 py-4",
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

          {/* Fluid Numerals — CSS grid keeps colons aligned with pairs,
              labels in their own row so they don't shift vertical center */}
          <div className="inline-grid grid-flow-col grid-rows-[auto_auto] items-center gap-x-2 gap-y-1">
            {time.days > 0 && (
              <>
                <Pair value={time.days} />
                <span className={labelCn}>days</span>
                <span className={colonCn}>:</span>
                <span />
              </>
            )}
            <Pair value={time.hours} />
            <span className={labelCn}>hrs</span>
            <span className={colonCn}>:</span>
            <span />
            <Pair value={time.minutes} />
            <span className={labelCn}>min</span>
            <span className={colonCn}>:</span>
            <span />
            <Pair value={time.seconds} />
            <span className={labelCn}>sec</span>
          </div>

          {/* action */}
          {action && (
            <a
              href={action.href}
              className="group inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              {action.label}
              <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          )}

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
