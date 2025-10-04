"use client";

import ConfettiButton from "@/registry/ruixenui/confetti-button";

export default function ConfettiButtonDemo() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <ConfettiButton label="Level Up!" />
      <ConfettiButton label="Achievement Unlocked" />
      <ConfettiButton label="Submit" />
    </div>
  );
}
