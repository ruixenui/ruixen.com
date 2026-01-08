"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Cookie, X, Settings } from "lucide-react";

type BannerPosition = "bottom" | "top" | "bottom-left" | "bottom-right";

interface BannerCookieProps {
  title?: string;
  description?: string;
  acceptLabel?: string;
  declineLabel?: string;
  settingsLabel?: string;
  position?: BannerPosition;
  showSettings?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onSettings?: () => void;
  className?: string;
}

const positionStyles: Record<BannerPosition, string> = {
  bottom: "fixed inset-x-0 bottom-0",
  top: "fixed inset-x-0 top-0",
  "bottom-left": "fixed bottom-4 left-4 max-w-md rounded-xl",
  "bottom-right": "fixed bottom-4 right-4 max-w-md rounded-xl",
};

export default function BannerCookie({
  title = "We value your privacy",
  description = "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking 'Accept', you consent to our use of cookies.",
  acceptLabel = "Accept all",
  declineLabel = "Decline",
  settingsLabel = "Preferences",
  position = "bottom",
  showSettings = true,
  onAccept,
  onDecline,
  onSettings,
  className,
}: BannerCookieProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    setIsVisible(false);
    onDecline?.();
  };

  if (!isVisible) return null;

  const isFloating = position === "bottom-left" || position === "bottom-right";

  return (
    <div
      className={cn(
        "z-50 border bg-background p-4 shadow-lg",
        positionStyles[position],
        isFloating ? "border-border" : "border-t",
        className,
      )}
    >
      <div
        className={cn(
          "flex gap-4",
          isFloating ? "flex-col" : "flex-col md:flex-row md:items-center",
        )}
      >
        <div className="flex flex-1 gap-3">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:flex">
            <Cookie className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div
          className={cn(
            "flex shrink-0 gap-2",
            isFloating ? "flex-col" : "flex-row",
          )}
        >
          {showSettings && (
            <Button variant="ghost" size="sm" onClick={onSettings}>
              <Settings className="mr-1.5 size-4" />
              {settingsLabel}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleDecline}>
            {declineLabel}
          </Button>
          <Button size="sm" onClick={handleAccept}>
            {acceptLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { BannerCookie, type BannerCookieProps };
