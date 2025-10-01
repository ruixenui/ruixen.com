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
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleFadingPlus } from "lucide-react";

/** --- Types --- */
export type ColumnCollaborationItem = {
  id: string;
  [key: string]: string;
};

export type ColumnCollaborationTableProps = {
  columns?: string[];
  data?: ColumnCollaborationItem[];
};

/** --- Default Data --- */
const defaultColumns = ["Name", "Email", "Location", "Status", "Balance"];

const defaultData: ColumnCollaborationItem[] = [
  {
    id: "1",
    Name: "Arjun Mehta",
    Email: "arjun.mehta@company.com",
    Location: "Bangalore, IN",
    Status: "Active",
    Balance: "$1,250.00",
  },
  {
    id: "2",
    Name: "Hannah Park",
    Email: "hannah.park@company.com",
    Location: "Seoul, KR",
    Status: "Active",
    Balance: "$600.00",
  },
  {
    id: "3",
    Name: "Oliver Scott",
    Email: "oliver.scott@company.com",
    Location: "Manchester, UK",
    Status: "Inactive",
    Balance: "$650.00",
  },
  {
    id: "4",
    Name: "Camila Torres",
    Email: "camila.torres@company.com",
    Location: "Bogotá, CO",
    Status: "Active",
    Balance: "$0.00",
  },
  {
    id: "5",
    Name: "Kenji Tanaka",
    Email: "kenji.tanaka@company.com",
    Location: "Osaka, JP",
    Status: "Active",
    Balance: "-$1,000.00",
  },
];

/** --- Component --- */
export default function ColumnCollaborationTable({
  columns = defaultColumns,
  data = defaultData,
}: ColumnCollaborationTableProps) {
  const [comments, setComments] = React.useState<{ [key: string]: string[] }>(
    {},
  );
  const [newComment, setNewComment] = React.useState<{ [key: string]: string }>(
    {},
  );

  const addComment = (column: string) => {
    if (!newComment[column]) return;
    setComments((prev) => ({
      ...prev,
      [column]: [...(prev[column] || []), newComment[column]],
    }));
    setNewComment((prev) => ({ ...prev, [column]: "" }));
  };

  return (
    <div className="bg-background p-4 rounded-lg border">
      <ScrollArea className="max-h-[400px]">
        <Table className="w-full border-separate border-spacing-0">
          {/* Header with popovers */}
          <TableHeader className="sticky top-0 bg-background/90 backdrop-blur-sm z-10">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col} className="relative">
                  <div className="flex items-center justify-between">
                    {col}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="ml-2 p-1"
                        >
                          <CircleFadingPlus className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2">
                        <div className="flex flex-col gap-2">
                          <ScrollArea className="max-h-32">
                            <ul className="space-y-1">
                              {(comments[col] || []).map((cmt, i) => (
                                <li key={i} className="text-sm border-b pb-1">
                                  {cmt}
                                </li>
                              ))}
                              {(!comments[col] ||
                                comments[col].length === 0) && (
                                <li className="text-sm text-muted-foreground">
                                  No comments
                                </li>
                              )}
                            </ul>
                          </ScrollArea>
                          <div className="flex gap-2">
                            <Input
                              value={newComment[col] || ""}
                              onChange={(e) =>
                                setNewComment((prev) => ({
                                  ...prev,
                                  [col]: e.target.value,
                                }))
                              }
                              placeholder="Add comment"
                              className="flex-1"
                            />
                            <Button size="sm" onClick={() => addComment(col)}>
                              Add
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={col}>{item[col] || "-"}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

          {/* Footer */}
          <TableFooter className="bg-background/50 sticky bottom-0 backdrop-blur-sm">
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-right font-medium"
              >
                Total Rows: {data.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
    </div>
  );
}
