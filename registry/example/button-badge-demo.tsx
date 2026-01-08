"use client";

import ButtonBadge from "@/registry/ruixenui/button-badge";
import { Bell, Mail, ShoppingCart } from "lucide-react";

export default function ButtonBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonBadge badge={3} icon={<Bell className="size-4" />}>
        Notifications
      </ButtonBadge>
      <ButtonBadge
        badge={12}
        variant="outline"
        icon={<Mail className="size-4" />}
      >
        Messages
      </ButtonBadge>
      <ButtonBadge
        badge={99}
        variant="secondary"
        icon={<ShoppingCart className="size-4" />}
      >
        Cart
      </ButtonBadge>
      <ButtonBadge badge="New" badgeVariant="success">
        Features
      </ButtonBadge>
    </div>
  );
}
