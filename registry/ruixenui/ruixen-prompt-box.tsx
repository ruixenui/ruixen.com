"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { Sparkles, BadgeCheck, SendHorizontal } from "lucide-react";

const TRANSFORM_OPTIONS = [
  {
    label: "Summarize",
    icon: Sparkles,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  {
    label: "Correct Grammar",
    icon: BadgeCheck,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    label: "Compress",
    icon: SendHorizontal,
    color: "text-indigo-500",
    bg: "bg-indigo-100",
  },
];

export default function RuixenPromptBox() {
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  const currentOption = TRANSFORM_OPTIONS.find(
    (o) => o.label === selectedOption,
  );

  const handleSend = () => {
    console.log("Submitting:", input, selectedOption);
    setInput("");
    setSelectedOption(null);
    adjustHeight(true);
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-2xl mx-auto space-y-3">
        <div className="relative rounded-xl bg-muted/10 dark:bg-white/5 border border-border p-4 shadow-sm">
          {currentOption && (
            <div
              className={cn(
                "absolute -top-3 left-4 px-2 py-0.5 text-xs font-medium rounded-md",
                currentOption.bg,
                currentOption.color,
                "shadow-sm",
              )}
            >
              <currentOption.icon className="inline-block w-3.5 h-3.5 mr-1" />
              {currentOption.label}
            </div>
          )}

          <Textarea
            ref={textareaRef}
            placeholder="Refine your message..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className={cn(
              "w-full resize-none bg-transparent border-none text-foreground text-sm sm:text-base",
              "focus:outline-none focus-visible:ring-0 placeholder:text-muted-foreground",
              "min-h-[60px] max-h-[200px]",
            )}
          />

          <div className="absolute bottom-3 right-4">
            <button
              onClick={handleSend}
              className={cn(
                "p-2 rounded-full transition-all duration-200",
                input || selectedOption
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed",
              )}
              disabled={!input && !selectedOption}
              type="button"
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Transform Options */}
        <div className="flex flex-wrap gap-2 justify-start">
          {TRANSFORM_OPTIONS.map(({ label, icon: Icon, color }) => {
            const isSelected = label === selectedOption;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setSelectedOption(isSelected ? null : label)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border transition-all",
                  isSelected
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-transparent border-border text-muted-foreground hover:bg-muted/10",
                )}
              >
                <Icon className={cn("w-4 h-4", color)} />
                <span className="whitespace-nowrap">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
