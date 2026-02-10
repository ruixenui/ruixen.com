"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Check } from "lucide-react";

export type LoadingButtonState = "idle" | "loading" | "success" | "error";

export interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state?: LoadingButtonState;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  variant?: "primary" | "secondary" | "outline";
}

const variantStyles = {
  primary:
    "bg-primary text-primary-foreground shadow hover:bg-primary/90 disabled:bg-primary/70",
  secondary:
    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  outline:
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
};

const stateStyles: Record<LoadingButtonState, string> = {
  idle: "",
  loading: "cursor-wait",
  success: "bg-emerald-600 hover:bg-emerald-600 text-white",
  error: "bg-destructive hover:bg-destructive text-destructive-foreground",
};

export function ButtonLoading({
  state = "idle",
  loadingText = "Loading...",
  successText = "Success!",
  errorText = "Error",
  variant = "primary",
  disabled,
  className,
  children,
  ...props
}: ButtonLoadingProps) {
  const isDisabled = disabled || state === "loading";

  const renderContent = () => {
    switch (state) {
      case "loading":
        return (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>{loadingText}</span>
          </>
        );
      case "success":
        return (
          <>
            <Check className="size-4" />
            <span>{successText}</span>
          </>
        );
      case "error":
        return <span>{errorText}</span>;
      default:
        return children;
    }
  };

  return (
    <button
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        stateStyles[state],
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {renderContent()}
    </button>
  );
}
