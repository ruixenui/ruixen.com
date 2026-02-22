"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

/**
 * Drag & Drop Tabs — Rauno Freiberg craft.
 *
 * Reorderable tabs with spring physics on drop,
 * staggered cascade, velocity-aware snap, and audio tick
 * on drag start, reorder, and drop.
 */

/* ── Audio singleton ── */

let _a: AudioContext | null = null;
let _b: AudioBuffer | null = null;

function getCtx(): AudioContext {
  if (!_a)
    _a = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  if (_a.state === "suspended") _a.resume();
  return _a;
}

function getBuf(ac: AudioContext): AudioBuffer {
  if (_b && _b.sampleRate === ac.sampleRate) return _b;
  const len = Math.floor(ac.sampleRate * 0.003);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++)
    ch[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 4;
  _b = buf;
  return buf;
}

function tick(ref: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - ref.current < 25) return;
  ref.current = now;
  try {
    const ac = getCtx();
    const src = ac.createBufferSource();
    const g = ac.createGain();
    src.buffer = getBuf(ac);
    g.gain.value = 0.06;
    src.connect(g).connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Types ── */

export interface DragTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface DragAndDropTabsProps {
  items?: DragTabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  sound?: boolean;
  className?: string;
}

/* ── CSS ── */

const CSS = `.ddt{--ddt-bg:rgba(255,255,255,.72);--ddt-border:rgba(0,0,0,.06);--ddt-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--ddt-pill:rgba(0,0,0,.07);--ddt-text:rgba(0,0,0,.5);--ddt-text-active:rgba(0,0,0,.9);--ddt-drag-shadow:0 4px 16px rgba(0,0,0,.12);--ddt-content-bg:rgba(0,0,0,.02);--ddt-content-border:rgba(0,0,0,.06)}.dark .ddt,[data-theme="dark"] .ddt{--ddt-bg:rgba(30,30,32,.82);--ddt-border:rgba(255,255,255,.06);--ddt-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--ddt-pill:rgba(255,255,255,.08);--ddt-text:rgba(255,255,255,.45);--ddt-text-active:rgba(255,255,255,.9);--ddt-drag-shadow:0 4px 20px rgba(0,0,0,.4);--ddt-content-bg:rgba(255,255,255,.03);--ddt-content-border:rgba(255,255,255,.06)}`;

/* ── Constants ── */

const SPRING = { type: "spring" as const, stiffness: 400, damping: 28 };
const CASCADE = { type: "spring" as const, stiffness: 350, damping: 30 };

/* ── SortableTab ── */

function SortableTab({
  id,
  label,
  isActive,
  onSelect,
  cascadeDelay,
}: {
  id: string;
  label: string;
  isActive: boolean;
  onSelect: () => void;
  cascadeDelay: number;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  const tx = transform?.x ?? 0;
  const ty = transform?.y ?? 0;

  return (
    <motion.button
      ref={setNodeRef}
      animate={{
        x: tx,
        y: ty,
        scale: isDragging ? 1.06 : 1,
        opacity: isDragging ? 0.75 : 1,
      }}
      transition={
        isDragging
          ? { type: "spring", stiffness: 600, damping: 35 }
          : { ...CASCADE, delay: cascadeDelay }
      }
      onClick={onSelect}
      {...attributes}
      {...listeners}
      style={{
        position: "relative",
        zIndex: isDragging ? 10 : 1,
        border: "none",
        background: "none",
        padding: "8px 18px",
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "inherit",
        color: isActive ? "var(--ddt-text-active)" : "var(--ddt-text)",
        cursor: isDragging ? "grabbing" : "grab",
        whiteSpace: "nowrap",
        lineHeight: 1,
        transition: "color .15s ease",
        borderRadius: 10,
        boxShadow: isDragging ? "var(--ddt-drag-shadow)" : "none",
        touchAction: "none",
      }}
    >
      {label}
    </motion.button>
  );
}

/* ── Component ── */

export function DragAndDropTabs({
  items: defaultItems = [
    { value: "tab1", label: "Tab 1", content: "Content for Tab 1." },
    { value: "tab2", label: "Tab 2", content: "Content for Tab 2." },
    { value: "tab3", label: "Tab 3", content: "Content for Tab 3." },
    { value: "tab4", label: "Tab 4", content: "Content for Tab 4." },
  ],
  defaultValue,
  onChange,
  sound = true,
  className,
}: DragAndDropTabsProps) {
  const [items, setItems] = useState(defaultItems);
  const [active, setActive] = useState(
    defaultValue || defaultItems[0]?.value || "",
  );
  const lastSound = useRef(0);
  const lastOverId = useRef<string | null>(null);
  const dropIdx = useRef(-1);
  const barRef = useRef<HTMLDivElement | null>(null);
  const measured = useRef(false);

  const pillX = useMotionValue(0);
  const pillW = useMotionValue(0);
  const springX = useSpring(pillX, SPRING);
  const springW = useSpring(pillW, SPRING);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  /* Measure active pill position */
  const measurePill = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    const idx = items.findIndex((t) => t.value === active);
    const btns = bar.querySelectorAll<HTMLElement>("[data-ddt-tab]");
    const btn = btns[idx];
    if (!btn) return;
    // Use offsetLeft/offsetWidth — immune to ancestor CSS transforms (e.g. scale)
    const x = btn.offsetLeft;
    const w = btn.offsetWidth;
    if (!measured.current) {
      pillX.jump(x);
      pillW.jump(w);
      measured.current = true;
    } else {
      pillX.set(x);
      pillW.set(w);
    }
  }, [active, items, pillX, pillW]);

  useEffect(() => {
    /* Delay to let motion settle after reorder */
    const t = setTimeout(measurePill, 50);
    const ro = new ResizeObserver(measurePill);
    if (barRef.current) ro.observe(barRef.current);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [measurePill]);

  const go = useCallback(
    (value: string) => {
      if (value === active) return;
      if (sound) tick(lastSound);
      setActive(value);
      onChange?.(value);
    },
    [active, onChange, sound],
  );

  const handleDragStart = useCallback(
    (_e: DragStartEvent) => {
      if (sound) tick(lastSound);
    },
    [sound],
  );

  const handleDragOver = useCallback(
    (e: DragOverEvent) => {
      const overId = e.over?.id as string | undefined;
      if (overId && overId !== lastOverId.current) {
        lastOverId.current = overId;
        if (sound) tick(lastSound);
      }
    },
    [sound],
  );

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      lastOverId.current = null;
      const { active: dragged, over } = e;
      if (dragged.id !== over?.id && over) {
        setItems((prev) => {
          const oldIdx = prev.findIndex(
            (t) => t.value === (dragged.id as string),
          );
          const newIdx = prev.findIndex((t) => t.value === (over.id as string));
          dropIdx.current = newIdx;
          setTimeout(() => {
            dropIdx.current = -1;
          }, 500);
          return arrayMove(prev, oldIdx, newIdx);
        });
        if (sound) tick(lastSound);
      }
      measured.current = false;
    },
    [sound],
  );

  const activeContent = items.find((t) => t.value === active)?.content;

  return (
    <div className={`ddt${className ? ` ${className}` : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.value)}
          strategy={horizontalListSortingStrategy}
        >
          <div
            ref={barRef}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              padding: 4,
              background: "var(--ddt-bg)",
              border: "1px solid var(--ddt-border)",
              boxShadow: "var(--ddt-shadow)",
              borderRadius: 14,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* Active pill indicator */}
            <motion.div
              style={{
                position: "absolute",
                top: 4,
                left: 0,
                height: "calc(100% - 8px)",
                x: springX,
                width: springW,
                background: "var(--ddt-pill)",
                borderRadius: 10,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {items.map((item, i) => (
              <div
                key={item.value}
                data-ddt-tab=""
                style={{ display: "inline-flex" }}
              >
                <SortableTab
                  id={item.value}
                  label={item.label}
                  isActive={active === item.value}
                  onSelect={() => go(item.value)}
                  cascadeDelay={
                    dropIdx.current >= 0
                      ? Math.abs(i - dropIdx.current) * 0.025
                      : 0
                  }
                />
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Content panel */}
      {activeContent != null && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{
            marginTop: 16,
            padding: 20,
            background: "var(--ddt-content-bg)",
            border: "1px solid var(--ddt-content-border)",
            borderRadius: 12,
            color: "var(--ddt-text-active)",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          {activeContent}
        </motion.div>
      )}
    </div>
  );
}

export default DragAndDropTabs;
