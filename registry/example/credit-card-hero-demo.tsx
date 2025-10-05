"use client";

import * as React from "react";
import { CreditCardHero } from "@/registry/ruixenui/credit-card-hero";

export default function CreditCardHeroDemo() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/20 p-8">
      <CreditCardHero
        headline="The Future of Digital Banking"
        subtext="Secure, globally accepted, and packed with exclusive rewards — your new digital credit card is here."
        cta="Apply Now"
        onCtaClick={() => alert("CTA Clicked!")}
        primaryCardImage="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png"
        secondaryCardImage="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_gradient.jpeg"
      />
    </div>
  );
}
