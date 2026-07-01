"use client";

import GradientChatInput from "@/registry/ruixenui/gradient-chat-input";

export default function GradientChatInputDemo() {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-muted p-8">
      <GradientChatInput
        placeholder="Send Message"
        autoReply="Got it — looking into that now ✨"
        onSend={(message) => console.log("sent:", message)}
      />
    </div>
  );
}
