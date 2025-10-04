"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * ConfirmationButton
 *
 * A button that requires confirmation before performing an action.
 * First click changes text to "Are you sure?" and shows ✅ / ❌ choices.
 * Prevents accidental actions like "Delete".
 */

interface ConfirmationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  confirmLabel?: string;
  onConfirm: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  label,
  confirmLabel = "Are you sure?",
  onConfirm,
  size = "md",
  className,
  ...props
}) => {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000); // reset after 3s
    } else {
      onConfirm();
      setConfirming(false);
    }
  };

  return (
    <div className="inline-flex gap-2">
      {!confirming ? (
        <Button
          className={cn(sizeConfig[size], className)}
          onClick={handleClick}
          {...props}
        >
          {label}
        </Button>
      ) : (
        <>
          <Button
            className={cn(sizeConfig[size], className, "bg-red-600 text-white")}
            onClick={handleClick}
          >
            ✅ {confirmLabel}
          </Button>
          <Button
            className={cn(
              sizeConfig[size],
              className,
              "bg-gray-300 text-black",
            )}
            onClick={() => setConfirming(false)}
          >
            ❌
          </Button>
        </>
      )}
    </div>
  );
};

export default ConfirmationButton;
