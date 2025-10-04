import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DownloadCloud, Loader2, Check } from "lucide-react";

/**
 * IconLabelSubtextButton
 *
 * A compact, accessible, and highly re-usable button for actions that
 * need an icon, a strong primary label and a smaller contextual subtext.
 * Built with shadcn/ui primitives and Tailwind. Includes built-in
 * loading & success states, an optional badge, and an optional tooltip.
 */

type Variant = "default" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface IconLabelSubtextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode; // preferred: lucide-react icon
  label: string;
  subtext?: string;
  badge?: string | number; // small badge shown top-right
  tooltip?: string; // optional tooltip content
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  success?: boolean; // briefly show success icon instead of provided icon
}

function sizeClasses(size: Size) {
  switch (size) {
    case "sm":
      return {
        padding: "px-3 py-2",
        icon: "w-4 h-4",
        label: "text-sm",
        subtext: "text-xs",
      };
    case "lg":
      return {
        padding: "px-5 py-3",
        icon: "w-6 h-6",
        label: "text-base",
        subtext: "text-sm",
      };
    case "md":
    default:
      return {
        padding: "px-4 py-2.5",
        icon: "w-5 h-5",
        label: "text-sm font-medium",
        subtext: "text-xs",
      };
  }
}

function variantClasses(variant: Variant) {
  switch (variant) {
    case "ghost":
      return "bg-transparent hover:bg-muted/50 border-transparent";
    case "outline":
      return "bg-transparent border border-border hover:bg-muted";
    case "default":
    default:
      return "bg-primary text-primary-foreground hover:bg-primary/90";
  }
}

const IconLabelSubtextButton: React.FC<IconLabelSubtextButtonProps> = ({
  icon,
  label,
  subtext,
  badge,
  tooltip,
  variant = "default",
  size = "md",
  loading = false,
  success = false,
  className,
  disabled,
  ...props
}) => {
  const s = sizeClasses(size);
  const v = variantClasses(variant);

  const inner = (
    <button
      type="button"
      className={cn(
        "relative inline-flex items-center gap-3 rounded-2xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring",
        s.padding,
        v,
        className,
        disabled && "opacity-60 cursor-not-allowed",
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Icon */}
      <span
        className={cn("flex items-center justify-center rounded-md", s.icon)}
        aria-hidden
      >
        {loading ? (
          <Loader2 className={cn(s.icon, "animate-spin")} />
        ) : success ? (
          <Check className={cn(s.icon)} />
        ) : (
          (icon ?? <DownloadCloud className={cn(s.icon)} />)
        )}
      </span>

      {/* Text column */}
      <span className="flex flex-col items-start leading-none">
        <span className={cn(s.label)}>{label}</span>
        {subtext ? (
          <span className={cn("text-muted-foreground", s.subtext)}>
            {subtext}
          </span>
        ) : null}
      </span>

      {/* Optional small badge */}
      {badge !== undefined ? (
        <span className="absolute -top-2 -right-2">
          <Badge className="p-1 min-w-[1.25rem] h-5 text-[0.65rem]">
            {badge}
          </Badge>
        </span>
      ) : null}
    </button>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{inner}</TooltipTrigger>
          <TooltipContent side="top">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return inner;
};

export default IconLabelSubtextButton;
