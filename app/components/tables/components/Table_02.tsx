"use client";

import { useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const codeStringTable_02 = `
"use client";

import { useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Column<T> {
  accessor: keyof T;
  label: string;
  sortable?: boolean;
  className?: string;
}

interface Table02Props<T> {
  columns: Column<T>[];
  data: T[];
  highlightOnHover?: boolean;
}

export function Table_02<T extends Record<string, any>>({
  columns,
  data,
  highlightOnHover = true,
}: Table02Props<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

  const sortedData = (() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal === bVal) return 0;
      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  })();

  const handleSort = (accessor: keyof T) => {
    setSortConfig((prev) => {
      if (prev?.key === accessor) {
        return { key: accessor, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key: accessor, direction: "asc" };
    });
  };

  return (
    <Card className="shadow-md rounded-2xl border bg-background">
      <CardContent className="p-4 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.accessor)} className={cn(col.className, "text-muted-foreground")}>
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0"
                        onClick={() => handleSort(col.accessor)}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, idx) => (
              <TableRow
                key={idx}
                className={cn(
                  highlightOnHover && "hover:bg-muted/50 transition-colors cursor-pointer"
                )}
              >
                {columns.map((col) => (
                  <TableCell key={String(col.accessor)}>
                    {String(row[col.accessor] ?? "-")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4 text-muted-foreground">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
`;

interface Column<T> {
  accessor: keyof T;
  label: string;
  sortable?: boolean;
  className?: string;
}

interface Table_02Props<T> {
  columns: Column<T>[];
  data: T[];
  highlightOnHover?: boolean;
}

export default function Table_02<T extends Record<string, any>>({
  columns,
  data,
  highlightOnHover = true,
}: Table_02Props<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

  const sortedData = (() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal === bVal) return 0;
      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  })();

  const handleSort = (accessor: keyof T) => {
    setSortConfig((prev) => {
      if (prev?.key === accessor) {
        return { key: accessor, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key: accessor, direction: "asc" };
    });
  };

  return (
    <Card className="shadow-md rounded-2xl border bg-background">
      <CardContent className="p-4 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.accessor)} className={cn(col.className, "text-muted-foreground")}>
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0"
                        onClick={() => handleSort(col.accessor)}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, idx) => (
              <TableRow
                key={idx}
                className={cn(
                  highlightOnHover && "hover:bg-muted/50 transition-colors cursor-pointer"
                )}
              >
                {columns.map((col) => (
                  <TableCell key={String(col.accessor)}>
                    {String(row[col.accessor] ?? "-")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4 text-muted-foreground">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
