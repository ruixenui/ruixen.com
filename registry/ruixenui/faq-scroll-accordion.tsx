"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   FAQ Scroll Accordion — Self-Contained Scroll Cascade.

   A scroll-aware FAQ inside its OWN scrollable container.
   The IntersectionObserver is scoped to the container, NOT
   the page viewport — items only respond to scrolling
   WITHIN the component, never to the main page scroll.

   Four FAQ paradigms in ruixen, zero overlap:
     • faq-auto-accordion:   spring traveling accent, motion physics
     • faq-chat-accordion:   conversational message exchange
     • staggered-faq:        BlurredStagger text reveal
     • faq-scroll-accordion: SELF-CONTAINED scroll cascade

   Container architecture:
     ┌─────────────────────────────────┐
     │  ░  gradient fade (top 5%)      │
     │  ─────────────────────────────  │
     │  Question 1                  ∨  │  ← visible
     │  Answer text...                 │
     │  ─────────────────────────────  │
     │  Question 2                  ∨  │  ← center zone
     │  ─────────────────────────────  │
     │  Question 3                  ∨  │  ← visible
     │  ░  gradient fade (bottom 5%)   │
     └───── scroll ↕ ─────────────────┘

   IntersectionObserver { root: scrollContainer }
     rootMargin: "-40% 0px -40% 0px"
     → center detection zone = middle 20% of container
     → an item must reach the container's center to trigger

   This means:
     • Page scroll has ZERO effect on which item opens
     • Only scrolling WITHIN the container triggers changes
     • In previews/iframes, the container IS the scroll context

   Scroll UX:
     Click: opens item + smoothly scrolls container to center
            it, then pauses scroll-driven for 3s
     Scroll: items cascade open as they reach center zone

   Visual cues for scrollability:
     • Gradient masks at top/bottom (5%) — content fades at edges
     • Hidden scrollbar (scrollbar-width: none + webkit hide)
     • Items below the fold create implicit scroll affordance

   Zero dependencies. No GSAP, no framer-motion, no lucide.
   ═══════════════════════════════════════════════════════════ */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQScrollAccordionProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  /** Enable scroll-driven auto-open. Default: true. */
  scrollDriven?: boolean;
  /** Index of the initially open item. null = all closed. */
  defaultActive?: number | null;
  className?: string;
}

const defaultItems: FAQItem[] = [
  {
    question: "What is Ruixen UI?",
    answer:
      "A curated collection of beautifully designed, production-ready components built with React and Tailwind CSS. Every component is crafted with animation-first thinking and zero unnecessary dependencies.",
  },
  {
    question: "How do I install components?",
    answer:
      "Use the shadcn CLI to add any component directly into your project. Each component lives in your codebase — no node_modules, full ownership, complete customization.",
  },
  {
    question: "Is it open-source?",
    answer:
      "Yes, fully open-source under the MIT license. Use it in personal projects, commercial products, client work — no restrictions.",
  },
  {
    question: "Do components work with dark mode?",
    answer:
      "Every component uses CSS custom properties and theme tokens. They adapt to light and dark modes automatically with no extra configuration.",
  },
  {
    question: "Can I customize the animations?",
    answer:
      "Absolutely. All transitions use standard CSS properties — timing, easing, and duration are easy to adjust. No animation library lock-in.",
  },
];

export default function FAQScrollAccordion({
  title = "Frequently asked questions",
  subtitle = "Everything you need to know.",
  items = defaultItems,
  scrollDriven = true,
  defaultActive = 0,
  className,
}: FAQScrollAccordionProps) {
  const [active, setActive] = React.useState<number | null>(defaultActive);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const scrollPausedRef = React.useRef(false);
  const pauseTimerRef = React.useRef<ReturnType<typeof setTimeout>>();

  // Callback ref for the scroll container — triggers re-render
  // when mounted so the IntersectionObserver effect can use it.
  const [scrollContainer, setScrollContainer] =
    React.useState<HTMLDivElement | null>(null);

  // ── Scroll-driven auto-open ────────────────────────────
  // Scoped to the scroll container, NOT the page viewport.
  // rootMargin "-40% 0px -40% 0px" = center 20% of container.
  React.useEffect(() => {
    if (!scrollDriven || !scrollContainer) return;

    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (scrollPausedRef.current) return;
          if (entry.isIntersecting) {
            setActive(i);
          }
        },
        {
          root: scrollContainer,
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0.5,
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [scrollDriven, scrollContainer, items]);

  // ── Click handler ──────────────────────────────────────
  // Opens item, scrolls container to center it, then pauses
  // scroll-driven behavior for 3s so the observer doesn't
  // immediately override the user's selection.
  const toggle = React.useCallback(
    (i: number) => {
      scrollPausedRef.current = true;
      setActive((prev) => {
        const next = prev === i ? null : i;

        // Smooth-scroll the container to center the clicked item
        if (next !== null && scrollContainer) {
          const el = itemRefs.current[next];
          if (el) {
            requestAnimationFrame(() => {
              const scrollTop =
                el.offsetTop -
                scrollContainer.clientHeight / 2 +
                el.offsetHeight / 2;
              scrollContainer.scrollTo({
                top: Math.max(0, scrollTop),
                behavior: "smooth",
              });
            });
          }
        }

        return next;
      });

      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = setTimeout(() => {
        scrollPausedRef.current = false;
      }, 3000);
    },
    [scrollContainer],
  );

  React.useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-2xl px-6">
        {/* ── Header (outside scroll container) ───────── */}
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}

        {/* ── Scrollable container ────────────────────── */}
        <div
          ref={setScrollContainer}
          className="relative max-h-80 overflow-y-auto"
          data-faq-scroll
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)",
            scrollbarWidth: "none",
          }}
        >
          {items.map((item, i) => {
            const isActive = i === active;

            return (
              <div
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={cn("border-b border-border", i === 0 && "border-t")}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-5 text-left"
                  onClick={() => toggle(i)}
                >
                  <span
                    className="pr-4 text-base font-medium transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0.5 }}
                  >
                    {item.question}
                  </span>

                  {/* Chevron — inline SVG, no lucide */}
                  <svg
                    className="h-4 w-4 shrink-0 text-muted-foreground"
                    style={{
                      transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                      transition:
                        "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* ── Expandable answer ───────────────── */}
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isActive ? "1fr" : "0fr",
                    transition:
                      "grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="pb-5 text-sm leading-relaxed text-muted-foreground"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? "translateY(0)"
                          : "translateY(8px)",
                        transition: isActive
                          ? "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.1s"
                          : "opacity 0.15s ease, transform 0.15s ease",
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hide webkit scrollbar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `[data-faq-scroll]::-webkit-scrollbar{display:none}`,
        }}
      />
    </section>
  );
}

export { FAQScrollAccordion, type FAQScrollAccordionProps, type FAQItem };
