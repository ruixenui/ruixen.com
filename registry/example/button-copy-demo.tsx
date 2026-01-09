"use client";

import ButtonCopy from "@/registry/ruixenui/button-copy";

export default function ButtonCopyDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonCopy value="npm install ruixen-ui" />
      <ButtonCopy value="Hello World!" variant="outline" />
      <ButtonCopy value="secret-api-key-12345" variant="ghost" />
    </div>
  );
}
