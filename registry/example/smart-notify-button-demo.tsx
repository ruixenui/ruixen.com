"use client";

import SmartNotifyButton from "@/registry/ruixenui/smart-notify-button";

export default function SmartNotifyButtonDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-6">
      <SmartNotifyButton
        label="Notify"
        message="Action completed"
        description="Your changes have been saved."
        type="success"
      />
      <SmartNotifyButton
        label="Alert"
        message="Something went wrong"
        type="error"
      />
    </div>
  );
}
