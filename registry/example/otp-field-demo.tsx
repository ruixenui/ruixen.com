"use client";

import { useState } from "react";
import OTPField from "@/registry/ruixenui/otp-field";

export default function OTPFieldDemoPage() {
  const [otp, setOtp] = useState("");

  return (
    <main className="flex flex-col items-center justify-center p-12">
      <h1 className="text-2xl font-bold mb-6">OTP Input Demo</h1>

      <div className="w-full max-w-md space-y-6">
        {/* Default OTP input */}
        <OTPField
          label="Enter OTP"
          length={6}
          separator={true}
          onComplete={(val) => setOtp(val)}
        />

        {otp && (
          <p className="text-sm text-gray-700">
            Entered OTP: <span className="font-semibold">{otp}</span>
          </p>
        )}

        {/* Another example with 4 digits */}
        <OTPField
          label="4-Digit Code"
          length={4}
          separator={false}
          onComplete={(val) => console.log("4-digit OTP:", val)}
        />
      </div>
    </main>
  );
}
