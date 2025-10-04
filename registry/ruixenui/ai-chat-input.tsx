"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import {
  Paperclip,
  Send,
  StopCircle,
  Smile,
  Trash2,
  Wand2,
  Languages,
  BookOpen,
} from "lucide-react";

const COMMANDS = [
  {
    id: "summarize",
    label: "Summarize",
    icon: <Wand2 className="h-3.5 w-3.5" />,
  },
  {
    id: "translate",
    label: "Translate",
    icon: <Languages className="h-3.5 w-3.5" />,
  },
  {
    id: "explain",
    label: "Explain",
    icon: <BookOpen className="h-3.5 w-3.5" />,
  },
];

const EMOJIS = ["😀", "🚀", "🔥", "✨", "❤️", "👍", "🤔", "🎉"];

export default function AiChatInput({
  onSendMessage,
  onUploadFile,
  isLoading = false,
}: {
  onSendMessage: (message: string) => void;
  onUploadFile?: (file: File) => void;
  isLoading?: boolean;
}) {
  const [input, setInput] = useState("");
  const [selectedCommands, setSelectedCommands] = useState<string[]>([]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const handleSubmit = () => {
    if (!input.trim() && selectedCommands.length === 0) return;
    const finalMessage = (
      selectedCommands.map((cmd) => `/${cmd}`).join(" ") +
      " " +
      input
    ).trim();
    onSendMessage(finalMessage);
    setInput("");
    setSelectedCommands([]);
    setCommandOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "/" && !commandOpen) {
      e.preventDefault();
      setCommandOpen(true);
    }
  };

  const addCommand = (cmd: string) => {
    if (!selectedCommands.includes(cmd)) {
      setSelectedCommands((prev) => [...prev, cmd]);
    }
    setCommandOpen(false);
  };

  const removeCommand = (cmd: string) => {
    setSelectedCommands((prev) => prev.filter((c) => c !== cmd));
  };

  const addEmoji = (emoji: string) => {
    setInput((prev) => prev + emoji);
    setEmojiOpen(false);
  };

  return (
    <div className="w-2xl bg-background">
      <div className="flex items-center justify-center gap-2 p-3">
        {/* File Upload */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <input
          id="file-input"
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0] && onUploadFile) {
              onUploadFile(e.target.files[0]);
            }
          }}
        />

        {/* Input & Commands */}
        <div className="flex flex-col flex-1 gap-2">
          {/* Selected Commands as tags */}
          <div className="flex flex-wrap gap-1">
            {selectedCommands.map((cmd) => {
              const c = COMMANDS.find((c) => c.id === cmd);
              return (
                <Badge
                  key={cmd}
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => removeCommand(cmd)}
                >
                  {c?.icon} {c?.label}
                </Badge>
              );
            })}
          </div>

          {/* Text Input with Slash Command Popover */}
          <Popover open={commandOpen} onOpenChange={setCommandOpen}>
            <PopoverTrigger asChild>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message... (press '/' for commands)"
                className="resize-none min-h-[44px] max-h-[200px] rounded-xl px-3 py-2 text-sm"
              />
            </PopoverTrigger>
            <PopoverContent className="p-0 w-56">
              <Command>
                <CommandInput placeholder="Search command..." />
                <CommandList>
                  <CommandGroup heading="Commands">
                    {COMMANDS.map((cmd) => (
                      <CommandItem
                        key={cmd.id}
                        onSelect={() => addCommand(cmd.id)}
                      >
                        {cmd.icon} {cmd.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Extra Actions */}
        <div className="flex items-center gap-1">
          {/* Emoji Picker */}
          <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="grid grid-cols-4 gap-2 w-40 p-2">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => addEmoji(emoji)}
                  className="text-lg hover:scale-110 transition"
                >
                  {emoji}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Clear Input */}
          <Button variant="ghost" size="icon" onClick={() => setInput("")}>
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Send / Stop */}
        <Button
          onClick={handleSubmit}
          disabled={
            !input.trim() && selectedCommands.length === 0 && !isLoading
          }
          variant="outline"
          className="rounded-full"
        >
          {isLoading ? (
            <StopCircle className="h-5 w-5" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
