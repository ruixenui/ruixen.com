"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCopyCommand, trackComponentCodeCopy } from "@/lib/ga-events";
import { cn } from "@/lib/utils";

interface TrackedCopyButtonProps {
  text: string;
  className?: string;
  componentName?: string;
  componentType?: "component" | "section" | "block" | "template";
  codeType?: "component" | "usage" | "installation";
  language?: string;
  variant?: "default" | "ghost" | "outline";
}

export function TrackedCopyButton({
  text,
  className,
  componentName,
  componentType = "component",
  codeType,
  language = "tsx",
  variant = "ghost",
}: TrackedCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Track the copy event
      if (codeType) {
        // This is code copy
        trackComponentCodeCopy({
          component_name: componentName || "unknown",
          language,
          code_type: codeType,
        });
      } else {
        // This is a command copy
        trackCopyCommand({
          command: text,
          component_name: componentName,
          component_type: componentType,
        });
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={handleCopy}
      className={cn("h-8 w-8", className)}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}
