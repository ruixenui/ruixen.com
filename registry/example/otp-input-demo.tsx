"use client";

import OTPInput from "../ruixenui/otp-input";
import { useState } from "react";

export default function DemoOTP() {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
        Enter OTP
      </h2>

      <OTPInput length={6} onChange={(val) => setOtp(val)} placeholder="•" />

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Current OTP: <span className="font-mono">{otp}</span>
      </p>
    </div>
  );
}
