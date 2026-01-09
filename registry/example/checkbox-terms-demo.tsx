"use client";

import * as React from "react";
import CheckboxTerms from "@/registry/ruixenui/checkbox-terms";

export default function CheckboxTermsDemo() {
  const [accepted, setAccepted] = React.useState(false);

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <div className="flex flex-col gap-4">
        <CheckboxTerms
          checked={accepted}
          onCheckedChange={setAccepted}
          termsText="Terms of Service"
          termsLink="#"
          privacyText="Privacy Policy"
          privacyLink="#"
          required
        />
        <button
          disabled={!accepted}
          className="w-fit rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
