"use client";

import CommandDeck from "@/registry/ruixenui/command-deck";
import { useState } from "react";
import { toast } from "sonner"; // Optional: if you use Sonner or any toast lib

export default function CommandDeckDemoPage() {
  const [log, setLog] = useState<string>("Right-click the box to see actions");

  const handleAction = (action: string) => {
    setLog(`Action triggered: ${action}`);
    toast?.success?.(`Action: ${action}`); // Optional toast
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Command Deck Demo</h1>

      <CommandDeck
        label="Right-click me to manage project actions"
        onRename={() => handleAction("Rename")}
        onDelete={() => handleAction("Delete")}
        onCopyLink={() => handleAction("Copy Link")}
        onDuplicate={() => handleAction("Duplicate")}
        onShare={() => handleAction("Share")}
        onViewHistory={() => handleAction("View History")}
      />

      <div className="p-4 mt-4 rounded-md border w-[360px] text-center">
        {log}
      </div>
    </div>
  );
}
