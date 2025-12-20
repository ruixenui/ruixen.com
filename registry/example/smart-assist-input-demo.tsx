"use client";

import { useState } from "react";
import SmartAssistInput from "@/registry/ruixenui/smart-assist-input";

export default function SmartAssistDemo() {
  const [email, setEmail] = useState("");

  // simple validation for email
  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? null : "Invalid email address";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12 gap-6 space-y-8">
      <h1 className="text-2xl font-bold">Smart Assist Input Demo</h1>

      <SmartAssistInput
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        rememberHistory={true}
        validate={validateEmail}
      />

      <div className="w-full max-w-md p-4 rounded-xl border bg-white dark:bg-black shadow-md">
        <h2 className="text-lg font-medium mb-2">Current Value:</h2>
        <p className="text-sm text-muted-foreground">{email || "—"}</p>
      </div>
    </div>
  );
}
