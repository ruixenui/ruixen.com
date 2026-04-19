"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { Eraser, Paintbrush, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface PixelEditorProps {
  onSvgChange: (svg: string) => void;
}

function pixelsToSvg(pixels: boolean[][], gridSize: number): string {
  const cellSize = Math.floor(200 / gridSize);
  const totalSize = cellSize * gridSize;

  const isFilled = (x: number, y: number) =>
    x >= 0 && x < gridSize && y >= 0 && y < gridSize && pixels[y][x];

  type Edge = { x1: number; y1: number; x2: number; y2: number };
  const edges: Edge[] = [];

  for (let y = 0; y <= gridSize; y++) {
    for (let x = 0; x <= gridSize; x++) {
      const above = isFilled(x, y - 1);
      const below = isFilled(x, y);
      const left = isFilled(x - 1, y);
      const right = isFilled(x, y);

      if (above !== below) {
        edges.push({
          x1: x * cellSize,
          y1: y * cellSize,
          x2: (x + 1) * cellSize,
          y2: y * cellSize,
        });
      }
      if (left !== right) {
        edges.push({
          x1: x * cellSize,
          y1: y * cellSize,
          x2: x * cellSize,
          y2: (y + 1) * cellSize,
        });
      }
    }
  }

  if (edges.length === 0) return "";

  const pointKey = (x: number, y: number) => `${x},${y}`;
  const adj = new Map<string, Edge[]>();
  for (const e of edges) {
    const k1 = pointKey(e.x1, e.y1);
    const k2 = pointKey(e.x2, e.y2);
    if (!adj.has(k1)) adj.set(k1, []);
    if (!adj.has(k2)) adj.set(k2, []);
    adj.get(k1)!.push(e);
    adj.get(k2)!.push(e);
  }

  const used = new Set<Edge>();
  const loops: Array<Array<{ x: number; y: number }>> = [];

  for (const edge of edges) {
    if (used.has(edge)) continue;
    const loop: Array<{ x: number; y: number }> = [];
    let cur = edge;
    let px = cur.x1;
    let py = cur.y1;
    loop.push({ x: px, y: py });

    while (true) {
      used.add(cur);
      let nx: number, ny: number;
      if (cur.x1 === px && cur.y1 === py) {
        nx = cur.x2;
        ny = cur.y2;
      } else {
        nx = cur.x1;
        ny = cur.y1;
      }
      loop.push({ x: nx, y: ny });

      if (nx === edge.x1 && ny === edge.y1 && loop.length > 2) break;

      const key = pointKey(nx, ny);
      const candidates = adj.get(key) ?? [];
      const next = candidates.find((e) => !used.has(e));
      if (!next) break;
      cur = next;
      px = nx;
      py = ny;
    }

    if (loop.length > 2) loops.push(loop);
  }

  let pathData = "";
  for (const loop of loops) {
    pathData += `M${loop[0].x},${loop[0].y}`;
    for (let i = 1; i < loop.length; i++) {
      pathData += `L${loop[i].x},${loop[i].y}`;
    }
    pathData += "Z ";
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalSize}" height="${totalSize}" viewBox="0 0 ${totalSize} ${totalSize}"><path d="${pathData.trim()}" fill="black" fill-rule="evenodd"/></svg>`;
}

function createEmptyGrid(size: number): boolean[][] {
  return Array.from({ length: size }, () => Array(size).fill(false));
}

function createDefaultGrid(): boolean[][] {
  // Pixel-art "R" — 8 wide × 10 tall, centered in the 16×16 grid.
  const rows = [
    "0000111111110000",
    "0000111111110000",
    "0000110000110000",
    "0000110000110000",
    "0000111111110000",
    "0000111111110000",
    "0000110110000000",
    "0000110011000000",
    "0000110001100000",
    "0000110000110000",
  ];
  const grid = createEmptyGrid(16);
  const startY = 3;
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < 16; c++) {
      if (rows[r][c] === "1") grid[startY + r][c] = true;
    }
  }
  return grid;
}

export function PixelEditor({ onSvgChange }: PixelEditorProps) {
  const gridSize = 16;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const pixelColor = isDark ? "#fafafa" : "#111115";
  const gridLineColor = isDark
    ? "rgba(255,255,255,0.08)"
    : "rgba(0,0,0,0.08)";
  const [pixels, setPixels] = useState<boolean[][]>(() => createDefaultGrid());
  const [tool, setTool] = useState<"draw" | "erase">("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(0);

  const pixelCount = useMemo(
    () => pixels.reduce((acc, row) => acc + row.filter(Boolean).length, 0),
    [pixels],
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setContainerSize(Math.floor(width));
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onSvgChange(pixelsToSvg(pixels, gridSize));
  }, [pixels, onSvgChange]);

  const togglePixel = useCallback(
    (x: number, y: number) => {
      setPixels((prev) => {
        const next = prev.map((row) => [...row]);
        next[y][x] = tool === "draw";
        return next;
      });
    },
    [tool],
  );

  const handlePointerDown = useCallback(
    (x: number, y: number) => {
      setIsDrawing(true);
      togglePixel(x, y);
    },
    [togglePixel],
  );

  const handlePointerEnter = useCallback(
    (x: number, y: number) => {
      if (isDrawing) togglePixel(x, y);
    },
    [isDrawing, togglePixel],
  );

  const handlePointerUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, [handlePointerUp]);

  const clearGrid = () => setPixels(createEmptyGrid(gridSize));

  const cellPx = containerSize > 0 ? Math.floor(containerSize / gridSize) : 0;
  const gridPx = cellPx * gridSize;

  return (
    <div className="space-y-2.5">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5 rounded-md border border-border bg-muted/40 p-0.5">
          <button
            type="button"
            onClick={() => setTool("draw")}
            className={cn(
              "flex h-6 items-center gap-1 rounded px-2 text-[11px] font-medium transition-colors",
              tool === "draw"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Paintbrush className="h-3 w-3" />
            Draw
          </button>
          <button
            type="button"
            onClick={() => setTool("erase")}
            className={cn(
              "flex h-6 items-center gap-1 rounded px-2 text-[11px] font-medium transition-colors",
              tool === "erase"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Eraser className="h-3 w-3" />
            Erase
          </button>
        </div>
        <button
          type="button"
          onClick={clearGrid}
          className="flex h-6 items-center gap-1 rounded-md border border-border px-2 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Clear
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative w-full rounded-lg border border-border bg-background overflow-hidden select-none touch-none ring-1 ring-inset ring-foreground/5"
        style={{ aspectRatio: "1" }}
      >
        {cellPx > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridSize}, ${cellPx}px)`,
              gridTemplateRows: `repeat(${gridSize}, ${cellPx}px)`,
              width: gridPx,
              height: gridPx,
              margin: "0 auto",
            }}
          >
            {pixels.map((row, y) =>
              row.map((filled, x) => (
                <div
                  key={`${x}-${y}`}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handlePointerDown(x, y);
                  }}
                  onPointerEnter={() => handlePointerEnter(x, y)}
                  style={{
                    width: cellPx,
                    height: cellPx,
                    backgroundColor: filled ? pixelColor : "transparent",
                    boxShadow: `inset 0 0 0 0.5px ${gridLineColor}`,
                  }}
                />
              )),
            )}
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between px-0.5 text-[10px] font-mono text-muted-foreground">
        <span>
          {gridSize}×{gridSize}
        </span>
        <span>{pixelCount} px</span>
      </div>
    </div>
  );
}
