"use client";

import * as React from "react";
import { Plus, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ------------------------------------------------------------------ */
/*  types                                                             */
/* ------------------------------------------------------------------ */
export interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export interface GradientChatInputProps {
  /** Placeholder shown inside the text field. */
  placeholder?: string;
  /** Auto-reply pushed back after a user message. Pass `null` to disable. */
  autoReply?: string | null;
  /** Delay (ms) before the auto-reply lands. */
  autoReplyDelay?: number;
  /** Max number of bubbles kept on screen. */
  maxVisible?: number;
  /** Play synthesized send / receive sounds. */
  sound?: boolean;
  /** The spectrum used for the reveal glow (top → bottom). */
  gradientColors?: string[];
  /** Fired whenever the user submits a message. */
  onSend?: (message: string) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  defaults                                                          */
/* ------------------------------------------------------------------ */
const DEFAULT_GRADIENT = [
  "#FC2BA3",
  "#FC6D35",
  "#F9C83D",
  "#C2D6E1",
  "#144EC5",
];

/* ------------------------------------------------------------------ */
/*  component                                                         */
/* ------------------------------------------------------------------ */
export default function GradientChatInput({
  placeholder = "Send Message",
  autoReply = "Got it — looking into that now ✨",
  autoReplyDelay = 650,
  maxVisible = 4,
  sound = true,
  gradientColors = DEFAULT_GRADIENT,
  onSend,
  className,
}: GradientChatInputProps) {
  const [value, setValue] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const idRef = React.useRef(0);
  const timersRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioRef = React.useRef<AudioContext | null>(null);

  /* lazy AudioContext — only created on the first user gesture */
  const getAudioContext = React.useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (Ctx) audioRef.current = new Ctx();
    }
    return audioRef.current;
  }, []);

  /* two-note blip synthesized inline — no audio assets to ship */
  const playChime = React.useCallback(
    (notes: { freq: number; at: number }[], volume: number) => {
      if (!sound) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") void ctx.resume();

      notes.forEach(({ freq, at }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + at;
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
        osc.connect(gain).connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.2);
      });
    },
    [sound, getAudioContext],
  );

  const playSend = React.useCallback(
    () =>
      playChime(
        [
          { freq: 523.25, at: 0 },
          { freq: 783.99, at: 0.06 },
        ],
        0.05,
      ),
    [playChime],
  );

  const playReceive = React.useCallback(
    () =>
      playChime(
        [
          { freq: 392.0, at: 0 },
          { freq: 587.33, at: 0.08 },
        ],
        0.05,
      ),
    [playChime],
  );

  /* cleanup pending timers + audio context on unmount */
  React.useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
      void audioRef.current?.close();
    };
  }, []);

  const pushMessage = (text: string, sender: ChatMessage["sender"]) =>
    setMessages((prev) => [...prev, { id: idRef.current++, text, sender }]);

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;

    onSend?.(text);
    pushMessage(text, "user");
    playSend();
    setValue("");

    if (autoReply) {
      const t = setTimeout(() => {
        pushMessage(autoReply, "bot");
        playReceive();
        timersRef.current = timersRef.current.filter((timer) => timer !== t);
      }, autoReplyDelay);
      timersRef.current.push(t);
    }
  };

  const hasText = value.trim().length > 0;
  const hasMessages = messages.length > 0;
  const visible = messages.slice(-maxVisible);

  return (
    <div className={cn("relative mx-auto w-full max-w-lg", className)}>
      {/* the input card */}
      <div className="relative rounded-3xl border border-border bg-background p-1 shadow-[0_10px_20px_-6px_rgba(0,0,0,0.1)]">
        <div className="relative z-[2] flex items-center justify-between gap-2 rounded-3xl bg-background p-1.5">
          <div className="flex flex-1 items-center gap-3 pr-1">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Add attachment"
              className="size-10 shrink-0 rounded-xl"
            >
              <Plus className="size-5" />
            </Button>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={placeholder}
              aria-label="Message"
              className="h-auto flex-1 border-0 bg-transparent px-0 py-0 text-base shadow-none focus-visible:ring-0 dark:bg-transparent md:text-sm"
            />
          </div>
          <Button
            type="button"
            onClick={handleSend}
            onMouseDown={(e) => e.preventDefault()}
            variant={hasText ? "default" : "secondary"}
            size="icon"
            aria-label="Send message"
            className="size-10 shrink-0 rounded-xl transition-colors active:scale-95"
          >
            <Send className="size-5" strokeWidth={2.25} />
          </Button>
        </div>

        {/* bubble stack — floats above the card */}
        <div className="pointer-events-none absolute bottom-[70px] right-0 z-[1] flex w-full flex-col items-end gap-2">
          <AnimatePresence initial={false}>
            {visible.map((m) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className={cn(
                  "max-w-[260px] break-words px-3.5 py-2.5 text-sm shadow-[0_10px_20px_-6px_rgba(0,0,0,0.15)]",
                  m.sender === "user"
                    ? "self-end rounded-[14px_14px_6px_14px] border border-border bg-background text-foreground"
                    : "self-start rounded-[14px_14px_14px_6px] bg-primary text-primary-foreground",
                )}
              >
                {m.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* spectrum glow — reveals from below once a conversation starts */}
      <motion.div
        aria-hidden
        initial={false}
        animate={hasMessages ? { opacity: 1, y: 0 } : { opacity: 0, y: "30%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-1/2 top-0 -z-[1] flex h-[100vh] w-full max-w-3xl -translate-x-1/2"
      >
        {[0, 1, 2].map((col) => (
          <div
            key={col}
            className={cn(
              "flex h-full w-full flex-col items-stretch -space-y-3",
              col === 1 && "-translate-y-20",
            )}
          >
            {gradientColors.map((color, i) => (
              <div
                key={i}
                className="w-full flex-1 blur-xl"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
