import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeButtonComboProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  badge?: string | number;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function BadgeButtonCombo({
  label,
  badge,
  size = "md",
  className,
  ...props
}: BadgeButtonComboProps) {
  return (
    <div className="relative inline-block">
      <Button className={cn(sizeConfig[size], className)} {...props}>
        {label}
      </Button>
      {badge !== undefined && (
        <span className="absolute -top-2 -right-2">
          <Badge className="p-1 min-w-[1.25rem] h-5 text-[0.65rem] flex items-center justify-center">
            {badge}
          </Badge>
        </span>
      )}
    </div>
  );
}
