"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

type CheckedState = boolean | "indeterminate";

interface CheckboxIndeterminateProps {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function CheckboxIndeterminate({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  disabled = false,
  id,
  className,
}: CheckboxIndeterminateProps) {
  const [internalChecked, setInternalChecked] =
    React.useState<CheckedState>(defaultChecked);
  const isControlled = checked !== undefined;
  const currentState = isControlled ? checked : internalChecked;
  const inputId = id || React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = currentState === "indeterminate";
    }
  }, [currentState]);

  const handleChange = () => {
    const newState = currentState === true ? false : true;
    if (!isControlled) {
      setInternalChecked(newState);
    }
    onCheckedChange?.(newState);
  };

  const isChecked = currentState === true;
  const isIndeterminate = currentState === "indeterminate";
  const isFilled = isChecked || isIndeterminate;

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
          ref={inputRef}
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
            isFilled
              ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
              : "border-neutral-300 bg-transparent dark:border-neutral-700",
            !disabled &&
              !isFilled &&
              "group-hover:border-neutral-400 dark:group-hover:border-neutral-500",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900/20 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-neutral-100/20 dark:peer-focus-visible:ring-offset-neutral-950",
          )}
          whileTap={disabled ? undefined : { scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isChecked && (
              <motion.svg
                key="check"
                viewBox="0 0 12 12"
                className="h-3 w-3"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <motion.path
                  d="M2.5 6.5L5 9L9.5 3.5"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </motion.svg>
            )}
            {isIndeterminate && (
              <motion.svg
                key="minus"
                viewBox="0 0 12 12"
                className="h-3 w-3"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <motion.path
                  d="M3 6h6"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
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
