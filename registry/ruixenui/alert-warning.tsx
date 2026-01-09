"use client";

import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertWarningProps {
  title?: string;
  message: string;
  className?: string;
}

export default function AlertWarning({
  title,
  message,
  className,
}: AlertWarningProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg bg-amber-50 px-4 py-3 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
        className,
      )}
    >
      <div className="flex gap-3">
        <TriangleAlert
          className="mt-0.5 shrink-0 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        <div className="flex grow flex-col gap-1">
          {title && <p className="text-sm font-medium">{title}</p>}
          <p className="text-sm opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
}
