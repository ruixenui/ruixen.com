import AiChatInput from "@/registry/ruixenui/ai-chat-input";

export default function AiChatInputDemo() {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center px-4">
      <AiChatInput
        placeholders={[
          "Ask me anything...",
          "Describe what you need built",
          "Write a function that...",
          "Explain how this works",
          "Debug this error message",
        ]}
        onSubmit={(val) => console.log("submitted:", val)}
      />
    </div>
  );
}
