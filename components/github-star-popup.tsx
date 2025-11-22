"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star, X } from "lucide-react";

const GITHUB_URL = "https://github.com/ruixenui/ruixen.com";
const DISMISS_COOKIE = "github_star_nw_popup_dismissed";
const DISMISS_DAYS = 30;
const DELAY_MS = 120_000; // 60 seconds

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

  // if (!mounted) return null;

  // Render at the end of <body> - floating without blocking content
  return (
    <div
      className="fixed bottom-4 right-4 z-[2147483647] pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto animate-in slide-in-from-bottom-5 fade-in duration-700 ease-out">
        <div className="relative group">
          {/* Water glass effect - frosted glass with liquid shimmer */}
          <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-xl blur-md opacity-70 group-hover:opacity-90 transition-all duration-500" />
          <div className="absolute -inset-0.5 bg-gradient-to-tr from-background/40 via-background/20 to-transparent rounded-xl blur-sm" />

          <div className="relative w-[220px] rounded-xl border border-blue-600 bg-background/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Liquid wave animation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent animate-pulse"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent animate-pulse"
                style={{ animationDuration: "4s", animationDelay: "1s" }}
              />
            </div>

            <div className="relative p-3">
              {/* <button
                onClick={dismiss}
                className="absolute top-1.5 right-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50 p-0.5"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </button> */}

              <div className="flex flex-col space-y-2">
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Star us & join{" "}
                  <a
                    href="/supporters"
                    className="text-blue-600 underline font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    supporters page
                  </a>
                </p>

                <Button
                  onClick={handleStar}
                  size="sm"
                  className={cn(
                    "h-7 w-full rounded-md font-medium text-[11px]",
                    "bg-gradient-to-r from-primary to-primary/80",
                    "hover:from-primary/90 hover:to-primary/70",
                    "shadow-md hover:shadow-lg hover:scale-[1.02]",
                    "transition-all duration-300",
                  )}
                >
                  <Star className="h-3 w-3 mr-1 fill-current text-yellow-400 animate-bounce duration-200 [animation-iteration-count:3]" />
                  Star on GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
