"use client";

import BannerAnnouncement from "@/registry/ruixenui/banner-announcement";
import { Sparkles, Megaphone, Zap } from "lucide-react";

export default function BannerAnnouncementDemo() {
  return (
    <div className="flex min-h-[400px] w-full flex-col gap-4 p-4">
      <BannerAnnouncement
        variant="default"
        icon={<Sparkles className="size-4" />}
        actionLabel="Learn more"
        actionHref="#"
      >
        Introducing our new feature: Real-time collaboration is now available!
      </BannerAnnouncement>

      <BannerAnnouncement
        variant="gradient"
        icon={<Megaphone className="size-4" />}
        actionLabel="Try it now"
        actionHref="#"
      >
        Big announcement: We just launched v2.0 with amazing new features.
      </BannerAnnouncement>

      <BannerAnnouncement
        variant="minimal"
        icon={<Zap className="size-4" />}
        actionLabel="Upgrade"
        actionHref="#"
      >
        Your trial ends in 3 days. Upgrade to continue using all features.
      </BannerAnnouncement>

      <BannerAnnouncement
        variant="accent"
        actionLabel="Get started"
        actionHref="#"
      >
        New: AI-powered suggestions are now available in your dashboard.
      </BannerAnnouncement>
    </div>
  );
}
