"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

type CheckboxColor =
  | "default"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "pink";

interface CheckboxColoredProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  color?: CheckboxColor;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const colorStyles: Record<
  CheckboxColor,
  { checked: string; hover: string; ring: string }
> = {
  default: {
    checked:
      "border-neutral-900 bg-neutral-900 dark:border-neutral-100 dark:bg-neutral-100",
    hover: "group-hover:border-neutral-400 dark:group-hover:border-neutral-500",
    ring: "peer-focus-visible:ring-neutral-900/20 dark:peer-focus-visible:ring-neutral-100/20",
  },
  blue: {
    checked:
      "border-blue-600 bg-blue-600 dark:border-blue-400 dark:bg-blue-400",
    hover: "group-hover:border-blue-300 dark:group-hover:border-blue-600",
    ring: "peer-focus-visible:ring-blue-600/20 dark:peer-focus-visible:ring-blue-400/20",
  },
  green: {
    checked:
      "border-emerald-600 bg-emerald-600 dark:border-emerald-400 dark:bg-emerald-400",
    hover: "group-hover:border-emerald-300 dark:group-hover:border-emerald-600",
    ring: "peer-focus-visible:ring-emerald-600/20 dark:peer-focus-visible:ring-emerald-400/20",
  },
  red: {
    checked: "border-red-600 bg-red-600 dark:border-red-400 dark:bg-red-400",
    hover: "group-hover:border-red-300 dark:group-hover:border-red-600",
    ring: "peer-focus-visible:ring-red-600/20 dark:peer-focus-visible:ring-red-400/20",
  },
  yellow: {
    checked:
      "border-amber-500 bg-amber-500 dark:border-amber-400 dark:bg-amber-400",
    hover: "group-hover:border-amber-300 dark:group-hover:border-amber-600",
    ring: "peer-focus-visible:ring-amber-500/20 dark:peer-focus-visible:ring-amber-400/20",
  },
  purple: {
    checked:
      "border-violet-600 bg-violet-600 dark:border-violet-400 dark:bg-violet-400",
    hover: "group-hover:border-violet-300 dark:group-hover:border-violet-600",
    ring: "peer-focus-visible:ring-violet-600/20 dark:peer-focus-visible:ring-violet-400/20",
  },
  pink: {
    checked:
      "border-pink-600 bg-pink-600 dark:border-pink-400 dark:bg-pink-400",
    hover: "group-hover:border-pink-300 dark:group-hover:border-pink-600",
    ring: "peer-focus-visible:ring-pink-600/20 dark:peer-focus-visible:ring-pink-400/20",
  },
};

export function CheckboxColored({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  color = "default",
  disabled = false,
  id,
  className,
}: CheckboxColoredProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const inputId = id || React.useId();
  const styles = colorStyles[color];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onCheckedChange?.(newChecked);
  };

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex cursor-pointer items-center gap-3",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={inputId}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="peer sr-only"
        />
        <motion.div
          className={cn(
            "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150",
            isChecked
              ? cn(
                  styles.checked,
                  color === "yellow"
                    ? "text-neutral-950 dark:text-neutral-950"
                    : "text-white dark:text-neutral-950",
                )
              : "border-neutral-300 bg-transparent dark:border-neutral-700",
            !disabled && !isChecked && styles.hover,
            "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-neutral-950",
            styles.ring,
          )}
          whileTap={disabled ? undefined : { scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <AnimatePresence initial={false}>
            {isChecked && (
              <motion.svg
                key="check"
                viewBox="0 0 12 12"
                className="h-3 w-3"
                fill="none"
              >
                <motion.path
                  d="M2.5 6.5L5 9L9.5 3.5"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ pathLength: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {label && (
        <span className="text-[14px] font-medium leading-none tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">
          {label}
        </span>
      )}
    </label>
  );
}
