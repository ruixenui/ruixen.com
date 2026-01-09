"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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

export default function CheckboxTerms({
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
        disabled && "cursor-not-allowed opacity-50",
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
        <div
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200",
            isChecked
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground/30 bg-background",
            !disabled && !isChecked && "group-hover:border-muted-foreground/50",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
          )}
        >
          {isChecked && <Check className="size-3.5 stroke-[3]" />}
        </div>
      </div>
      <span className="text-sm text-muted-foreground">
        I agree to the{" "}
        <a
          href={termsLink}
          onClick={(e) => e.stopPropagation()}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {termsText}
        </a>{" "}
        and{" "}
        <a
          href={privacyLink}
          onClick={(e) => e.stopPropagation()}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {privacyText}
        </a>
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
    </label>
  );
}

export { CheckboxTerms, type CheckboxTermsProps };
