"use client";

import ConfirmationButton from "@/registry/ruixenui/confirmation-button";

export default function DemoConfirmationButton() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6">
      <ConfirmationButton label="Delete" onConfirm={() => alert("Deleted!")} />
      <ConfirmationButton
        label="Archive"
        confirmLabel="Really archive?"
        onConfirm={() => alert("Archived!")}
        size="lg"
      />
    </div>
  );
}
