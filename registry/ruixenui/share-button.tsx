"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Share Button — Rauno Freiberg craft.
 *
 * One surface, four phases, choreographed transitions.
 * Idle → Open (staggered cascade) → Closing (reverse cascade) → Done.
 * Icons exit BEFORE state swaps. Container holds shape during exit.
 * Cursor glow under glass. Per-role springs. Blur materialization.
 */

/* ── Springs — tuned per visual weight ── */

const spring = {
  morph: { type: "spring" as const, stiffness: 400, damping: 30 },
  content: { type: "spring" as const, stiffness: 340, damping: 28 },
  icon: { type: "spring" as const, stiffness: 440, damping: 24 },
  press: { type: "spring" as const, stiffness: 600, damping: 32 },
};

/* ── Types ── */

type Phase = "idle" | "open" | "closing" | "done";

interface ShareButtonProps {
  onShare?: (target: string) => void;
}

/* ── Share targets ── */

const TARGETS = [
  { id: "link", label: "Copy link" },
  { id: "email", label: "Email" },
  { id: "x", label: "Share on X" },
];

/* ── Component ── */

export function ShareButton({ onShare }: ShareButtonProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [locked, setLocked] = useState(false);
  const [glowX, setGlowX] = useState(0);
  const [glowOn, setGlowOn] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const lock = useCallback(() => {
    setLocked(true);
    setTimeout(() => setLocked(false), 450);
  }, []);

  /* Clean up timers */
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  /* Auto-revert from done */
  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => {
      setPhase("idle");
      lock();
    }, 2200);
    return () => clearTimeout(t);
  }, [phase, lock]);

  /**
   * Choreographed close:
   * 1. Set "closing" — icons reverse-stagger out, container holds shape
   * 2. After 300ms (icons invisible) — swap to target phase
   */
  const startClose = (nextPhase: "idle" | "done") => {
    setPhase("closing");
    closeTimer.current = setTimeout(() => setPhase(nextPhase), 300);
  };

  const toggle = () => {
    if (locked || phase === "closing") return;
    lock();
    if (phase === "idle") {
      setPhase("open");
    } else {
      startClose("idle");
    }
  };

  const share = (target: string) => {
    if (locked || phase !== "open") return;
    lock();
    onShare?.(target);
    startClose("done");
  };

  const closing = phase === "closing";

  return (
    <div className="flex items-center justify-center">
      {/* One surface — layout-animated shell */}
      <motion.div
        layout
        transition={spring.morph}
        style={{ borderRadius: 16 }}
        className="relative flex items-center bg-neutral-900 border select-none"
        animate={{
          borderColor:
            phase === "done"
              ? "rgba(52, 211, 153, 0.2)"
              : "rgba(255, 255, 255, 0.08)",
          boxShadow:
            phase === "done"
              ? "inset 0 1px 0 rgba(52,211,153,0.06), 0 1px 3px rgba(0,0,0,0.4), 0 4px 14px rgba(0,0,0,0.2), 0 0 20px rgba(52,211,153,0.04)"
              : "inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 3px rgba(0,0,0,0.4), 0 4px 14px rgba(0,0,0,0.2)",
        }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setGlowX(e.clientX - r.left);
          if (!glowOn) setGlowOn(true);
        }}
        onMouseLeave={() => setGlowOn(false)}
      >
        {/* ── Cursor glow — light-under-glass ── */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            borderRadius: 16,
            opacity: glowOn ? 1 : 0,
            transition: "opacity 0.3s ease",
            background: `radial-gradient(100px circle at ${glowX}px 50%, rgba(255,255,255,0.05), transparent)`,
          }}
        />

        <AnimatePresence mode="popLayout" initial={false}>
          {/* ── IDLE ── */}
          {phase === "idle" && (
            <motion.button
              key="idle"
              onClick={toggle}
              disabled={locked}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              className="relative z-10 flex items-center gap-2.5 px-5 h-11 text-[14px] font-medium text-white outline-none cursor-pointer disabled:cursor-default"
              initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
              transition={{
                ...spring.content,
                filter: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <span className="tracking-[-0.01em]">Share</span>
              <ArrowIcon />
            </motion.button>
          )}

          {/* ── OPEN + CLOSING (same key — icons animate within, no AnimatePresence swap) ── */}
          {(phase === "open" || closing) && (
            <motion.div
              key="open"
              className="relative z-10 flex items-center h-11"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
            >
              {/* Share anchor — dimmed, acts as close */}
              <motion.button
                onClick={!closing ? toggle : undefined}
                whileTap={!closing ? { scale: 0.96 } : undefined}
                animate={{ opacity: closing ? 0 : 0.45 }}
                transition={spring.content}
                className="px-4 text-[14px] font-medium tracking-[-0.01em] text-white outline-none cursor-pointer"
                style={{ pointerEvents: closing ? "none" : "auto" }}
              >
                Share
              </motion.button>

              {/* Divider */}
              <motion.div
                className="w-px h-5 bg-white/[0.08] shrink-0"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: closing ? 0 : 1,
                  opacity: closing ? 0 : 1,
                }}
                transition={{ ...spring.content, delay: closing ? 0 : 0.02 }}
              />

              {/* Target icons — forward stagger in, REVERSE stagger out */}
              {TARGETS.map((target, i) => {
                const reverseI = TARGETS.length - 1 - i;
                return (
                  <motion.button
                    key={target.id}
                    onClick={() => share(target.id)}
                    whileHover={!closing ? { scale: 1.12 } : undefined}
                    whileTap={!closing ? { scale: 0.88 } : undefined}
                    initial={{ opacity: 0, scale: 0.4, filter: "blur(4px)" }}
                    animate={{
                      opacity: closing ? 0 : 1,
                      scale: closing ? 0.4 : 1,
                      filter: closing ? "blur(4px)" : "blur(0px)",
                    }}
                    transition={{
                      ...spring.icon,
                      delay: closing ? reverseI * 0.04 : 0.04 + i * 0.05,
                      filter: {
                        duration: 0.2,
                        delay: closing ? reverseI * 0.04 : 0.04 + i * 0.05,
                      },
                    }}
                    className="flex items-center justify-center w-9 h-9 mx-0.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 outline-none cursor-pointer"
                    aria-label={target.label}
                    style={{ pointerEvents: closing ? "none" : "auto" }}
                  >
                    {target.id === "link" && <LinkIcon />}
                    {target.id === "email" && <EmailIcon />}
                    {target.id === "x" && <XIcon />}
                  </motion.button>
                );
              })}

              <div className="w-1.5 shrink-0" />
            </motion.div>
          )}

          {/* ── DONE — checkmark draws on ── */}
          {phase === "done" && (
            <motion.div
              key="done"
              className="relative z-10 flex items-center gap-2.5 px-5 h-11 text-[14px] font-medium"
              initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
              transition={{
                ...spring.content,
                filter: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <span className="text-emerald-300/90 tracking-[-0.01em]">
                Copied
              </span>
              <CheckIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ── Icons ── */

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-400"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-emerald-400"
    >
      <motion.path
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: {
            type: "spring",
            stiffness: 280,
            damping: 18,
            delay: 0.15,
          },
          opacity: { duration: 0.15, delay: 0.15 },
        }}
      />
    </motion.svg>
  );
}

export default ShareButton;
