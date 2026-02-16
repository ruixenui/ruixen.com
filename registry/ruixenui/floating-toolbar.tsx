"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

/**
 * Floating Toolbar — Rauno Freiberg craft.
 *
 * One surface. Underline tracks active. Hover follows cursor.
 * Container breathes via layout. Cursor glow under glass.
 * Staggered choreography. Per-role springs.
 */

/* ── Springs — tuned per visual weight ── */

const spring = {
  shell: { type: "spring" as const, stiffness: 420, damping: 34 },
  line: { type: "spring" as const, stiffness: 500, damping: 32, mass: 0.8 },
  hover: { type: "spring" as const, stiffness: 400, damping: 28 },
  content: { type: "spring" as const, stiffness: 340, damping: 28 },
  press: { type: "spring" as const, stiffness: 600, damping: 32 },
} as const;

/* ── Types ── */

interface Tab {
  id: string;
  label: string;
}

interface FloatingToolbarProps {
  tabs?: Tab[];
  onTabChange?: (id: string) => void;
  onSearch?: (query: string) => void;
}

const DEFAULT_TABS: Tab[] = [
  { id: "all", label: "All" },
  { id: "recent", label: "Recent" },
  { id: "starred", label: "Starred" },
];

/* ── Component ── */

export function FloatingToolbar({
  tabs = DEFAULT_TABS,
  onTabChange,
  onSearch,
}: FloatingToolbarProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const [hovered, setHovered] = useState<string | null>(null);
  const [mode, setMode] = useState<"browse" | "search">("browse");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Cursor glow tracking */
  const [glowX, setGlowX] = useState(0);
  const [glowOn, setGlowOn] = useState(false);

  /* Focus input on search open */
  useEffect(() => {
    if (mode === "search") {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [mode]);

  /* Keyboard: ⌘K opens, Esc closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setMode("search");
      }
      if (e.key === "Escape" && mode === "search") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const select = (id: string) => {
    setActive(id);
    onTabChange?.(id);
  };

  const dismiss = () => {
    setMode("browse");
    setQuery("");
    onSearch?.("");
  };

  const searching = mode === "search";

  return (
    <div className="flex items-center justify-center">
      {/* One surface — layout-animated shell */}
      <motion.div
        layout
        transition={spring.shell}
        style={{ borderRadius: 14 }}
        className="relative flex w-fit items-center h-10 bg-neutral-900 border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_1px_2px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.2)]"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setGlowX(e.clientX - r.left);
          if (!glowOn) setGlowOn(true);
        }}
        onMouseLeave={() => {
          setGlowOn(false);
          setHovered(null);
        }}
      >
        {/* ── Cursor glow — light-under-glass ── */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            borderRadius: 14,
            opacity: glowOn ? 1 : 0,
            transition: "opacity 0.3s ease",
            background: `radial-gradient(120px circle at ${glowX}px 50%, rgba(255,255,255,0.04), transparent)`,
          }}
        />

        <AnimatePresence mode="popLayout" initial={false}>
          {!searching ? (
            /* ────────────────────────
               BROWSE — tabs + search
            ──────────────────────── */
            <motion.div
              key="browse"
              className="relative z-10 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="relative flex items-center px-1">
                {tabs.map((tab, i) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => select(tab.id)}
                    onMouseEnter={() => setHovered(tab.id)}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ ...spring.content, delay: i * 0.03 }}
                    className={`relative px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] outline-none cursor-pointer select-none transition-colors duration-200 ${
                      active === tab.id
                        ? "text-white"
                        : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {/* Hover follower — slides between tabs */}
                    {hovered === tab.id && (
                      <motion.div
                        layoutId="tab-hover"
                        className="absolute inset-1 rounded-lg bg-white/[0.04]"
                        transition={spring.hover}
                      />
                    )}

                    {/* Active underline — inherently centered, no measurement */}
                    {active === tab.id && (
                      <motion.div
                        layoutId="tab-active"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-white rounded-full"
                        transition={spring.line}
                      />
                    )}

                    <span className="relative z-10">{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Divider */}
              <div className="w-px h-3.5 bg-white/[0.06] mx-0.5 shrink-0" />

              {/* Search trigger */}
              <motion.button
                onClick={() => setMode("search")}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.88 }}
                transition={spring.press}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center w-7 h-7 mr-1 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04] transition-colors duration-200 outline-none cursor-pointer"
                aria-label="Search"
              >
                <SearchIcon />
              </motion.button>
            </motion.div>
          ) : (
            /* ────────────────────────
               SEARCH — input + esc
            ──────────────────────── */
            <motion.div
              key="search"
              className="relative z-10 flex items-center gap-2 px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Icon — static, quiet */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ ...spring.content, delay: 0.02 }}
                className="shrink-0 text-neutral-500"
              >
                <SearchIcon />
              </motion.div>

              {/* Input */}
              <motion.div
                className="w-[160px]"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring.content, delay: 0.05 }}
              >
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    onSearch?.(e.target.value);
                  }}
                  placeholder="Search…"
                  className="w-full bg-transparent outline-none text-[13px] font-medium tracking-[-0.01em] text-white placeholder:text-neutral-600 caret-neutral-500"
                />
              </motion.div>

              {/* Esc — whisper-quiet, earns attention on hover */}
              <motion.button
                onClick={dismiss}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.3, scale: 1 }}
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.9 }}
                transition={{ ...spring.content, delay: 0.08 }}
                className="shrink-0 text-[10px] font-medium tracking-[0.04em] text-neutral-500 border border-white/[0.06] rounded-md px-1.5 py-0.5 cursor-pointer outline-none uppercase"
              >
                esc
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ── Icon ── */

function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default FloatingToolbar;
