"use client";

import { RadioGroup, RadioCard } from "@/registry/ruixenui/radio-group-card";
import { Laptop, SunMedium, Moon } from "lucide-react";

function DemoPage() {
  return (
    <div className="max-w-md space-y-6">
      <p className="text-sm text-muted-foreground">
        Select the theme that best matches your environment.
      </p>

      <RadioGroup defaultValue="system">
        <RadioCard
          value="light"
          title="Light Mode"
          description="Bright and clean layout with light backgrounds."
          icon={<SunMedium size={20} />}
        />
        <RadioCard
          value="dark"
          title="Dark Mode"
          description="Dimmed layout that’s easy on the eyes at night."
          icon={<Moon size={20} />}
        />
        <RadioCard
          value="system"
          title="System"
          description="Automatically adapts to your device’s settings."
          icon={<Laptop size={20} />}
        />
      </RadioGroup>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • made by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </div>
  );
}

export default DemoPage;
