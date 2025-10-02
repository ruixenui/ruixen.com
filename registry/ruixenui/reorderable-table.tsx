"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* --------------------- Types ---------------------- */
export type ReorderableRow = Record<string, any>;

export type ColumnDef<T = ReorderableRow> = {
  key: keyof T;
  label: string;
  width?: string;
  sticky?: boolean;
  render?: (row: T) => React.ReactNode;
};

export interface ReorderableTableProps<T extends ReorderableRow> {
  data?: T[];
  columns?: ColumnDef<T>[];
  lsOrderKey?: string;
  lsVisibleKey?: string;
  searchable?: boolean;
  title?: string;
}

/* ------------------ Default Data ------------------- */
const defaultRows = [
  {
    id: 1,
    name: "Arjun Mehta",
    email: "arjun.mehta@company.com",
    role: "Manager",
    location: "Bangalore",
    status: "Active",
    balance: 1250,
  },
  {
    id: 2,
    name: "Hannah Park",
    email: "hannah.park@company.com",
    role: "Designer",
    location: "Seoul",
    status: "Active",
    balance: 600,
  },
  {
    id: 3,
    name: "Oliver Scott",
    email: "oliver.scott@company.com",
    role: "Engineer",
    location: "Manchester",
    status: "Inactive",
    balance: 650,
  },
  {
    id: 4,
    name: "Camila Torres",
    email: "camila.torres@company.com",
    role: "HR",
    location: "Bogotá",
    status: "Active",
    balance: 0,
  },
  {
    id: 5,
    name: "Kenji Tanaka",
    email: "kenji.tanaka@company.com",
    role: "Developer",
    location: "Osaka",
    status: "Suspended",
    balance: -1000,
  },
];

