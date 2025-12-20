"use client";

import ConfirmationButton from "@/registry/ruixenui/confirmation-button";

export default function DemoConfirmationButton() {
  return (
    <div className="flex p-6 flex-col items-center justify-center min-h-screen space-y-6">
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
