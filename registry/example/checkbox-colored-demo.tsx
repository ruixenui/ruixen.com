"use client";

import { CheckboxColored } from "@/registry/ruixenui/checkbox-colored";

export default function CheckboxColoredDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <CheckboxColored label="Default" color="default" defaultChecked />
        <CheckboxColored label="Blue" color="blue" defaultChecked />
        <CheckboxColored label="Green" color="green" defaultChecked />
        <CheckboxColored label="Red" color="red" defaultChecked />
        <CheckboxColored label="Yellow" color="yellow" defaultChecked />
        <CheckboxColored label="Purple" color="purple" defaultChecked />
        <CheckboxColored label="Pink" color="pink" defaultChecked />
      </div>
    </div>
  );
}
