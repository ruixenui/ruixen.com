"use client";

import { ButtonBadge } from "@/registry/ruixenui/button-badge";

export default function ButtonBadgeDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-6">
      <ButtonBadge badge={3}>Notifications</ButtonBadge>
      <ButtonBadge badge={12}>Messages</ButtonBadge>
      <ButtonBadge badge="New">Features</ButtonBadge>
    </div>
  );
}
