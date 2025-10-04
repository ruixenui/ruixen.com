import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface TooltipButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  tooltip: string;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function TooltipButton({
  label,
  tooltip,
  size = "md",
  icon,
  className,
  ...props
}: TooltipButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              "flex items-center gap-2",
              sizeConfig[size],
              className,
            )}
            {...props}
          >
            {icon ?? <Info className="w-4 h-4" />}
            {label}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
