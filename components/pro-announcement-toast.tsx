"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export function ProAnnouncementToast() {
  useEffect(() => {
    const hasSeenToast = sessionStorage.getItem("ruixen-pro-toast-seen");

    if (!hasSeenToast) {
      const timer = setTimeout(() => {
        toast("Ruixen Pro is now live!", {
          description: "50+ premium components, templates & blocks. Get lifetime access.",
          duration: 6000,
          icon: <Sparkles className="h-5 w-5 text-blue-500" />,
          position: "top-right",
          action: {
            label: "Explore Pro",
            onClick: () => window.open("https://pro.ruixen.com", "_blank"),
          },
        });
        sessionStorage.setItem("ruixen-pro-toast-seen", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
