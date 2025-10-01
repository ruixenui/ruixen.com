"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";

/* --------------------------------
   Default Data
----------------------------------*/
const defaultData = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.t@company.com",
    location: "San Francisco",
    status: "Active",
    balance: 1250,
    joined: new Date(2023, 3, 10),
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    location: "Singapore",
    status: "Active",
    balance: 600,
    joined: new Date(2023, 6, 20),
  },
  {
    id: 3,
    name: "James Wilson",
    email: "j.wilson@company.com",
    location: "London",
    status: "Inactive",
    balance: 650,
    joined: new Date(2022, 11, 5),
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "m.garcia@company.com",
    location: "Madrid",
    status: "Active",
    balance: 0,
    joined: new Date(2023, 0, 15),
  },
  {
    id: 5,
    name: "David Kim",
    email: "d.kim@company.com",
    location: "Seoul",
    status: "Active",
    balance: -1000,
    joined: new Date(2024, 2, 2),
  },
];

const defaultLocations = [
  "San Francisco",
  "Singapore",
  "London",
  "Madrid",
  "Seoul",
];
const defaultStatuses = ["Active", "Inactive"];

/* --------------------------------
   Props Interface
----------------------------------*/
interface FlexiFilterTableProps {
  data?: typeof defaultData; // Table data
  statuses?: string[]; // Filter options for status
  locations?: string[]; // Filter options for location
  title?: string; // Optional table title
}

export default function FlexiFilterTable({
  data = defaultData,
  statuses = defaultStatuses,
  locations = defaultLocations,
  title = "Flexi Filter Table",
}: FlexiFilterTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [location, setLocation] = useState("Location");
  const [minBalance, setMinBalance] = useState("");
  const [maxBalance, setMaxBalance] = useState("");
  const [joinedAfter, setJoinedAfter] = useState<Date | undefined>();

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (status !== "All" && item.status !== status) return false;
      if (location !== "Location" && item.location !== location) return false;
      if (
        search &&
        !`${item.name} ${item.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
        return false;
      if (minBalance && item.balance < Number(minBalance)) return false;
      if (maxBalance && item.balance > Number(maxBalance)) return false;
      if (joinedAfter && item.joined < joinedAfter) return false;
      return true;
    });
  }, [data, search, status, location, minBalance, maxBalance, joinedAfter]);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="bg-background border rounded-lg overflow-hidden shadow-md">
      {/* Optional Title */}
      <h2 className="px-4 pt-4 text-lg font-semibold">{title}</h2>

      {/* Filters */}
      <div className="p-4 flex flex-col gap-3 md:flex-row md:flex-wrap items-start md:items-center">
        <Input
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/4"
        />

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{status}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["All", ...statuses].map((s) => (
              <DropdownMenuItem key={s} onClick={() => setStatus(s)}>
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Location Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{location}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Location", ...locations].map((loc) => (
              <DropdownMenuItem key={loc} onClick={() => setLocation(loc)}>
                {loc}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Balance Range */}
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min $"
            value={minBalance}
            onChange={(e) => setMinBalance(e.target.value)}
            className="w-24"
          />
          <Input
            type="number"
            placeholder="Max $"
            value={maxBalance}
            onChange={(e) => setMaxBalance(e.target.value)}
            className="w-24"
          />
        </div>

        {/* Date Joined */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {joinedAfter ? joinedAfter.toDateString() : "Joined After"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={joinedAfter}
              onSelect={setJoinedAfter}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Table */}
      <div className="max-h-[400px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={selectedRows.size === data.length}
                  onCheckedChange={(checked) =>
                    setSelectedRows(
                      checked ? new Set(data.map((d) => d.id)) : new Set(),
                    )
                  }
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/30">
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(row.id)}
                    onCheckedChange={() => toggleRow(row.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.status === "Active" ? "secondary" : "destructive"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>${row.balance.toLocaleString()}</TableCell>
                <TableCell>{row.joined.toDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="sticky bottom-0 bg-background">
            <TableRow>
              <TableCell colSpan={7}>Total Users</TableCell>
              <TableCell>{filteredData.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
