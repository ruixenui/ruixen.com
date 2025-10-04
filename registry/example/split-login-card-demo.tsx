"use client";

import * as React from "react";
import SplitLoginCard from "@/registry/ruixenui/split-login-card";

export default function DemoLoginPage() {
  const handleInputChange = (values: Record<string, string>) => {
    console.log("Input values changed:", values);
  };

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Form submitted with values:", values);
    alert(`Form submitted! Check console for values.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <SplitLoginCard
        title="Welcome Back!"
        description="Sign in to your account to access your dashboard."
        imageSrc="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png"
        buttonLabel="Sign In"
        inputs={[
          {
            id: "email",
            type: "email",
            label: "Email",
            placeholder: "you@example.com",
          },
          {
            id: "password",
            type: "password",
            label: "Password",
            placeholder: "********",
          },
          {
            id: "otp",
            type: "text",
            label: "OTP",
            placeholder: "Enter OTP (optional)",
          },
        ]}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
