"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export function ProAnnouncementToast() {
  useEffect(() => {
    const hasSeenToast = sessionStorage.getItem("ruixen-pro-toast-seen");

    if (!hasSeenToast) {
      const timer = setTimeout(() => {
        toast("Thank you for your love!", {
          description: "Ruixen Pro is coming very soon. Stay tuned!",
          duration: 5000,
          icon: <Sparkles className="h-5 w-5 text-blue-500" />,
          position: "top-right",
        });
        sessionStorage.setItem("ruixen-pro-toast-seen", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
