"use client";

import { CheckboxSimple } from "@/registry/ruixenui/checkbox-simple";

export default function CheckboxSimpleDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <div className="flex flex-col gap-4">
        <CheckboxSimple label="Accept notifications" />
        <CheckboxSimple
          label="Subscribe to newsletter"
          description="Get updates about new features and releases"
        />
        <CheckboxSimple label="Disabled option" disabled />
        <CheckboxSimple label="Checked by default" defaultChecked />
      </div>
    </div>
  );
}
