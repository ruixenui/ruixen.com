"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Ref,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Calendar Event Composer — macOS-style day view with inspector panel.
 *
 * Click any time slot to drop a new event. The inspector slides in
 * with title, category, location, date, alerts, invitees, and notes —
 * editing streams back to the block in the timeline. Drag to reposition
 * or resize from the bottom edge. Escape closes the inspector.
 */

/* ── Types ── */

export interface ComposerCategory {
  id: string;
  label: string;
  color: string;
}

export interface ComposerEvent {
  id: string;
  title: string;
  startMin: number;
  endMin: number;
  categoryId: string;
  location?: string;
  alert?: string;
  invitees?: string;
  notes?: string;
}

export interface CalendarEventComposerProps {
  date?: Date;
  startHour?: number;
  endHour?: number;
  initialEvents?: ComposerEvent[];
  categories?: ComposerCategory[];
  onEventsChange?: (events: ComposerEvent[]) => void;
  className?: string;
}

/* ── Constants ── */

const DEFAULT_CATEGORIES: ComposerCategory[] = [
  { id: "work", label: "Work", color: "#D946EF" },
  { id: "personal", label: "Personal", color: "#3B82F6" },
  { id: "family", label: "Family", color: "#22C55E" },
  { id: "travel", label: "Travel", color: "#F97316" },
  { id: "urgent", label: "Urgent", color: "#EF4444" },
];

const HOUR_HEIGHT = 58;
const SNAP_MIN = 15;
const MIN_DURATION = 30;
const DRAG_THRESHOLD = 3;

type DragMode = "move" | "resize" | null;

interface DragState {
  mode: DragMode;
  eventId: string;
  startY: number;
  origStart: number;
  origEnd: number;
  moved: boolean;
}

/* ── Helpers ── */

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function hourLabel(h: number): { num: string; suf: string } {
  if (h === 12) return { num: "Midday", suf: "" };
  const p = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return { num: String(h12), suf: p };
}

function fmtTime(mins: number, compact = false): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const p = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return compact ? `${h12}:${pad2(m)}${p}` : `${h12}:${pad2(m)} ${p}`;
}

