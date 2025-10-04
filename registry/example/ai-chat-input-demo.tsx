"use client";

import { useState } from "react";
import AiChatInput from "@/registry/ruixenui/ai-chat-input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    <div className="p-8 space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>AI Chat Input Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Messages:</h4>
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto border rounded p-2 bg-muted/20">
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground">No messages yet</p>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-background/80 border border-border text-sm"
                >
                  {msg}
                </div>
              ))}
            </div>
          </div>

          <AiChatInput
            onSendMessage={handleSendMessage}
            onUploadFile={handleUploadFile}
            isLoading={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
