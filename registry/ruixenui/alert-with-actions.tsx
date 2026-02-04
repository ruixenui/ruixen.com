"use client";

import React from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
};

interface AlertWithActionsProps {
  variant?: "info" | "success" | "warning" | "error";
  title: string;
  description?: string;
  actions?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export default function AlertWithActions({
  variant = "info",
  title,
  description,
  actions,
  onDismiss,
  className,
}: AlertWithActionsProps) {
  const Icon = icons[variant];

  return (
    <div
      role="alert"
      className={cn(
        "relative flex w-full gap-3 rounded-lg border border-border/50 bg-card px-4 py-3 text-sm shadow-xs",
        className,
      )}
    >
      <div className="flex shrink-0 items-start pt-0.5">
        <Icon
          className={cn(
            "size-4",
            variant === "info" && "text-muted-foreground",
            variant === "success" && "text-emerald-500 dark:text-emerald-400",
            variant === "warning" && "text-amber-500 dark:text-amber-400",
            variant === "error" && "text-red-500 dark:text-red-400",
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="font-medium leading-snug text-card-foreground">
            {title}
          </p>
          {description && (
            <p className="leading-snug text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-3">{actions}</div>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="-mr-1 -mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="size-3.5" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
