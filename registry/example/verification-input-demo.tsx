"use client";

import { VerificationInput } from "@/registry/ruixenui/verification-input";

export default function VerificationInputDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <VerificationInput
        onComplete={(code) => console.log("Code:", code)}
        onResend={() => console.log("Resend requested")}
      />
    </div>
  );
}
