// components/glass/HistoryManager.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GlassState } from "@/lib/glass";

type Props = { value: GlassState; onChange: (s: GlassState) => void };

const LIMIT = 20;
const LS_KEY = "glass-history-v1";

export default function HistoryManager({ value, onChange }: Props) {
  const [undoStack, setUndo] = useState<GlassState[]>([]);
  const [redoStack, setRedo] = useState<GlassState[]>([]);
  const lastSaved = useRef<number>(0);

  // Load history once
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.undo)) setUndo(parsed.undo);
        if (Array.isArray(parsed?.redo)) setRedo(parsed.redo);
      } catch {}
    }
    // push initial
    push(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({ undo: undoStack, redo: redoStack }),
    );
  }, [undoStack, redoStack]);

  // Push with de-bounce to keep UI fast
  const push = (snapshot: GlassState) => {
    setUndo((prev) => [snapshot, ...prev].slice(0, LIMIT));
    setRedo([]);
    lastSaved.current = Date.now();
  };

  useEffect(() => {
    const now = Date.now();
    if (now - lastSaved.current > 300) push(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const undo = () => {
    if (!undoStack.length) return;
    const [current, ...rest] = undoStack;
    setUndo(rest);
    setRedo((r) => [value, ...r].slice(0, LIMIT));
    onChange(current);
  };

  const redo = () => {
    if (!redoStack.length) return;
    const [next, ...rest] = redoStack;
    setRedo(rest);
    setUndo((u) => [value, ...u].slice(0, LIMIT));
    onChange(next);
  };

  const clear = () => {
    setUndo([]);
    setRedo([]);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            onClick={undo}
            disabled={!undoStack.length}
            variant="outline"
          >
            Undo
          </Button>
          <Button
            size="sm"
            onClick={redo}
            disabled={!redoStack.length}
            variant="outline"
          >
            Redo
          </Button>
          <Button size="sm" variant="ghost" onClick={clear}>
            Clear
          </Button>
          <div className="ml-auto text-xs text-muted-foreground">
            {undoStack.length} snapshot{undoStack.length !== 1 ? "s" : ""}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
