"use client";

import { useState } from "react";
import AnimatedAlert from "@/registry/ruixenui/animated-alert";

export default function AnimatedAlertDemo() {
  const [showSuccess, setShowSuccess] = useState(true);
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-3">
        <AnimatedAlert
          variant="success"
          title="Changes saved"
          description="Your preferences have been updated successfully."
          show={showSuccess}
          onDismiss={() => setShowSuccess(false)}
          autoDismiss={6000}
        />
        <AnimatedAlert
          variant="warning"
          title="Session expiring"
          description="Your session will expire in 5 minutes. Save your work."
          show={showWarning}
          onDismiss={() => setShowWarning(false)}
          actions={
            <button className="text-xs font-medium text-card-foreground underline underline-offset-2 hover:no-underline">
              Extend session
            </button>
          }
        />
        {(!showSuccess || !showWarning) && (
          <button
            onClick={() => {
              setShowSuccess(true);
              setShowWarning(true);
            }}
            className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Reset alerts
          </button>
        )}
      </div>
    </div>
  );
}
