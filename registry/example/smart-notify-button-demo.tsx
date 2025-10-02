"use client";

import SmartNotifyButton from "@/registry/ruixenui/smart-notify-button";

export default function DemoOne() {
  const handleUndo = () => {
    console.log("Undo clicked");
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 gap-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Smart Notify Button Demo
      </h1>

      <div className="flex flex-col gap-6">
        {/* Basic notification */}
        <SmartNotifyButton />

        {/* Success notification with action */}
        <SmartNotifyButton
          label="Save Changes"
          message="Data saved successfully!"
          description="Your changes have been stored."
          type="success"
          actionLabel="Undo"
          actionCallback={handleUndo}
          position="bottom-left"
        />

        {/* Error notification */}
        <SmartNotifyButton
          label="Delete Item"
          message="Item could not be deleted"
          type="error"
          variant="outline"
        />
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-md">
        Click the buttons to see different types of toast notifications with
        customizable actions and positioning.
      </p>
    </div>
  );
}
