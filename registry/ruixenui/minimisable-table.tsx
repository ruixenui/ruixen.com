"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  Mail,
  MapPin,
  User,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

export type ColumnKey = string;

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  icon: React.ReactNode;
  align?: string;
};

export type MinimisableTableProps<T> = {
  data?: T[];
  columns?: ColumnConfig<T>[];
  defaultMinimized?: ColumnKey[];
};

const defaultData = [
  {
    id: "1",
    name: "Arjun Mehta",
    email: "arjun.mehta@company.com",
    location: "Bangalore, IN",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Hannah Park",
    email: "hannah.park@company.com",
    location: "Seoul, KR",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "Oliver Scott",
    email: "oliver.scott@company.com",
    location: "Manchester, UK",
    status: "Inactive",
    balance: "$650.00",
  },
];

const defaultColumns: ColumnConfig<(typeof defaultData)[0]>[] = [
  { key: "name", label: "Name", icon: <User className="h-4 w-4" /> },
  { key: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
  { key: "location", label: "Location", icon: <MapPin className="h-4 w-4" /> },
  { key: "status", label: "Status", icon: <ShieldCheck className="h-4 w-4" /> },
  {
    key: "balance",
    label: "Balance",
    icon: <DollarSign className="h-4 w-4" />,
    align: "text-right",
  },
];

export default function MinimisableTable<T extends { id: string }>({
  data = defaultData as unknown as T[],
  columns = defaultColumns as unknown as ColumnConfig<T>[],
  defaultMinimized = [],
}: MinimisableTableProps<T>) {
  const [minimized, setMinimized] =
    React.useState<ColumnKey[]>(defaultMinimized);

  const toggleMinimise = (col: ColumnKey) => {
    setMinimized((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col],
    );
  };

  return (
    <div className="w-full space-y-4 px-4 max-w-xl">
      {/* Manage Columns Dropdown */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Manage Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((col) => (
              <DropdownMenuItem
                key={String(col.key)}
                onClick={() => toggleMinimise(String(col.key))}
                className="flex justify-between"
              >
                <span>
                  {minimized.includes(String(col.key))
                    ? `Expand ${col.label}`
                    : `Minimise ${col.label}`}
                </span>
                {minimized.includes(String(col.key)) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={`${col.align ?? ""} ${
                  minimized.includes(String(col.key)) ? "w-12 text-center" : ""
                }`}
              >
                {minimized.includes(String(col.key)) ? col.icon : col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  className={`${col.align ?? ""} ${
                    minimized.includes(String(col.key))
                      ? "w-12 text-center"
                      : ""
                  }`}
                >
                  {minimized.includes(String(col.key))
                    ? col.icon
                    : (row as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
