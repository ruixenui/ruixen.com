"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/events";

/**
 * Announcement toast. Shown once per session, gated to unauthenticated-feel
 * users who have scrolled past the hero. Auto-dismissing popups without
 * behavioral intent are an anti-pattern — we defer until scroll ≥ 40% of
 * viewport height so we only hit users who engaged with the page.
 */
export function ProAnnouncementToast() {
  useEffect(() => {
    const hasSeenToast = sessionStorage.getItem("ruixen-pro-toast-seen");
    if (hasSeenToast) return;

    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      toast("Ruixen Pro is now live!", {
        description:
          "50+ premium components, templates & blocks. Get lifetime access.",
        duration: 6000,
        icon: <Sparkles className="h-5 w-5 text-blue-500" />,
        position: "top-right",
        action: {
          label: "Explore Pro",
          onClick: () => {
            trackEvent({
              name: "oss_pro_cta_clicked",
              properties: { surface: "toast" },
            });
            window.open(
              "https://pro.ruixen.com/pricing?ref=oss_toast",
              "_blank",
            );
          },
        },
      });
      sessionStorage.setItem("ruixen-pro-toast-seen", "true");
      window.removeEventListener("scroll", handleScroll);
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      if (scrolled > vh * 0.4) fire();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
