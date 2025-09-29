"use client";

import { useState } from "react";
import PasswordField from "@/registry/ruixenui/password-field";

export default function PasswordDemoPage() {
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 space-y-8">
      <h1 className="text-2xl font-bold">Password Field Demo</h1>

      <PasswordField
        label="Your Secure Password"
        placeholder="Enter password"
        allowGenerate={true}
        showChecklist={true}
      />

      <div className="w-full max-w-md p-4 rounded-xl border bg-white shadow-md">
        <h2 className="text-lg font-medium mb-2">Current Password Value:</h2>
        <p className="text-sm text-muted-foreground">{password || "—"}</p>
      </div>
    </div>
  );
}
