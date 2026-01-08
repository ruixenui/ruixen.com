"use client";

import SwipeToConfirmButton from "@/registry/ruixenui/swipe-to-confirm-button";

export default function SwipeToConfirmDemo() {
  const handleConfirm = () => alert("Payment Confirmed!");

  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6">
      <SwipeToConfirmButton onConfirm={handleConfirm} />
      <SwipeToConfirmButton
        label="Swipe to Submit"
        width={350}
        height={60}
        onConfirm={() => console.log("Form Submitted!")}
      />
      <SwipeToConfirmButton
        label="Slide to Unlock"
        width={300}
        height={50}
        onConfirm={() => console.log("Unlocked!")}
      />
    </div>
  );
}