function fmtRange(startMin: number, endMin: number): string {
  const sH = Math.floor(startMin / 60);
  const eH = Math.floor(endMin / 60);
  const samePeriod = sH >= 12 === eH >= 12;
  if (samePeriod) {
    const sH12 = sH === 0 ? 12 : sH > 12 ? sH - 12 : sH;
    const eH12 = eH === 0 ? 12 : eH > 12 ? eH - 12 : eH;
    const p = eH >= 12 ? "PM" : "AM";
    return `${sH12}:${pad2(startMin % 60)} – ${eH12}:${pad2(endMin % 60)}${p}`;
  }
  return `${fmtTime(startMin, true)} – ${fmtTime(endMin, true)}`;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function snap(mins: number, interval = SNAP_MIN): number {
  return Math.round(mins / interval) * interval;
}

function uid(): string {
  return `evt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/* ── Icons (inline, zero-dep) ── */

const ClockIcon = ({ size = 10 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ChevronDown = ({ size = 10 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CameraIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={(size * 10) / 14}
    viewBox="0 0 24 16"
    fill="currentColor"
    aria-hidden
  >
    <rect x="0" y="1" width="16" height="14" rx="2.5" />
    <path d="M18 4l6-3v14l-6-3z" />
  </svg>
);

const CloseIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

/* ── Component ── */

export function CalendarEventComposer({
  date = new Date(),
  startHour = 10,
  endHour = 19,
  initialEvents = [],
  categories = DEFAULT_CATEGORIES,
  onEventsChange,
  className,
}: CalendarEventComposerProps) {
  const [events, setEvents] = useState<ComposerEvent[]>(initialEvents);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialEvents.length > 0 ? initialEvents[0].id : null,
  );
  const [mode, setMode] = useState<"event" | "reminder">("event");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const onChangeRef = useRef(onEventsChange);

  useEffect(() => {
    onChangeRef.current = onEventsChange;
  }, [onEventsChange]);

  useEffect(() => {
    onChangeRef.current?.(events);
  }, [events]);

  const hours = useMemo(() => {
    const out: number[] = [];
    for (let h = startHour; h <= endHour; h++) out.push(h);
    return out;
  }, [startHour, endHour]);

  const timelineMinStart = startHour * 60;
  const timelineMinEnd = endHour * 60;

  const selected = useMemo(
    () => events.find((e) => e.id === selectedId) ?? null,
    [events, selectedId],
  );

  const selectedCat = useMemo(() => {
    if (!selected) return categories[0];
    return (
      categories.find((c) => c.id === selected.categoryId) ?? categories[0]
    );
  }, [selected, categories]);

  /* ── Create event on empty click ── */
  const handleTimelineClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!timelineRef.current) return;
      const target = e.target as HTMLElement;
      if (target.closest("[data-event-block]")) return;
      if (dragRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top + (timelineRef.current.scrollTop ?? 0);
      const minsFromTop = (y / HOUR_HEIGHT) * 60;
      const snapped = snap(minsFromTop);
      const startMin = Math.max(
        timelineMinStart,
        Math.min(timelineMinEnd - 60, timelineMinStart + snapped),
      );
      const endMin = Math.min(timelineMinEnd, startMin + 60);

      const ev: ComposerEvent = {
        id: uid(),
        title: "",
        startMin,
        endMin,
        categoryId: categories[0].id,
      };
      setEvents((prev) => [...prev, ev]);
      setSelectedId(ev.id);
      setCategoryOpen(false);
      requestAnimationFrame(() => titleRef.current?.focus());
    },
    [categories, timelineMinEnd, timelineMinStart],
  );

  const patchEvent = useCallback(
    (id: string, patch: Partial<ComposerEvent>) => {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
      );
    },
    [],
  );

  const closeEditor = useCallback(() => {
    setSelectedId(null);
    setCategoryOpen(false);
  }, []);

  /* ── Drag to move / resize ── */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const delta = e.clientY - d.startY;
      if (!d.moved && Math.abs(delta) < DRAG_THRESHOLD) return;
      d.moved = true;
      const deltaMin = snap((delta / HOUR_HEIGHT) * 60);

      if (d.mode === "move") {
        const dur = d.origEnd - d.origStart;
        let start = d.origStart + deltaMin;
        start = Math.max(
          timelineMinStart,
          Math.min(timelineMinEnd - dur, start),
        );
        const end = start + dur;
        setEvents((prev) =>
          prev.map((ev) =>
            ev.id === d.eventId ? { ...ev, startMin: start, endMin: end } : ev,
          ),
        );
      } else if (d.mode === "resize") {
        let end = d.origEnd + deltaMin;
        end = Math.max(
          d.origStart + MIN_DURATION,
          Math.min(timelineMinEnd, end),
        );
        setEvents((prev) =>
          prev.map((ev) => (ev.id === d.eventId ? { ...ev, endMin: end } : ev)),
        );
      }
    };

    const onUp = () => {
      const d = dragRef.current;
      if (!d) return;
      dragRef.current = null;
      if (d.moved) return;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [timelineMinEnd, timelineMinStart]);

  const startDrag = useCallback(
    (
      e: React.PointerEvent,
      eventId: string,
      dragMode: Exclude<DragMode, null>,
    ) => {
      const ev = events.find((x) => x.id === eventId);
      if (!ev) return;
      (e.target as Element).setPointerCapture?.(e.pointerId);
      dragRef.current = {
        mode: dragMode,
        eventId,
        startY: e.clientY,
        origStart: ev.startMin,
        origEnd: ev.endMin,
        moved: false,
      };
    },
    [events],
  );

  /* ── Escape closes ── */
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeEditor();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, closeEditor]);

  return (
    <div
      className={cn(
        "flex rounded-[14px] border border-neutral-200 bg-white overflow-hidden dark:border-neutral-800 dark:bg-[#1b1b1d]",
        className,
      )}
      style={{
        width: "100%",
        maxWidth: 820,
        height: 560,
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      {/* ─────────── Timeline ─────────── */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div
          className="px-4 pt-3 pb-2 border-b border-neutral-200/70 dark:border-neutral-800/70 flex items-center justify-between"
          style={{ flexShrink: 0 }}
        >
          <span
            className="text-neutral-900 dark:text-neutral-100"
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {date.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </span>
          <span
            className="text-neutral-400 dark:text-neutral-500"
            style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}
          >
            Click a slot to add
          </span>
        </div>

        <div
          ref={timelineRef}
          onClick={handleTimelineClick}
          className="relative flex-1 overflow-y-auto cursor-cell"
          style={{ scrollbarWidth: "thin" }}
        >
          <div
            style={{ position: "relative", height: hours.length * HOUR_HEIGHT }}
          >
            {hours.map((h, i) => {
              const lbl = hourLabel(h);
              return (
                <div
                  key={h}
                  className={cn(
                    i === 0
                      ? ""
                      : "border-t border-neutral-200/70 dark:border-neutral-800/70",
                  )}
                  style={{
                    position: "absolute",
                    top: i * HOUR_HEIGHT,
                    left: 0,
                    right: 0,
                    height: HOUR_HEIGHT,
                  }}
                >
                  <div
                    className="select-none pointer-events-none"
                    style={{
                      position: "absolute",
                      left: 10,
                      top: 0,
                      transform: "translateY(-50%)",
                      display: "flex",
                      alignItems: "baseline",
                      gap: 3,
                    }}
                  >
                    <span
                      className="text-neutral-500 dark:text-neutral-500"
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {lbl.num}
                    </span>
                    {lbl.suf && (
                      <span
                        className="text-neutral-400 dark:text-neutral-600"
                        style={{ fontSize: 9, fontWeight: 500 }}
                      >
                        {lbl.suf}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Event blocks */}
            <AnimatePresence>
              {events.map((evt) => {
                const cat =
                  categories.find((c) => c.id === evt.categoryId) ??
                  categories[0];
                const top =
                  ((evt.startMin - timelineMinStart) / 60) * HOUR_HEIGHT;
                const h = ((evt.endMin - evt.startMin) / 60) * HOUR_HEIGHT;
                const isSel = evt.id === selectedId;

                return (
                  <motion.div
                    key={evt.id}
                    data-event-block
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      type: "spring",
                      stiffness: 480,
                      damping: 34,
                    }}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      const tgt = e.target as HTMLElement;
                      if (tgt.closest("[data-resize]")) {
                        startDrag(e, evt.id, "resize");
                      } else {
                        startDrag(e, evt.id, "move");
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (dragRef.current?.moved) return;
                      setSelectedId(evt.id);
                      setCategoryOpen(false);
                    }}
                    style={{
                      position: "absolute",
                      top,
                      height: Math.max(h, 22),
                      left: 44,
                      right: 10,
                      backgroundColor: cat.color,
                      borderRadius: 6,
                      overflow: "hidden",
                      cursor: "grab",
                      boxShadow: isSel
                        ? `0 0 0 2px rgba(255,255,255,0.22), 0 10px 24px -10px ${cat.color}`
                        : "none",
                      paddingInline: 10,
                      paddingTop: 6,
                      paddingBottom: 6,
                      userSelect: "none",
                      touchAction: "none",
                    }}
                  >
                    <div
                      className="text-white"
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        lineHeight: 1.25,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {evt.title.trim() || "New Event"}
                    </div>
                    <div
                      className="text-white/85"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        marginTop: 2,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      <ClockIcon size={10} />
                      <span>{fmtRange(evt.startMin, evt.endMin)}</span>
                    </div>

                    {/* Resize handle */}
                    <div
                      data-resize
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 6,
                        cursor: "ns-resize",
                      }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─────────── Divider + Editor ─────────── */}
      <AnimatePresence initial={false}>
        {selected && (
          <motion.div
            key="panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 34 }}
            className="flex-shrink-0 overflow-hidden border-l border-neutral-200 dark:border-neutral-800"
          >
            <EditorPanel
              event={selected}
              category={selectedCat}
              categories={categories}
              categoryOpen={categoryOpen}
              setCategoryOpen={setCategoryOpen}
              mode={mode}
              setMode={setMode}
              titleRef={titleRef}
              date={date}
              onChange={(p) => patchEvent(selected.id, p)}
              onClose={closeEditor}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Editor Panel ── */

interface EditorPanelProps {
  event: ComposerEvent;
  category: ComposerCategory;
  categories: ComposerCategory[];
  categoryOpen: boolean;
  setCategoryOpen: (v: boolean) => void;
  mode: "event" | "reminder";
  setMode: (m: "event" | "reminder") => void;
  titleRef: Ref<HTMLInputElement>;
  date: Date;
  onChange: (patch: Partial<ComposerEvent>) => void;
  onClose: () => void;
}

function EditorPanel({
  event,
  category,
  categories,
  categoryOpen,
  setCategoryOpen,
  mode,
  setMode,
  titleRef,
  date,
  onChange,
  onClose,
}: EditorPanelProps) {
  return (
    <div
      className="h-full flex flex-col bg-neutral-50 dark:bg-[#161618]"
      style={{ width: 340 }}
    >
      {/* Tab switcher */}
      <div
        style={{
          padding: "12px 12px 8px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          className="bg-neutral-200/70 dark:bg-neutral-900"
          style={{
            display: "flex",
            borderRadius: 10,
            padding: 2,
            flex: 1,
          }}
        >
          <button
            onClick={() => setMode("event")}
            className={cn(
              "transition-colors duration-150",
              mode === "event"
                ? "bg-[#ff5a52] text-white"
                : "bg-transparent text-neutral-600 dark:text-neutral-400",
            )}
            style={{
              flex: 1,
              border: "none",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              padding: "6px 14px",
              cursor: "pointer",
              boxShadow:
                mode === "event" ? "0 1px 2px rgba(0,0,0,0.15)" : "none",
            }}
          >
            Event
          </button>
          <button
            onClick={() => setMode("reminder")}
            className={cn(
              "transition-colors duration-150",
              mode === "reminder"
                ? "bg-[#ff5a52] text-white"
                : "bg-transparent text-neutral-600 dark:text-neutral-400",
            )}
            style={{
              flex: 1,
              border: "none",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              padding: "6px 14px",
              cursor: "pointer",
              boxShadow:
                mode === "reminder" ? "0 1px 2px rgba(0,0,0,0.15)" : "none",
            }}
          >
            Reminder
          </button>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 transition-colors"
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 4,
            lineHeight: 0,
          }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "4px 12px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Title + Category */}
        <Section>
          <input
            ref={titleRef}
            value={event.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="New Event"
            className="flex-1 bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            style={{
              fontSize: 13,
              fontWeight: 500,
              border: "none",
              minWidth: 0,
            }}
          />
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300/70 dark:hover:bg-neutral-700 transition-colors"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: "none",
                borderRadius: 6,
                padding: "4px 8px",
                fontSize: 11,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: category.color,
                  flexShrink: 0,
                }}
              />
              <span>{category.label}</span>
              <ChevronDown size={8} />
            </button>

            <AnimatePresence>
              {categoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 4px)",
                    zIndex: 20,
                    borderRadius: 8,
                    padding: 4,
                    minWidth: 120,
                    boxShadow: "0 8px 24px -8px rgba(0,0,0,0.25)",
                  }}
                >
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange({ categoryId: c.id });
                        setCategoryOpen(false);
                      }}
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        border: "none",
                        background: "transparent",
                        padding: "6px 8px",
                        borderRadius: 4,
                        fontSize: 12,
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          backgroundColor: c.color,
                          flexShrink: 0,
                        }}
                      />
                      <span>{c.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Section>

        {/* Location */}
        <Section>
          <input
            value={event.location || ""}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Add Location or Video Call"
            className="flex-1 bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            style={{ fontSize: 12, border: "none", minWidth: 0 }}
          />
          <div
            className="bg-neutral-200/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              borderRadius: 5,
              padding: "3px 6px",
            }}
          >
            <CameraIcon size={14} />
            <ChevronDown size={8} />
          </div>
        </Section>

        {/* Date + time */}
        <Section column>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <span
              className="text-neutral-900 dark:text-white"
              style={{ fontSize: 12, fontWeight: 600 }}
            >
              {fmtDate(date)}
            </span>
            <span
              className="text-neutral-900 dark:text-white"
              style={{
                fontSize: 12,
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmtRange(event.startMin, event.endMin)}
            </span>
          </div>
        </Section>

        {/* Alert */}
        <Section>
          <input
            value={event.alert || ""}
            onChange={(e) => onChange({ alert: e.target.value })}
            placeholder="Add Alert, Repeat or Travel Time"
            className="flex-1 bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            style={{ fontSize: 12, border: "none", minWidth: 0 }}
          />
        </Section>

        {/* Invitees */}
        <Section>
          <input
            value={event.invitees || ""}
            onChange={(e) => onChange({ invitees: e.target.value })}
            placeholder="Add Invitees"
            className="flex-1 bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            style={{ fontSize: 12, border: "none", minWidth: 0 }}
          />
        </Section>

        {/* Notes */}
        <Section column>
          <textarea
            value={event.notes || ""}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Add Notes, URL or Attachments"
            rows={2}
            className="w-full bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 resize-none"
            style={{
              fontSize: 12,
              border: "none",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
          />
        </Section>
      </div>
    </div>
  );
}

/* ── Section shell ── */

function Section({
  children,
  column = false,
}: {
  children: React.ReactNode;
  column?: boolean;
}) {
  return (
    <div
      className="bg-neutral-200/40 dark:bg-[#242427]"
      style={{
        display: "flex",
        flexDirection: column ? "column" : "row",
        alignItems: column ? "stretch" : "center",
        gap: 8,
        padding: "10px 12px",
        borderRadius: 8,
        marginBottom: 2,
      }}
    >
      {children}
    </div>
  );
}

export default CalendarEventComposer;
