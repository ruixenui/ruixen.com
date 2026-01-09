"use client";

import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertSuccessOutlinedProps {
  title?: string;
  message: string;
  className?: string;
}

export default function AlertSuccessOutlined({
  title,
  message,
  className,
}: AlertSuccessOutlinedProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border border-emerald-500/50 px-4 py-3 text-emerald-600 dark:text-emerald-500",
        className,
      )}
    >
      <div className="flex gap-3">
        <CircleCheck
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
