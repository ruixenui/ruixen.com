"use client";

import AvatarHoverCard from "@/registry/ruixenui/avatar-hover-card";
import { Button } from "@/components/ui/button";

export default function AvatarHoverCardDemo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center gap-10 p-8">
      <AvatarHoverCard
        imageSrc="/avatar-images/avatar-01.jpg"
        name="Jane Smith"
        username="janesmith"
        description="Design engineer building open-source components for the modern web."
        stats={[
          { label: "Following", value: "142" },
          { label: "Followers", value: "28.5k" },
        ]}
        actions={
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 flex-1 text-xs">
              Message
            </Button>
            <Button size="sm" className="h-8 flex-1 text-xs">
              Follow
            </Button>
          </div>
        }
        size="lg"
      />
      <AvatarHoverCard
        imageSrc="/avatar-images/avatar-02.jpg"
        name="Liam Patel"
        username="liampatel"
        description="VP of Product at Acme. Helping developers build a faster web."
        stats={[
          { label: "Following", value: "89" },
          { label: "Followers", value: "12.1k" },
        ]}
      />
      <AvatarHoverCard
        imageSrc="/avatar-images/avatar-03.jpg"
        name="Alex Chen"
        username="alexchen"
        description="CEO at Acme."
        size="sm"
        align="end"
      />
    </div>
  );
}
