"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export interface BadgeMorphProps {
  status: Status;
  label?: string;
  className?: string;
}

const LABELS: Record<Status, string> = {
  idle: "Ready",
  loading: "Deploying",
  success: "Live",
  error: "Failed",
};

// Dynamic Island springs — stiffness 400, damping 30 is the golden ratio
const SPRING_PILL = { type: "spring" as const, stiffness: 400, damping: 30 };
const SPRING_CONTENT = { type: "spring" as const, stiffness: 420, damping: 25 };
const SPRING_DRAW = { type: "spring" as const, stiffness: 300, damping: 15 };

// Icon accent colors — only the icon, not the pill surface
const ACCENT: Record<Status, string> = {
  idle: "",
  loading: "",
  success: "text-emerald-400 dark:text-emerald-600",
  error: "text-red-400 dark:text-red-500",
};

// Outer glow per status — radiates from the pill like a backlight
function getGlow(status: Status): string {
  const base = "0 1px 2px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.12)";
  switch (status) {
    case "idle":
      return base;
    case "loading":
      return `${base}, 0 0 24px -6px rgba(96,165,250,0.4)`;
    case "success":
      return `${base}, 0 0 24px -6px rgba(52,211,153,0.5)`;
    case "error":
      return `${base}, 0 0 24px -6px rgba(248,113,113,0.45)`;
  }
}

/* ─── Icons ───────────────────────────────────────────── */

function IdleDot() {
  return (
    <span className="relative flex items-center justify-center size-4">
      <motion.span
        className="absolute size-1.5 rounded-full bg-current opacity-30"
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative size-1.5 rounded-full bg-current opacity-60" />
    </span>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="animate-[badge-morph-spin_0.8s_linear_infinite]"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.12"
      />
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="26 37.7"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <motion.path
        d="M5 8.5L7 10.5L11 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={SPRING_DRAW}
      />
    </svg>
  );
}

function XMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <motion.path
        d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ ...SPRING_DRAW, delay: 0.04 }}
      />
    </svg>
  );
}

const ICONS: Record<Status, () => React.JSX.Element> = {
  idle: IdleDot,
  loading: Spinner,
  success: Check,
  error: XMark,
};

/* ─── Component ───────────────────────────────────────── */

export default function BadgeMorph({
  status,
  label,
  className,
}: BadgeMorphProps) {
  const displayLabel = label ?? LABELS[status];
  const Icon = ICONS[status];

  return (
    <motion.div
      layout
      transition={{
        layout: SPRING_PILL,
        ...(status === "success" && {
          scale: { duration: 0.35, times: [0, 0.35, 1] },
        }),
      }}
      animate={status === "success" ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full",
        "bg-neutral-950 dark:bg-neutral-50",
        "text-neutral-50 dark:text-neutral-950",
        "px-3 py-1.5",
        "text-[13px] font-medium tracking-[-0.01em]",
        "transition-[box-shadow] duration-500 ease-out",
        "select-none",
        className,
      )}
      style={{ boxShadow: getGlow(status) }}
    >
      {/* Status indicator */}
      <div className="relative flex size-4 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            className={cn("flex items-center justify-center", ACCENT[status])}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.08 } }}
            transition={SPRING_CONTENT}
          >
            <Icon />
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`${status}-${displayLabel}`}
          className="whitespace-nowrap leading-none"
          initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -4, transition: { duration: 0.08 } }}
          transition={{
            ...SPRING_CONTENT,
            delay: 0.025,
            filter: { duration: 0.3 },
          }}
        >
          {displayLabel}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

export { BadgeMorph };
