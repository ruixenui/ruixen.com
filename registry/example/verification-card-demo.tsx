"use client";

import * as React from "react";
import { VerificationCard } from "@/registry/ruixenui/verification-card";

export default function IdentityCardDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center bg-muted/30">
      <a
        href="https://www.ruixen.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <VerificationCard
          backgroundImage="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png"
          idNumber="**** **** **** 7421"
          name="RUIXEN UI"
          validThru="07/31"
          label="VERIFICATION CARD"
        />
      </a>
    </div>
  );
}
