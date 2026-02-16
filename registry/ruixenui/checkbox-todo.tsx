"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface CheckboxTodoProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
  animated?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function CheckboxTodo({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  animated = true,
  disabled = false,
  id,
  className,
}: CheckboxTodoProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const inputId = id || React.useId();

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
        "group inline-flex cursor-pointer items-center gap-3 py-0.5",
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
            "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-colors duration-150",
            isChecked
              ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
              : "border-neutral-300 bg-transparent dark:border-neutral-700",
            !disabled &&
              !isChecked &&
              "group-hover:border-neutral-400 dark:group-hover:border-neutral-500",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900/20 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-neutral-100/20 dark:peer-focus-visible:ring-offset-neutral-950",
          )}
          whileTap={disabled ? undefined : { scale: 0.88 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <AnimatePresence initial={false}>
            {isChecked && (
              <motion.svg
                key="check"
                viewBox="0 0 12 12"
                className="h-2.5 w-2.5"
                fill="none"
              >
                <motion.path
                  d="M2.5 6.5L5 9L9.5 3.5"
                  stroke="currentColor"
                  strokeWidth={2.5}
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
      <span className="relative">
        <span
          className={cn(
            "text-[14px] tracking-[-0.01em] transition-colors duration-200",
            isChecked
              ? "text-neutral-400 dark:text-neutral-600"
              : "text-neutral-900 dark:text-neutral-100",
          )}
        >
          {label}
        </span>
        {animated && (
          <motion.span
            className="absolute left-0 top-1/2 h-px w-full origin-left bg-neutral-400 dark:bg-neutral-600"
            initial={false}
            animate={{ scaleX: isChecked ? 1 : 0 }}
            transition={{
              duration: 0.25,
              ease: [0.2, 0.8, 0.2, 1],
              delay: isChecked ? 0.1 : 0,
            }}
          />
        )}
      </span>
    </label>
  );
}
