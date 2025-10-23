"use client";

import { useState } from "react";
import AiChatInput from "@/registry/ruixenui/ai-chat-input";

export default function AiChatInputDemo() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, message]);
    console.log("Sent message:", message);
  };

  const handleUploadFile = (file: File) => {
    console.log("Uploaded file:", file.name);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6 mx-auto">
      <div className="w-full border p-2">
        <AiChatInput
          onSendMessage={handleSendMessage}
          onUploadFile={handleUploadFile}
          isLoading={false}
        />
      </div>
    </div>
  );
}
