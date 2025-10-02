"use client";

import PasswordStrengthInput from "../ruixenui/password-strength-input";

export default function DemoPasswordInput() {
  return (
    <div className="flex items-center justify-center p-6">
      <PasswordStrengthInput
        minLength={8}
        placeholder="Enter your password"
        onChange={(val) => console.log("Password:", val)}
      />
    </div>
  );
}
