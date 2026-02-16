"use client";

import { useState } from "react";
import { CenteredFeedbackDrawer } from "@/registry/ruixenui/centered-feedback-drawer";

export default function CenteredFeedbackDrawerDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: 340 }}>
      {/* Reopen trigger */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
          transition: "opacity 0.2s",
        }}
      >
        <button
          onClick={() => setOpen(true)}
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            background: "transparent",
            border: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
          }}
        >
          Leave feedback
        </button>
      </div>

      <CenteredFeedbackDrawer
        open={open}
        onOpenChange={setOpen}
        onSubmit={(feedback) => console.log("Feedback:", feedback)}
      />
    </div>
  );
}