const defaultColumns: ColumnDef<(typeof defaultRows)[0]>[] = [
  { key: "name", label: "Name", width: "220px" },
  { key: "email", label: "Email", width: "260px" },
  { key: "role", label: "Role", width: "140px" },
  { key: "location", label: "Location", width: "160px" },
  {
    key: "status",
    label: "Status",
    width: "120px",
    render: (row) => (
      <span
        className={cn(
          "inline-block px-2 py-0.5 rounded-md text-sm font-medium",
          row.status === "Active"
            ? "bg-green-100 text-green-800 dark:bg-green-900/30"
            : row.status === "Inactive"
              ? "bg-slate-100 text-slate-800 dark:bg-slate-800/30"
              : "bg-red-100 text-red-800 dark:bg-red-900/30",
        )}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "balance",
    label: "Balance",
    width: "120px",
    render: (row) => `$${row.balance.toLocaleString()}`,
  },
];

/* ---------------- Component ---------------- */
export default function ReorderableTable<T extends ReorderableRow>({
  data = defaultRows as unknown as T[],
  columns = defaultColumns as unknown as ColumnDef<T>[],
  lsOrderKey = "reorderable_table_order_v1",
  lsVisibleKey = "reorderable_table_visible_v1",
  searchable = true,
  title = "Reorderable Table",
}: ReorderableTableProps<T>) {
  const columnKeys = columns.map((c) => c.key as string);

  // state
  const [rows] = useState<T[]>(data);
  const [query, setQuery] = useState("");

  const [columnOrder, setColumnOrder] = useState<string[]>(() => {
    if (typeof window === "undefined") return columnKeys;
    return JSON.parse(localStorage.getItem(lsOrderKey) || "null") || columnKeys;
  });

  const [visible, setVisible] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") {
      const initial: Record<string, boolean> = {};
      columnKeys.forEach((k) => (initial[k] = true));
      return initial;
    }
    const saved = JSON.parse(localStorage.getItem(lsVisibleKey) || "null");
    if (saved) return saved;
    const initial: Record<string, boolean> = {};
    columnKeys.forEach((k) => (initial[k] = true));
    return initial;
  });

  /* --- persist layout --- */
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(lsOrderKey, JSON.stringify(columnOrder));
    }
  }, [columnOrder, lsOrderKey]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(lsVisibleKey, JSON.stringify(visible));
    }
  }, [visible, lsVisibleKey]);

  /* --- ensure order is in sync with columns --- */
  useEffect(() => {
    setColumnOrder((prev) => {
      const missing = columnKeys.filter((k) => !prev.includes(k));
      return [...prev.filter((k) => columnKeys.includes(k)), ...missing];
    });
  }, [columnKeys]);

  const orderedColumns = useMemo(
    () =>
      columnOrder
        .map((k) => columns.find((c) => c.key === k))
        .filter(Boolean) as ColumnDef<T>[],
    [columnOrder, columns],
  );

  /* --- Search --- */
  const filtered = useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) =>
      Object.values(r).some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [rows, query]);

  /* --- Drag & Drop --- */
  const dragSrc = React.useRef<number | null>(null);
  const onDragStart = (e: React.DragEvent, i: number) => {
    dragSrc.current = i;
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    const src = dragSrc.current;
    if (src === null || src === i) return;
    setColumnOrder((prev) => {
      const next = [...prev];
      const [moved] = next.splice(src, 1);
      next.splice(i, 0, moved);
      return next;
    });
    dragSrc.current = null;
  };

  const moveColumn = (key: string, dir: -1 | 1) => {
    setColumnOrder((prev) => {
      const idx = prev.indexOf(key);
      const nextIdx = idx + dir;
      if (idx < 0 || nextIdx < 0 || nextIdx >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(idx, 1);
      next.splice(nextIdx, 0, moved);
      return next;
    });
  };

  const toggleVisible = (key: string) =>
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));

  const resetLayout = () => {
    setColumnOrder(columnKeys);
    const all: Record<string, boolean> = {};
    columnKeys.forEach((k) => (all[k] = true));
    setVisible(all);
    localStorage.removeItem(lsOrderKey);
    localStorage.removeItem(lsVisibleKey);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {searchable && (
          <div className="flex gap-2">
            <Input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" onClick={() => setQuery("")}>
              Clear
            </Button>
          </div>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Columns</Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="flex flex-col gap-2">
              {columns.map((c) => (
                <label key={String(c.key)} className="flex items-center gap-2">
                  <Checkbox
                    checked={!!visible[String(c.key)]}
                    onCheckedChange={() => toggleVisible(String(c.key))}
                  />
                  <span className="text-sm">{c.label}</span>
                </label>
              ))}
              <div className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={resetLayout}>
                  Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const visKeys = Object.entries(visible)
                      .filter(([, v]) => v)
                      .map(([k]) => k);
                    setColumnOrder((prev) => [
                      ...visKeys,
                      ...prev.filter((k) => !visKeys.includes(k)),
                    ]);
                  }}
                >
                  Bring visible front
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="border rounded-md overflow-auto">
        <Table className="min-w-full border-separate border-spacing-0">
          <TableHeader className="sticky top-0 bg-background/90 backdrop-blur-sm z-10">
            <TableRow>
              {orderedColumns.map((col, idx) =>
                visible[String(col.key)] ? (
                  <TableHead key={String(col.key)} style={{ width: col.width }}>
                    <div
                      draggable
                      onDragStart={(e) => onDragStart(e, idx)}
                      onDragOver={onDragOver}
                      onDrop={(e) => onDrop(e, idx)}
                      className="flex items-center justify-between select-none gap-2"
                    >
                      <span>{col.label}</span>
                      <span className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => moveColumn(String(col.key), -1)}
                        >
                          <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => moveColumn(String(col.key), 1)}
                        >
                          <ChevronsRight className="h-4 w-4" />
                        </Button>
                      </span>
                    </div>
                  </TableHead>
                ) : null,
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((row, i) => (
              <TableRow key={i} className="hover:bg-muted/10">
                {orderedColumns.map((col) =>
                  visible[String(col.key)] ? (
                    <TableCell key={String(col.key)}>
                      {col.render ? col.render(row) : String(row[col.key])}
                    </TableCell>
                  ) : null,
                )}
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="sticky bottom-0 bg-background/90">
            <TableRow>
              <TableCell
                colSpan={
                  orderedColumns.filter((c) => visible[String(c.key)]).length -
                  1
                }
              >
                Total: {filtered.length} rows
              </TableCell>
              {visible["balance"] ? (
                <TableCell className="text-right font-semibold">
                  $
                  {filtered
                    .reduce((sum, r: any) => sum + (r.balance || 0), 0)
                    .toLocaleString()}
                </TableCell>
              ) : (
                <TableCell className="text-right">—</TableCell>
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
