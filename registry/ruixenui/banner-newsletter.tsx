"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail, Check, Loader2 } from "lucide-react";

type BannerPosition = "bottom" | "top" | "floating";

interface BannerNewsletterProps {
  title?: string;
  description?: string;
  placeholder?: string;
  submitLabel?: string;
  successMessage?: string;
  position?: BannerPosition;
  dismissible?: boolean;
  onSubmit?: (email: string) => Promise<void> | void;
  onDismiss?: () => void;
  className?: string;
}

const positionStyles: Record<BannerPosition, string> = {
  bottom: "fixed inset-x-0 bottom-0 border-t",
  top: "fixed inset-x-0 top-0 border-b",
  floating:
    "fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl rounded-xl border shadow-xl",
};

export default function BannerNewsletter({
  title = "Stay in the loop",
  description = "Get the latest updates delivered to your inbox.",
  placeholder = "Enter your email",
  submitLabel = "Subscribe",
  successMessage = "Thanks for subscribing!",
  position = "bottom",
  dismissible = true,
  onSubmit,
  onDismiss,
  className,
}: BannerNewsletterProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      await onSubmit?.(email);
      setStatus("success");
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } catch {
      setStatus("error");
    }
  };

  if (!isVisible) return null;

  const isFloating = position === "floating";

  return (
    <div
      className={cn(
        "relative z-50 bg-background p-4 md:p-5",
        positionStyles[position],
        className,
      )}
    >
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      )}

      <div
        className={cn(
          "mx-auto flex items-center gap-4",
          isFloating
            ? "flex-col pr-6"
            : "max-w-4xl flex-col md:flex-row md:gap-6",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3",
            isFloating ? "w-full" : "text-center md:text-left",
          )}
        >
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:flex">
            <Mail className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {status === "success" ? (
          <div className="flex shrink-0 items-center gap-2 text-emerald-600">
            <Check className="size-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={cn(
              "flex gap-2",
              isFloating ? "w-full" : "w-full shrink-0 md:w-auto",
            )}
          >
            <Input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0"
            >
              {status === "loading" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                submitLabel
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export { BannerNewsletter, type BannerNewsletterProps };
