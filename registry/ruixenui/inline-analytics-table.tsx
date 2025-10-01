"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

export type AnalyticsItem = {
  id: string;
  region: string;
  sales: number;
  revenue: number;
  growth: number;
};

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  showProgress?: boolean;
  progressValue?: number;
  align?: string;
  render?: (item: T) => React.ReactNode;
};

export type InlineAnalyticsTableProps<T extends AnalyticsItem> = {
  data?: T[];
  columns?: ColumnConfig<T>[];
  defaultProgress?: number;
};

const defaultData: AnalyticsItem[] = [
  { id: "1", region: "North America", sales: 1200, revenue: 25000, growth: 12 },
  { id: "2", region: "Europe", sales: 900, revenue: 18000, growth: -5 },
  { id: "3", region: "Asia", sales: 1500, revenue: 30000, growth: 20 },
  { id: "4", region: "South America", sales: 600, revenue: 10000, growth: 8 },
  { id: "5", region: "Africa", sales: 400, revenue: 7000, growth: -3 },
];

const defaultColumns: ColumnConfig<AnalyticsItem>[] = [
  { key: "region", label: "Region", align: "text-left" },
  { key: "sales", label: "Sales", showProgress: true, progressValue: 70 },
  { key: "revenue", label: "Revenue", showProgress: true, progressValue: 60 },
  { key: "growth", label: "Growth", showProgress: true, progressValue: 50 },
  {
    key: "growth",
    label: "Trend",
    align: "text-right",
    render: (item) =>
      item.growth >= 0 ? (
        <TrendingUp className="h-4 w-4 text-green-500" />
      ) : (
        <TrendingDown className="h-4 w-4 text-red-500" />
      ),
  },
];

export default function InlineAnalyticsTable<T extends AnalyticsItem>({
  data = defaultData as T[],
  columns = defaultColumns as ColumnConfig<T>[],
  defaultProgress = 50,
}: InlineAnalyticsTableProps<T>) {
  return (
    <div className="bg-background p-4 overflow-x-auto">
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col.key)} className={col.align ?? ""}>
                {col.showProgress ? (
                  <div className="flex flex-col">
                    <span>{col.label}</span>
                    <Progress
                      value={col.progressValue ?? defaultProgress}
                      className="h-1 mt-1"
                    />
                  </div>
                ) : (
                  col.label
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((col) => (
                <TableCell key={String(col.key)} className={col.align ?? ""}>
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>
              $
              {data.reduce((acc, cur) => acc + cur.revenue, 0).toLocaleString()}
            </TableCell>
            <TableCell colSpan={columns.length - 3}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Configurable Inline Analytics Table
      </p>
    </div>
  );
}
