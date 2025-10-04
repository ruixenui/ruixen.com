"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Check } from "lucide-react";

/**
 * ProgressButton
 *
 * A button that shows progress feedback for async actions.
 * After click, it can display a loading spinner or a progress bar.
 * Useful for actions like Submit, Pay, Upload.
 */

interface ProgressButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loadingLabel?: string;
  successLabel?: string;
  showBar?: boolean; // if true, show progress bar instead of spinner
  duration?: number; // fake progress duration in ms when showBar is true
}

const ProgressButton: React.FC<ProgressButtonProps> = ({
  label,
  loadingLabel = "Processing...",
  successLabel = "Done!",
  showBar = false,
  duration = 2000,
  className,
  onClick,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    setLoading(true);
    setSuccess(false);
    setProgress(0);

    if (showBar) {
      let step = 0;
      const interval = setInterval(() => {
        step += 100 / (duration / 100);
        setProgress(Math.min(step, 100));
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1500);
      }, duration);
    } else {
      await new Promise((resolve) => setTimeout(resolve, duration));
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    }

    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 px-4 py-2 disabled:opacity-60",
        className,
      )}
      disabled={loading}
      {...props}
    >
      {showBar && loading ? (
        <div className="absolute bottom-0 left-0 h-1 bg-primary-foreground/50 w-full overflow-hidden rounded-b-lg">
          <div
            className="h-full bg-primary-foreground transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}

      <span className="flex items-center gap-2">
        {loading && !showBar && <Loader2 className="w-4 h-4 animate-spin" />}
        {success && <Check className="w-4 h-4" />}
        {!loading && !success && label}
        {loading && !success && (showBar ? loadingLabel : loadingLabel)}
        {success && successLabel}
      </span>
    </button>
  );
};

export default ProgressButton;
