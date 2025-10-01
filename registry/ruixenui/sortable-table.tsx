"use client";

import * as React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type TableUser = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
  salary: number;
};

type SortableTableProps = {
  data?: TableUser[];
  title?: string;
};

const defaultData: TableUser[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.j@company.com",
    department: "Engineering",
    role: "Senior Engineer",
    status: "Active",
    salary: 120000,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.s@company.com",
    department: "Marketing",
    role: "Marketing Manager",
    status: "Active",
    salary: 95000,
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie.b@company.com",
    department: "Sales",
    role: "Sales Rep",
    status: "Inactive",
    salary: 70000,
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana.p@company.com",
    department: "Engineering",
    role: "Lead Developer",
    status: "Active",
    salary: 135000,
  },
  {
    id: "5",
    name: "Ethan Hunt",
    email: "ethan.h@company.com",
    department: "Operations",
    role: "Operations Manager",
    status: "Pending",
    salary: 85000,
  },
  {
    id: "6",
    name: "Fiona Green",
    email: "fiona.g@company.com",
    department: "HR",
    role: "HR Specialist",
    status: "Active",
    salary: 75000,
  },
  {
    id: "7",
    name: "George Miller",
    email: "george.m@company.com",
    department: "Engineering",
    role: "Junior Developer",
    status: "Active",
    salary: 80000,
  },
  {
    id: "8",
    name: "Hannah Lee",
    email: "hannah.l@company.com",
    department: "Sales",
    role: "Account Executive",
    status: "Active",
    salary: 90000,
  },
];

export default function SortableTable({
  data = defaultData,
  title = "Employee Directory",
}: SortableTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof TableUser | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof TableUser) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredData = React.useMemo(() => {
    return data.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [data, searchTerm]);

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (sortDirection === "asc") {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      } else {
        return bStr < aStr ? -1 : bStr > aStr ? 1 : 0;
      }
    });
  }, [filteredData, sortColumn, sortDirection]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1 p-0 h-auto font-semibold"
                  >
                    Name <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("email")}
                    className="flex items-center gap-1 p-0 h-auto font-semibold"
                  >
                    Email <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("department")}
                    className="flex items-center gap-1 p-0 h-auto font-semibold"
                  >
                    Department <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("role")}
                    className="flex items-center gap-1 p-0 h-auto font-semibold"
                  >
                    Role <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("status")}
                    className="flex items-center gap-1 p-0 h-auto font-semibold"
                  >
                    Status <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("salary")}
                    className="flex items-center gap-1 p-0 h-auto font-semibold ml-auto"
                  >
                    Salary <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Active"
                            ? "default"
                            : user.status === "Inactive"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${user.salary.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        Showing {sortedData.length} of {data.length} entries
      </div>
    </div>
  );
}
