"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Star, X } from "lucide-react";

const GITHUB_URL = "https://github.com/ruixenui/ruixen.com";
const DISMISS_COOKIE = "github_star_popup_dismissed";
const DISMISS_DAYS = 30;
const DELAY_MS = 60_000; // 60 seconds

function setCookie(name: string, value: string, days: number) {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const secure =
      typeof window !== "undefined" && window.location.protocol === "https:"
        ? ";secure"
        : "";
    document.cookie = `${name}=${encodeURIComponent(
      value,
    )};expires=${expires};path=/;samesite=Lax${secure}`;
  } catch {}
}
function getCookie(name: string): string | null {
  try {
    const prefix = `${name}=`;
    const parts = document.cookie.split("; ");
    for (const part of parts)
      if (part.startsWith(prefix))
        return decodeURIComponent(part.slice(prefix.length));
  } catch {}
  return null;
}

export default function GitHubStarPopup() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Don’t run inside an iframe (only show on the top window)
  useEffect(() => {
    if (typeof window !== "undefined" && window.self !== window.top) return; // in an iframe
    setMounted(true);
  }, []);

  // visible-tab timer with pause/resume
  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const remainingRef = useRef<number>(DELAY_MS);
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (!mounted) return;
    if (getCookie(DISMISS_COOKIE) === "true") return;

    const clearTimer = () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    const show = () => {
      hasShownRef.current = true;
      clearTimer();
      setVisible(true);
    };
    const start = () => {
      if (hasShownRef.current || getCookie(DISMISS_COOKIE) === "true") return;
      if (remainingRef.current <= 0) return show();
      startedAtRef.current = Date.now();
      timerRef.current = window.setTimeout(show, remainingRef.current);
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") {
        if (startedAtRef.current != null) {
          const elapsed = Date.now() - startedAtRef.current;
          remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        }
        clearTimer();
      } else {
        start();
      }
    };

    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mounted]);

  const dismiss = () => {
    setCookie(DISMISS_COOKIE, "true", DISMISS_DAYS);
    setVisible(false);
  };
  const handleStar = () => {
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
    dismiss();
  };

  if (!mounted || !visible) return null;

  // Render at the end of <body> to avoid clipping/stacking issues
  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gh-star-title"
    >
      <div className="fixed bottom-6 right-6 z-[2147483647] animate-in slide-in-from-bottom-5 fade-in duration-500">
        <Card className="w-[380px] shadow-2xl rounded-3xl border-2 border-primary/20 bg-background/90 backdrop-blur-xl p-0">
          <CardContent className="p-3">
            <div className="flex flex-col space-y-2">
              <div className="flex items-start justify-end">
                <button
                  onClick={dismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <h2 id="gh-star-title" className="sr-only">
                Support Ruixen UI on GitHub
              </h2>
              <p className="text-md font-semibold text-muted-foreground leading-relaxed -mt-4">
                It takes 1 second to star. It means the world to us.
              </p>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleStar}
                  className={cn(
                    "flex-1 rounded-lg font-semibold",
                    "bg-[var(--color-sidebar-label)]",
                    "hover:bg-[var(--color-sidebar-label)] w-fit hover:text-white shadow-lg hover:shadow-xl cursor-pointer",
                    "transition-all duration-200",
                  )}
                >
                  <Star className="h-4 w-4 mr-2 fill-white" />
                  Star on GitHub
                </Button>
                <Button
                  variant="ghost"
                  onClick={dismiss}
                  className="rounded-lg text-muted-foreground hover:text-foreground"
                >
                  Maybe later
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>,
    document.body,
  );
}
