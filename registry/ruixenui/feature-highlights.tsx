"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Feature Highlights — Staged Spotlight.

   A split-layout feature showcase with an auto-advancing
   image stage and a rack-focus crossfade between visuals.

   Layout:
     Mobile:  image (top) → feature list (bottom)
     Desktop: feature list (left) ↔ image stage (right)

   Fundamentally different from every accordion in ruixen:
     • faq-auto-accordion: spring traveling accent, motion physics
     • faq-scroll-accordion: self-contained scroll cascade
     • feature-highlights: IMAGE STAGE + auto-play + rack-focus

   Rack-focus crossfade:
     Active:   opacity 1, scale 1,    blur 0
     Inactive: opacity 0, scale 0.94, blur 6px
   The blur+scale creates a camera depth-of-field effect —
   incoming images "focus in" from a slightly larger, blurred
   state, outgoing images "defocus" and recede.

   Auto-play:
     A progress bar fills from left to right over N seconds.
     On completion, auto-advances to the next feature (loops).
     The progress bar uses CSS @keyframes scaleX(0→1) with
     transform-origin: left. The key prop resets the animation
     on active change. Pauses on hover via animation-play-state.

   Feature list:
     Sliding accent indicator via ResizeObserver — tracks the
     active item's position and height in real time.
     Description uses grid-template-rows 0fr→1fr for smooth
     height animation. Description text has 80ms delayed
     fade+slide after the container opens.

   Zero dependencies. No embla, no framer-motion, no next/image.
   ═══════════════════════════════════════════════════════════ */

export interface FeatureItem {
  title: string;
  description: string;
  image?: React.ReactNode;
}

export interface FeatureHighlightsProps {
  title?: string;
  features?: FeatureItem[];
  /** Seconds per feature during auto-play. 0 to disable. */
  autoPlayInterval?: number;
  /** Index of the initially active feature. */
  defaultActive?: number;
  className?: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    title: "AI-Powered Automation",
    description:
      "Streamline workflows with intelligent automation that learns from your patterns and adapts to your needs.",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Monitor metrics live with sub-second latency. Dashboards update instantly as data flows in.",
  },
  {
    title: "Seamless Integrations",
    description:
      "Connect with the tools you already use. One-click setup, zero configuration drift.",
  },
  {
    title: "Scalable Infrastructure",
    description:
      "Grow without limits. Auto-scaling handles traffic spikes so you never think about capacity.",
  },
];

export default function FeatureHighlights({
  title = "Why we're different",
  features = defaultFeatures,
  autoPlayInterval = 5,
  defaultActive = 0,
  className,
}: FeatureHighlightsProps) {
  const [active, setActive] = React.useState(defaultActive);
  const [paused, setPaused] = React.useState(false);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = React.useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = React.useState({ top: 0, height: 0 });

  // ── Accent indicator tracking ──────────────────────────
  // ResizeObserver catches height changes as the description
  // expands — the indicator stretches in real time.
  React.useEffect(() => {
    const el = itemRefs.current[active];
    const list = listRef.current;
    if (!el || !list) return;

    const update = () => {
      const listRect = list.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({
        top: elRect.top - listRect.top,
        height: elRect.height,
      });
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  // ── Auto-advance callback ──────────────────────────────
  const advance = React.useCallback(() => {
    setActive((prev) => (prev + 1) % features.length);
  }, [features.length]);

  return (
    <section
      className={cn("py-16 md:py-24", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl px-6">
        {title && (
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[5fr_7fr] md:gap-8">
          {/* ── Feature list ──────────────────────────── */}
          <div
            ref={listRef}
            className="relative order-2 self-center md:order-1"
          >
            {/* Track line */}
            <div className="absolute bottom-0 left-0 top-0 w-px bg-border" />

            {/* Sliding accent indicator */}
            <div
              className="absolute left-0 w-0.5 rounded-full bg-foreground"
              style={{
                top: indicator.top,
                height: indicator.height,
                transition:
                  "top 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />

            {features.map((feature, i) => {
              const isActive = i === active;

              return (
                <button
                  key={i}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  className="relative flex w-full cursor-pointer flex-col items-start py-3 pl-5 text-left"
                  onClick={() => setActive(i)}
                >
                  {/* Index + Title */}
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className={cn(
                        "font-mono text-xs tabular-nums transition-all duration-300",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/60",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-sm font-medium transition-all duration-300"
                      style={{ opacity: isActive ? 1 : 0.4 }}
                    >
                      {feature.title}
                    </span>
                  </div>

                  {/* Expandable description */}
                  <div
                    className="grid w-full"
                    style={{
                      gridTemplateRows: isActive ? "1fr" : "0fr",
                      transition:
                        "grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="pt-1.5 pl-7 text-xs leading-relaxed text-muted-foreground"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive
                            ? "translateY(0)"
                            : "translateY(6px)",
                          transition: isActive
                            ? "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.08s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.08s"
                            : "opacity 0.15s ease, transform 0.15s ease",
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar — fills during auto-play */}
                  {isActive && autoPlayInterval > 0 && (
                    <div className="absolute bottom-0 left-5 right-0 h-px bg-border">
                      <div
                        key={`progress-${active}`}
                        className="h-full origin-left bg-foreground/40"
                        style={{
                          animation: `feature-highlight-progress ${autoPlayInterval}s linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                        onAnimationEnd={advance}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Image stage — rack-focus crossfade ─────── */}
          <div className="relative order-1 aspect-video overflow-hidden rounded-xl border border-border/50 bg-muted md:order-2">
            {features.map((feature, i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(0.94)",
                  filter: i === active ? "blur(0px)" : "blur(6px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {feature.image || (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-lg font-medium text-muted-foreground/20">
                      {feature.title}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes feature-highlight-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}`,
        }}
      />
    </section>
  );
}

export { FeatureHighlights, type FeatureHighlightsProps, type FeatureItem };
