"use client";

import { useState, useEffect, useRef } from "react";
import opentype from "opentype.js";
import { Input } from "@/components/ui/input";
import { fontList, loadFont, textToSvg } from "./engine";

if (typeof window !== "undefined") {
  loadFont("Rubik Mono One").catch(() => {});
}

interface TextInputProps {
  onSvgChange: (svg: string) => void;
  onTextChange?: (text: string) => void;
  onFontChange?: (font: string) => void;
  initialText?: string;
  initialFont?: string;
  active?: boolean;
}

export function TextInput({
  onSvgChange,
  onTextChange,
  onFontChange,
  initialText,
  initialFont,
  active,
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(initialText ?? "RUIXEN");
  const [fontName, setFontName] = useState(initialFont ?? "Rubik Mono One");
  const [loadedFont, setLoadedFont] = useState<opentype.Font | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadFont(fontName)
      .then((font) => {
        if (cancelled) return;
        setLoadedFont(font);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fontName]);

  useEffect(() => {
    if (!loadedFont || !text.trim()) {
      if (!text.trim()) onSvgChange("");
      return;
    }
    onSvgChange(textToSvg(text.trim(), loadedFont));
  }, [text, loadedFont, onSvgChange]);

  useEffect(() => {
    if (active) inputRef.current?.focus();
  }, [active]);

  return (
    <div className="space-y-3">
      <Input
        ref={inputRef}
        placeholder="Type something..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onTextChange?.(e.target.value);
        }}
        className="h-8 text-xs"
      />
      <select
        value={fontName}
        onChange={(e) => {
          setFontName(e.target.value);
          onFontChange?.(e.target.value);
        }}
        className="w-full h-8 rounded-md border border-input bg-background/50 px-3 text-xs ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {fontList.map((f) => (
          <option key={f.name} value={f.name}>
            {f.name}
          </option>
        ))}
      </select>
      {loading && (
        <p className="text-[10px] text-muted-foreground animate-pulse">
          Loading font...
        </p>
      )}
    </div>
  );
}
