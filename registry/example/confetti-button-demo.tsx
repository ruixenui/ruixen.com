"use client";

import ConfettiButton from "@/registry/ruixenui/confetti-button";

export default function ConfettiButtonDemo() {
  return (
    <div className="p-6 flex flex-col justify-center items-center min-h-screen gap-4">
      <ConfettiButton label="Level Up!" />
      <ConfettiButton label="Achievement Unlocked" />
      <ConfettiButton label="Submit" />
    </div>
  );
}
