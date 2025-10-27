"use client";

import { useState } from "react";
import { CopyIcon, Trash2Icon } from "lucide-react";
import ActionHubInput from "@/registry/ruixenui/action-hub-input";
import { Button } from "@/components/ui/button";

export default function ActionHubDemo() {
  const [currentValue, setCurrentValue] = useState("");

  // Simple validation: require at least 3 characters
  const validateInput = (value: string) => {
    if (!value) return "Input is required";
    if (value.length < 3) return "Minimum 3 characters required";
    return null;
  };

  // Define custom actions
  const actions = [
    {
      icon: <CopyIcon size={16} />,
      tooltip: "Copy to clipboard",
      onClick: async (value: string) => {
        await navigator.clipboard.writeText(value);
        alert("Copied to clipboard!");
      },
      showOnEmpty: false,
    },
    {
      icon: <Trash2Icon size={16} />,
      tooltip: "Clear input",
      onClick: async (_value: string) => setCurrentValue(""),
      showOnEmpty: true,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12 gap-6 space-y-8">
      <h1 className="text-2xl font-bold">ActionHubInput Demo</h1>

      <ActionHubInput
        label="Command Input"
        placeholder="Type something..."
        defaultValue={currentValue}
        validate={validateInput}
        actions={actions}
        historyEnabled={true}
      />

      <div className="w-full max-w-lg p-4 rounded-xl border">
        <h2 className="text-lg font-medium mb-2">Current Value:</h2>
        <p className="text-sm text-muted-foreground">{currentValue || "—"}</p>
      </div>

      <Button
        onClick={() => alert("You can integrate more actions here!")}
        className="mt-4"
      >
        Demo Button
      </Button>
    </div>
  );
}
