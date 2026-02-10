"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   FAQ Chat Accordion — Conversational Message Exchange.

   A FAQ that feels like texting a support bot. Questions are
   right-aligned bubbles (you sent them), answers are left-
   aligned bubbles (the system replied). Click a question and
   a single bubble opens — first showing typing dots, then
   morphing smoothly into the answer text.

   ALL height transitions use CSS grid-template-rows — this
   changes actual DOM height (not transforms), so siblings
   follow the transition naturally without FLIP tricks or
   layout springs. Zero jank. Zero double-shift.

   Motion is used sparingly: spring y+opacity for the bubble
   entrance feel, spring whileTap for tactile press. That's
   it. Everything else is CSS — because CSS grid transitions
   are inherently smoother than transform-based layout hacks.

   Animation architecture:
     ┌─ Outer grid (0fr ↔ 1fr) ─── bubble enter/exit
     │   └─ motion.div (y + opacity) ─── spring entrance
     │       └─ Bubble container (bg-muted, rounded)
     │           ├─ Inner grid A (dots: 1fr ↔ 0fr)
     │           └─ Inner grid B (text: 0fr ↔ 1fr)
     └─ Siblings follow naturally (real height, not transforms)

   Four FAQ paradigms in ruixen, zero overlap:
     • faq-auto-accordion:   spring traveling accent, motion physics
     • faq-chat-accordion:   conversational message exchange
     • faq-scroll-accordion: self-contained scroll cascade
     • staggered-faq:        BlurredStagger text reveal, split

   Dependencies: motion (only for whileTap + spring entrance).
   ═══════════════════════════════════════════════════════════ */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQChatAccordionProps {
  title?: string;
  items?: FAQItem[];
  /** Milliseconds to show typing dots before answer. 0 to skip. */
  typingDelay?: number;
  className?: string;
}

const defaultItems: FAQItem[] = [
  {
    question: "How late does the internet close?",
    answer: "The internet never closes — it runs 24/7, 365 days a year.",
  },
  {
    question: "Do I need a license to browse?",
    answer:
      "No license required. Just open your browser and you're good to go.",
  },
  {
    question: "What flavour are the cookies?",
    answer:
      "Our cookies are digital. They help us remember your preferences, not satisfy cravings.",
  },
  {
    question: "Can I get lost here?",
    answer:
      "You might explore deeper than planned, but there's always a way back.",
  },
  {
    question: "What if I click the wrong button?",
    answer:
      "Nothing breaks. Hit back, refresh, or just try again. We're forgiving.",
  },
];

const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const EXPO_STRONG = "cubic-bezier(0.22, 1, 0.36, 1)";

export function FAQChatAccordion({
  title = "Have questions?",
  items = defaultItems,
  typingDelay = 400,
  className,
}: FAQChatAccordionProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const [showAnswer, setShowAnswer] = React.useState<number | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const handleClick = React.useCallback(
    (i: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      if (active === i) {
        // Close — don't clear showAnswer so bubble
        // exits with current content (no reverse morph)
        setActive(null);
        return;
      }

      // Open — clear showAnswer to start typing phase
      setShowAnswer(null);
      setActive(i);

      if (typingDelay > 0) {
        timerRef.current = setTimeout(() => setShowAnswer(i), typingDelay);
      } else {
        setShowAnswer(i);
      }
    },
    [active, typingDelay],
  );

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-lg px-6">
        {/* ── Header ────────────────────────────────────── */}
        {title && (
          <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
        )}

        {/* ── Date separator ────────────────────────────── */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-medium text-muted-foreground">
            Today
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* ── Message thread ────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {items.map((item, i) => {
            const isActive = active === i;
            const hasAnswer = showAnswer === i;

            return (
              <div key={i}>
                {/* ── Question bubble (right-aligned) ──── */}
                <div className="flex justify-end">
                  <motion.button
                    type="button"
                    className="max-w-[85%] rounded-2xl rounded-br-[6px] bg-foreground px-4 py-2.5 text-left text-[14px] font-medium text-background"
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    onClick={() => handleClick(i)}
                    aria-expanded={isActive}
                  >
                    {item.question}
                  </motion.button>
                </div>

                {/* ── Answer area ─────────────────────────
                     Outer CSS grid handles enter/exit height.
                     Siblings follow naturally — real DOM height,
                     not transforms.
                     ──────────────────────────────────────── */}
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isActive ? "1fr" : "0fr",
                    transition: isActive
                      ? `grid-template-rows 0.4s ${EXPO_STRONG}`
                      : `grid-template-rows 0.25s ${EXPO}`,
                  }}
                >
                  <div className="overflow-hidden">
                    {/* Spring entrance feel (y + opacity only) */}
                    <motion.div
                      initial={false}
                      animate={{
                        y: isActive ? 0 : 4,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{
                        y: isActive
                          ? {
                              type: "spring",
                              stiffness: 380,
                              damping: 26,
                            }
                          : { duration: 0.15 },
                        opacity: {
                          duration: isActive ? 0.25 : 0.12,
                        },
                      }}
                    >
                      <div className="flex justify-start pt-2">
                        <div className="max-w-[85%] overflow-hidden rounded-2xl rounded-bl-[6px] bg-muted">
                          {/* ── Dots section ───────────── */}
                          {/* Collapses when answer ready   */}
                          <div
                            className="grid"
                            style={{
                              gridTemplateRows: hasAnswer ? "0fr" : "1fr",
                              transition: `grid-template-rows 0.3s ${EXPO}`,
                            }}
                          >
                            <div className="overflow-hidden">
                              <div className="flex items-center gap-[5px] px-4 py-3">
                                <span
                                  className="inline-block h-[5px] w-[5px] rounded-full bg-muted-foreground/50"
                                  style={{
                                    animation:
                                      "faqChatDot 1.2s ease-in-out infinite",
                                  }}
                                />
                                <span
                                  className="inline-block h-[5px] w-[5px] rounded-full bg-muted-foreground/50"
                                  style={{
                                    animation:
                                      "faqChatDot 1.2s ease-in-out 0.15s infinite",
                                  }}
                                />
                                <span
                                  className="inline-block h-[5px] w-[5px] rounded-full bg-muted-foreground/50"
                                  style={{
                                    animation:
                                      "faqChatDot 1.2s ease-in-out 0.3s infinite",
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* ── Text section ───────────── */}
                          {/* Expands when answer ready     */}
                          <div
                            className="grid"
                            style={{
                              gridTemplateRows: hasAnswer ? "1fr" : "0fr",
                              transition: `grid-template-rows 0.3s ${EXPO}`,
                            }}
                          >
                            <div className="overflow-hidden">
                              <p
                                className="px-4 py-2.5 text-[14px] leading-relaxed text-foreground"
                                style={{
                                  opacity: hasAnswer ? 1 : 0,
                                  transition: hasAnswer
                                    ? "opacity 0.2s ease 0.08s"
                                    : "opacity 0.1s ease",
                                }}
                              >
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes faqChatDot{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}`,
        }}
      />
    </section>
  );
}
