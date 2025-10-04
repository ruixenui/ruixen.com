import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SplitActionButton
 *
 * A button that combines a primary action and a secondary dropdown.
 * Left side triggers main action.
 * Right side opens a dropdown with additional options.
 * Useful for actions like "Save" + "Save As..." or "Export" + formats.
 */

interface SplitActionButtonProps {
  mainLabel: string;
  mainAction: () => void;
  secondaryActions: { label: string; onClick: () => void }[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const SplitActionButton: React.FC<SplitActionButtonProps> = ({
  mainLabel,
  mainAction,
  secondaryActions,
  size = "md",
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex rounded-lg overflow-hidden border border-border",
        className,
      )}
    >
      {/* Main action button */}
      <Button
        variant="default"
        className={cn("rounded-none rounded-l-lg", sizeClasses[size])}
        onClick={mainAction}
      >
        {mainLabel}
      </Button>

      {/* Dropdown trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className={cn("rounded-none rounded-r-lg", sizeClasses[size])}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {secondaryActions.map((action, index) => (
            <DropdownMenuItem key={index} onClick={action.onClick}>
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SplitActionButton;
