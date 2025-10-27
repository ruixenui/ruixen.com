"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Star, X } from "lucide-react";

const COOKIE_NAME = "github_star_popup_shown";
const COOKIE_DISMISSED = "github_star_popup_dismissed";
const COOKIE_EXPIRY_DAYS = 30; // Don't show again for 30 days
const ENGAGEMENT_TIME = 45000; // 45 seconds
const GITHUB_URL = "https://github.com/ruixenui/ruixen.com";

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function getSessionStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(key);
}

function setSessionStorage(key: string, value: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, value);
}

export default function GitHubStarPopup() {
  const [visible, setVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if already shown or dismissed
    const wasShown = getCookie(COOKIE_NAME);
    const wasDismissed = getCookie(COOKIE_DISMISSED);

    if (wasDismissed === "true") {
      return; // User dismissed it, don't show again
    }

    // Track page views in session
    const pageViews = parseInt(getSessionStorage("page_views") || "0") + 1;
    setSessionStorage("page_views", pageViews.toString());

    // Track engagement time
    let engagementTimer: NodeJS.Timeout;
    let hasShownByTime = false;

    // 1. Show after 45 seconds of engagement
    engagementTimer = setTimeout(() => {
      if (!hasShownByTime && !wasShown) {
        hasShownByTime = true;
        setShouldShow(true);
        setVisible(true);
        setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
      }
    }, ENGAGEMENT_TIME);

    // 2. Show after user interactions (copy, click demo buttons)
    const handleInteraction = (e: Event) => {
      const target = e.target as HTMLElement;

      // Check if user copied code (copy button clicked)
      if (
        target.closest("[data-copy-button]") ||
        target.closest('button[aria-label*="Copy"]') ||
        target.closest(".copy-button")
      ) {
        if (!wasShown && !hasShownByTime) {
          clearTimeout(engagementTimer);
          setShouldShow(true);
          setVisible(true);
          setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
        }
      }

      // Check if user clicked "Try Demo", "Open in Sandbox", etc.
      if (
        target.closest('[href*="sandbox"]') ||
        target.textContent?.includes("Try Demo") ||
        target.textContent?.includes("Open in Sandbox") ||
        target.textContent?.includes("View Demo")
      ) {
        if (!wasShown && !hasShownByTime) {
          clearTimeout(engagementTimer);
          setShouldShow(true);
          setVisible(true);
          setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
        }
      }
    };

    // 3. Show on exit intent
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0 && !wasShown && !hasShownByTime) {
        clearTimeout(engagementTimer);
        setShouldShow(true);
        setVisible(true);
        setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
      }
    };

    // 4. Show after 2nd or 3rd page view
    if ((pageViews === 2 || pageViews === 3) && !wasShown && !hasShownByTime) {
      setShouldShow(true);
      setVisible(true);
      setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
    }

    // Defer event listeners to avoid blocking initial paint (use requestIdleCallback if available)
    const scheduleListeners = window.requestIdleCallback || setTimeout;
    const listenerId = scheduleListeners(() => {
      document.addEventListener("click", handleInteraction);
      document.addEventListener("mouseleave", handleExitIntent);
    });

    return () => {
      clearTimeout(engagementTimer);
      if (typeof listenerId === "number") {
        (window.cancelIdleCallback || clearTimeout)(listenerId);
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("mouseleave", handleExitIntent);
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setCookie(COOKIE_DISMISSED, "true", COOKIE_EXPIRY_DAYS);
  };

  const handleStarClick = () => {
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
    handleDismiss();
  };

  if (!shouldShow || !visible) return null;

  return (
    <div className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-500">
        <Card className="w-[380px] shadow-2xl rounded-3xl border-2 border-primary/20 bg-background/90 backdrop-blur-xl p-0">
          <CardContent className="p-3">
            <div className="flex flex-col space-y-2">
              <div className="flex items-start justify-end">
                <button
                  onClick={handleDismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-md font-semibold text-muted-foreground leading-relaxed -mt-4">
                It takes 1 second to star. It means the world to us 🌎
              </p>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleStarClick}
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
                  onClick={handleDismiss}
                  className="rounded-lg text-muted-foreground hover:text-foreground"
                >
                  Maybe later
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
