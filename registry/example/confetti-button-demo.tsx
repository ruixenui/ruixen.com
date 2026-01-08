"use client";

import ConfettiButton from "@/registry/ruixenui/confetti-button";

export default function ConfettiButtonDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-4">
      <ConfettiButton label="Level Up!" />
      <ConfettiButton label="Achievement Unlocked" />
      <ConfettiButton label="Submit" />
    </div>
  );
}
