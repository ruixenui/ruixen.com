"use client";

import BadgeIcon from "@/registry/ruixenui/badge-icon";
import { Zap, Star, Check, AlertTriangle, Info } from "lucide-react";

export default function BadgeIconDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <BadgeIcon icon={Zap}>Featured</BadgeIcon>
        <BadgeIcon icon={Star} variant="secondary">
          Popular
        </BadgeIcon>
        <BadgeIcon icon={Check} variant="outline">
          Verified
        </BadgeIcon>
        <BadgeIcon icon={AlertTriangle} variant="destructive">
          Warning
        </BadgeIcon>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <BadgeIcon icon={Info} iconPosition="right">
          Info
        </BadgeIcon>
        <BadgeIcon icon={Star} iconPosition="right" variant="secondary">
          Starred
        </BadgeIcon>
      </div>
    </div>
  );
}
