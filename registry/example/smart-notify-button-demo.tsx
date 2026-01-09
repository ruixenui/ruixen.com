"use client";

import SmartNotifyButton from "@/registry/ruixenui/smart-notify-button";

export default function DemoOne() {
  const handleUndo = () => {
    console.log("Undo clicked");
  };

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col gap-6">
        <SmartNotifyButton />

        <SmartNotifyButton
          label="Save Changes"
          message="Data saved successfully!"
          description="Your changes have been stored."
          type="success"
          actionLabel="Undo"
          actionCallback={handleUndo}
          position="bottom-left"
        />

        <SmartNotifyButton
          label="Delete Item"
          message="Item could not be deleted"
          type="error"
          variant="outline"
        />
      </div>
    </div>
  );
}
