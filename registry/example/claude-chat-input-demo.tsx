"use client";

import ClaudeChatInput from "@/registry/ruixenui/claude-chat-input";

export default function ClaudeChatInputDemo() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F5F0EA] px-4 py-14 dark:bg-[#2A2520]">
      <ClaudeChatInput
        greeting="Good evening, Ruixen"
        onSubmit={(data) => console.log("submitted:", data)}
      />
    </div>
  );
}
