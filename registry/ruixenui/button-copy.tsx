"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

export interface ButtonCopyProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  value: string;
  variant?: "default" | "outline" | "ghost";
  showText?: boolean;
  copyText?: string;
  copiedText?: string;
}

const variantStyles = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  outline:
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

export function ButtonCopy({
  value,
  variant = "outline",
  showText = true,
  copyText = "Copy",
  copiedText = "Copied!",
  className,
  ...props
}: ButtonCopyProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        showText ? "h-9 px-3" : "h-9 w-9",
        copied && "text-emerald-600",
        className,
      )}
      onClick={handleCopy}
      {...props}
    >
      {copied ? (
        <>
          <Check className="size-4" />
          {showText && <span>{copiedText}</span>}
        </>
      ) : (
        <>
          <Copy className="size-4" />
          {showText && <span>{copyText}</span>}
        </>
      )}
    </button>
  );
}
