"use client";

import BadgeCounter from "@/registry/ruixenui/badge-counter";

export default function BadgeCounterDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <BadgeCounter count={3} size="sm" />
        <BadgeCounter count={12} size="md" />
        <BadgeCounter count={99} size="lg" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <BadgeCounter count={5} variant="default" />
        <BadgeCounter count={8} variant="secondary" />
        <BadgeCounter count={3} variant="success" />
        <BadgeCounter count={2} variant="destructive" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <BadgeCounter count={150} max={99} />
        <BadgeCounter count={1000} max={999} />
      </div>
    </div>
  );
}
