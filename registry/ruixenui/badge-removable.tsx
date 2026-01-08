"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeRemovableProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  onRemove?: () => void;
  className?: string;
}

export default function BadgeRemovable({
  children = "Badge",
  variant = "secondary",
  onRemove,
  className,
}: BadgeRemovableProps) {
  return (
    <Badge variant={variant} className={cn("gap-1 pr-1", className)}>
      {children}
      <button
        type="button"
        onClick={onRemove}
        className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
        aria-label="Remove"
      >
        <X className="size-3" />
      </button>
    </Badge>
  );
}

export { BadgeRemovable, type BadgeRemovableProps };
