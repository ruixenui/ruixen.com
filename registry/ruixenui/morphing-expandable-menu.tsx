"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Music2,
  Timer,
  Pen,
  X,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Plus,
} from "lucide-react";

type Mode = "pill" | "dock" | "search" | "player" | "timer" | "note";

const spring = {
  type: "spring" as const,
  damping: 28,
  stiffness: 380,
  mass: 0.7,
};

const dockActions: { id: Mode; icon: typeof Search }[] = [
  { id: "search", icon: Search },
  { id: "player", icon: Music2 },
  { id: "timer", icon: Timer },
  { id: "note", icon: Pen },
];

const dims: Record<Mode, [number, number, number]> = {
  pill: [44, 44, 50],
  dock: [200, 44, 22],
  search: [280, 218, 18],
  player: [280, 172, 18],
  timer: [220, 180, 18],
  note: [256, 182, 18],
};

export function MorphingExpandableMenu() {
  const [mode, setMode] = useState<Mode>("pill");
  const [hoveredDock, setHoveredDock] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [progress] = useState(35);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMode("pill");
        setQuery("");
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (mode === "pill") return;
      setMode(mode === "dock" ? "pill" : "dock");
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [mode]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (mode !== "dock") setHoveredDock(null);
  }, [mode]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const goBack = () => setMode("dock");
  const [w, h, r] = dims[mode];
  const isDockOrPill = mode === "pill" || mode === "dock";

  return (
    <div ref={ref} className="relative h-11 w-11">
      <motion.div
        className="absolute right-0 top-0 overflow-hidden border border-border/60 bg-popover shadow-xl shadow-black/8 dark:border-border/40 dark:shadow-black/25"
        animate={{ width: w, height: h, borderRadius: r }}
        transition={spring}
      >
        {/* ── dock / pill bar ──────────────────────────── */}
        <AnimatePresence>
          {isDockOrPill && (
            <motion.div
              key="bar"
              className="absolute right-0 top-0 flex h-11 items-center"
              style={{ width: dims.dock[0] }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {dockActions.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  onMouseEnter={() => setHoveredDock(item.id)}
                  onMouseLeave={() => setHoveredDock(null)}
                  animate={{
                    width: mode === "dock" ? 36 : 0,
                    marginLeft: mode === "dock" ? 3 : 0,
                    opacity: mode === "dock" ? 1 : 0,
                  }}
                  transition={{
                    ...spring,
                    delay: mode === "dock" ? (3 - i) * 0.03 : 0,
                  }}
                  style={{
                    height: 36,
                    pointerEvents: mode === "dock" ? "auto" : "none",
                  }}
                  className="relative flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl text-muted-foreground transition-colors duration-150 hover:text-foreground"
                >
                  {hoveredDock === item.id && (
                    <motion.div
                      layoutId="dockGlow"
                      className="absolute inset-0 rounded-xl bg-foreground/[0.05] dark:bg-foreground/[0.08]"
                      transition={spring}
                    />
                  )}
                  <item.icon className="relative z-10 size-[17px]" />
                </motion.button>
              ))}

              <motion.button
                onClick={() => setMode(mode === "pill" ? "dock" : "pill")}
                className="ml-auto flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center"
                whileTap={{ scale: 0.85 }}
              >
                <motion.div
                  animate={{ rotate: mode === "dock" ? 45 : 0 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    mass: 0.5,
                  }}
                >
                  <Plus className="size-5 text-foreground/80" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── panels ───────────────────────────────────── */}
        <AnimatePresence mode="wait" initial={false}>
          {/* search */}
          {mode === "search" && (
            <motion.div
              key="search"
              className="flex h-full flex-col p-3"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
                <Search className="size-4 shrink-0 text-muted-foreground/60" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/50"
                />
                <button
                  onClick={goBack}
                  className="text-muted-foreground/60 hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="scrollbar-hide mt-1 min-h-0 flex-1 overflow-y-auto">
                <p className="mt-1.5 px-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
                  Recent
                </p>
                <div className="mt-1 space-y-0.5">
                  {[
                    "Project settings",
                    "API documentation",
                    "Team members",
                    "Billing",
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.025, ...spring }}
                      className="cursor-pointer rounded-lg px-2 py-[6px] text-[13px] text-muted-foreground transition-colors duration-150 hover:bg-foreground/[0.04] hover:text-foreground"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* player */}
          {mode === "player" && (
            <motion.div
              key="player"
              className="flex h-full flex-col p-4"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 shrink-0 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500" />
                  <div>
                    <p className="text-[13px] font-medium text-foreground">
                      Midnight City
                    </p>
                    <p className="text-[11px] text-muted-foreground/70">
                      M83 — Hurry Up, We&apos;re Dreaming
                    </p>
                  </div>
                </div>
                <button
                  onClick={goBack}
                  className="text-muted-foreground/50 hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <div className="mt-4">
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-foreground/8">
                  <motion.div
                    className="h-full rounded-full bg-foreground/40"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-muted-foreground/50">
                  <span>1:24</span>
                  <span>4:03</span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-center gap-6">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className="cursor-pointer text-muted-foreground/60 hover:text-foreground"
                >
                  <SkipBack className="size-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setPlaying(!playing)}
                  className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-foreground text-background"
                >
                  {playing ? (
                    <Pause className="size-[15px]" />
                  ) : (
                    <Play className="ml-0.5 size-[15px]" />
                  )}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className="cursor-pointer text-muted-foreground/60 hover:text-foreground"
                >
                  <SkipForward className="size-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* timer */}
          {mode === "timer" && (
            <motion.div
              key="timer"
              className="flex h-full flex-col p-4"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                  Focus
                </p>
                <button
                  onClick={goBack}
                  className="text-muted-foreground/50 hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <p className="mt-4 text-center font-mono text-[40px] font-semibold leading-none tabular-nums text-foreground">
                {fmt(timeLeft)}
              </p>

              <div className="mt-5 flex items-center justify-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setRunning(!running)}
                  className="h-8 cursor-pointer rounded-lg bg-foreground px-5 text-xs font-medium text-background"
                >
                  {running ? "Pause" : "Start"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => {
                    setRunning(false);
                    setTimeLeft(25 * 60);
                  }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border/50 text-muted-foreground/60 hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* note */}
          {mode === "note" && (
            <motion.div
              key="note"
              className="flex h-full flex-col p-3"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.15 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                  Quick Note
                </p>
                <button
                  onClick={goBack}
                  className="text-muted-foreground/50 hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <textarea
                autoFocus
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Type something..."
                className="flex-1 resize-none rounded-lg bg-foreground/[0.03] p-2.5 text-[13px] outline-none transition-colors placeholder:text-muted-foreground/40 focus:bg-foreground/[0.05]"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground/40">
                  {noteText.length} chars
                </span>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  className="h-7 cursor-pointer rounded-md bg-foreground px-3 text-[11px] font-medium text-background"
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
