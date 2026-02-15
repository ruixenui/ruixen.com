"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface CheckboxTermsProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  termsText?: string;
  termsLink?: string;
  privacyText?: string;
  privacyLink?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function CheckboxTerms({
  checked,
  defaultChecked = false,
  onCheckedChange,
  termsText = "Terms of Service",
  termsLink = "#",
  privacyText = "Privacy Policy",
  privacyLink = "#",
  required = false,
  disabled = false,
  id,
  className,
}: CheckboxTermsProps) {
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
        "group inline-flex cursor-pointer items-start gap-3",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
    >
      <div className="relative mt-0.5 flex items-center justify-center">
        <input
          type="checkbox"
          id={inputId}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className="peer sr-only"
        />
        <motion.div
          className={cn(
            "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150",
            isChecked
              ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
              : "border-neutral-300 bg-transparent dark:border-neutral-700",
            !disabled &&
              !isChecked &&
              "group-hover:border-neutral-400 dark:group-hover:border-neutral-500",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900/20 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-neutral-100/20 dark:peer-focus-visible:ring-offset-neutral-950",
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
      <span className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
        I agree to the{" "}
        <a
          href={termsLink}
          onClick={(e) => e.stopPropagation()}
          className="text-neutral-900 underline decoration-neutral-300 underline-offset-[3px] transition-colors hover:decoration-neutral-500 dark:text-neutral-100 dark:decoration-neutral-700 dark:hover:decoration-neutral-500"
        >
          {termsText}
        </a>{" "}
        and{" "}
        <a
          href={privacyLink}
          onClick={(e) => e.stopPropagation()}
          className="text-neutral-900 underline decoration-neutral-300 underline-offset-[3px] transition-colors hover:decoration-neutral-500 dark:text-neutral-100 dark:decoration-neutral-700 dark:hover:decoration-neutral-500"
        >
          {privacyText}
        </a>
        {required && (
          <span className="ml-0.5 text-neutral-400 dark:text-neutral-600">
            *
          </span>
        )}
      </span>
    </label>
  );
}
