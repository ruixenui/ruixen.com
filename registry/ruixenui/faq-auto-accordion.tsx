"use client";

import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   FAQ Auto Accordion — Spring-Driven Traveling Accent.

   A minimal FAQ where the active indicator physically springs
   between items using motion's layoutId. Each answer expands
   with true spring physics — overshoot and settle, not CSS
   cubic-bezier. Siblings smoothly reposition via layout FLIP.

   The visual metaphor: a reading marker that slides between
   questions. Only one answer is visible at a time.

   Animation signatures (ALL unique to this component):
     1. layoutId accent bar — springs between items (FLIP)
     2. Spring height (height: 0 → "auto") via AnimatePresence
     3. Blur-deblur text reveal on answers
     4. layout="position" sibling repositioning
     5. Differential spring stiffness (open: 300, close: 400)
     6. CSS linear progress bar at answer's bottom edge

   Four FAQ paradigms in ruixen, zero overlap:
     • faq-auto-accordion:   spring traveling accent, motion physics
     • faq-chat-accordion:   conversational message exchange
     • faq-scroll-accordion: self-contained scroll cascade
     • staggered-faq:        BlurredStagger text reveal, split

   Dependencies: motion.
   ═══════════════════════════════════════════════════════════ */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAutoAccordionProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  /** Seconds per item auto-advance. 0 to disable. */
  autoInterval?: number;
  className?: string;
}

const defaultItems: FAQItem[] = [
  {
    question: "What is the purpose of this platform?",
    answer:
      "Our platform is designed to simplify your workflow and save you hours every week using automation and AI-powered tools.",
  },
  {
    question: "Is this service available worldwide?",
    answer:
      "Yes, we support users across the globe with localized features and multi-currency billing support.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 7-day refund policy. If you're unsatisfied, just contact our support within that time frame.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan anytime from your account dashboard. Changes take effect immediately.",
  },
  {
    question: "Does this integrate with other tools?",
    answer:
      "Yes! We support integrations with Slack, Notion, Zapier, and many more through our extensive plugin ecosystem.",
  },
  {
    question: "Is there an API available?",
    answer:
      "Yes, our public API is available for all Pro users. Documentation can be found in the developer portal.",
  },
];

export function FAQAutoAccordion({
  title = "Have questions?",
  subtitle = "Everything you need to know.",
  items = defaultItems,
  autoInterval = 6,
  className,
}: FAQAutoAccordionProps) {
  const [active, setActive] = React.useState<number | null>(0);
  const [paused, setPaused] = React.useState(false);
  const [cycleKey, setCycleKey] = React.useState(0);

  // ── Auto-advance ─────────────────────────────────────────
  React.useEffect(() => {
    if (autoInterval <= 0 || paused || active === null) return;

    const timer = setTimeout(() => {
      setActive((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % items.length;
      });
      setCycleKey((k) => k + 1);
    }, autoInterval * 1000);

    return () => clearTimeout(timer);
  }, [active, autoInterval, paused, items.length, cycleKey]);

  // ── Click handler ────────────────────────────────────────
  const toggle = React.useCallback((i: number) => {
    setActive((prev) => (prev === i ? null : i));
    setCycleKey((k) => k + 1);
  }, []);

  return (
    <section
      className={cn("py-16 md:py-24", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setCycleKey((k) => k + 1);
      }}
    >
      <div className="mx-auto max-w-xl px-6">
        {/* ── Header ────────────────────────────────────── */}
        {title && (
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}

        {/* ── FAQ list with spring layout ────────────────── */}
        <LayoutGroup>
          <div>
            {items.map((item, i) => {
              const isActive = active === i;

              return (
                <motion.div
                  key={i}
                  layout="position"
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                    },
                  }}
                >
                  <button
                    type="button"
                    className="relative flex w-full items-center gap-4 py-[14px] text-left"
                    onClick={() => toggle(i)}
                    aria-expanded={isActive}
                  >
                    {/* ── Traveling accent bar ─────────────── */}
                    <span className="relative flex w-[3px] self-stretch shrink-0">
                      {isActive && (
                        <motion.span
                          layoutId="faq-accent"
                          className="absolute inset-0 rounded-full bg-foreground"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </span>

                    {/* ── Question ─────────────────────────── */}
                    <span
                      className={cn(
                        "flex-1 text-[15px] font-medium transition-colors duration-200",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground/70",
                      )}
                    >
                      {item.question}
                    </span>
                  </button>

                  {/* ── Expandable answer ─────────────────── */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: "auto",
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          },
                        }}
                        exit={{
                          height: 0,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.p
                          initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                              y: {
                                type: "spring",
                                stiffness: 380,
                                damping: 26,
                                delay: 0.04,
                              },
                              opacity: { duration: 0.25, delay: 0.04 },
                              filter: { duration: 0.3, delay: 0.04 },
                            },
                          }}
                          exit={{
                            opacity: 0,
                            filter: "blur(2px)",
                            transition: {
                              opacity: { duration: 0.12 },
                              filter: { duration: 0.12 },
                            },
                          }}
                          className="pb-4 pl-[19px] pr-2 text-[13px] leading-relaxed text-muted-foreground"
                        >
                          {item.answer}
                        </motion.p>

                        {/* ── Progress bar ────────────────── */}
                        {autoInterval > 0 && (
                          <div className="mb-3 ml-[19px] mr-2 h-px overflow-hidden rounded-full bg-foreground/[0.06]">
                            <div
                              key={`bar-${i}-${cycleKey}`}
                              className="h-full rounded-full bg-foreground/15"
                              style={{
                                transformOrigin: "left",
                                transform: "scaleX(0)",
                                animation: paused
                                  ? "none"
                                  : `faqAutoBar ${autoInterval}s linear forwards`,
                              }}
                            />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes faqAutoBar{to{transform:scaleX(1)}}`,
        }}
      />
    </section>
  );
}
