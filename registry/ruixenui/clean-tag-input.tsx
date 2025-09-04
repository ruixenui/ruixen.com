"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface Tag {
  id: string;
  text: string;
}

export default function CleanTagInput() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (text: string) => {
    if (!text.trim()) return;
    setTags([...tags, { id: Date.now().toString(), text: text.trim() }]);
    setInputValue("");
  };

  const removeTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length) {
      e.preventDefault();
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <Label className="text-sm font-normal text-black dark:text-white">
        Add tags
      </Label>

      <div
        className={cn(
          "flex flex-wrap items-center gap-2 px-2 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-black/30 dark:focus-within:ring-white/30",
          "border-gray-200 dark:border-gray-800 bg-transparent",
        )}
      >
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-1 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-1 text-sm text-black dark:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/10"
          >
            {tag.text}
            <button
              onClick={() => removeTag(tag.id)}
              className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white rounded-full p-0.5 transition-colors focus:outline-none"
              type="button"
            >
              <X className="w-3 h-3 ml-1" />
            </button>
          </div>
        ))}

        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press enter"
          className="flex-1 min-w-[80px] h-8 bg-transparent outline-none text-black dark:text-white text-sm px-2"
        />
      </div>

      <p className="text-xs text-black/50 dark:text-white/50">
        Add multiple tags. Press Enter to add, Backspace to remove last.
      </p>
    </div>
  );
}
