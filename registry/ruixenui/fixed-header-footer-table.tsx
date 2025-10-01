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

export type TableItem = {
  id: string;
  name: string;
  email: string;
  location: string;
  status: string;
  balance: number;
};

type FixedHeaderFooterTableProps = {
  items?: TableItem[];
  footerTotal?: number;
  title?: string;
};

const defaultItems: TableItem[] = [
  {
    id: "1",
    name: "Arjun Mehta",
    email: "arjun.mehta@company.com",
    location: "Bangalore, IN",
    status: "Active",
    balance: 1250,
  },
  {
    id: "2",
    name: "Hannah Park",
    email: "hannah.park@company.com",
    location: "Seoul, KR",
    status: "Active",
    balance: 600,
  },
  {
    id: "3",
    name: "Oliver Scott",
    email: "oliver.scott@company.com",
    location: "Manchester, UK",
    status: "Inactive",
    balance: 650,
  },
  {
    id: "4",
    name: "Camila Torres",
    email: "camila.torres@company.com",
    location: "Bogotá, CO",
    status: "Active",
    balance: 0,
  },
  {
    id: "5",
    name: "Kenji Tanaka",
    email: "kenji.tanaka@company.com",
    location: "Osaka, JP",
    status: "Active",
    balance: -1000,
  },
  {
    id: "6",
    name: "Michael Adams",
    email: "m.adams@company.com",
    location: "Chicago, US",
    status: "Active",
    balance: 1500,
  },
  {
    id: "7",
    name: "Elena Petrova",
    email: "elena.petrova@company.com",
    location: "Moscow, RU",
    status: "Inactive",
    balance: 200,
  },
  {
    id: "8",
    name: "Carlos Mendes",
    email: "carlos.mendes@company.com",
    location: "Rio de Janeiro, BR",
    status: "Active",
    balance: 1000,
  },
  {
    id: "9",
    name: "Yuki Sato",
    email: "yuki.sato@company.com",
    location: "Nagoya, JP",
    status: "Active",
    balance: 500,
  },
  {
    id: "10",
    name: "Meera Iyer",
    email: "meera.iyer@company.com",
    location: "Chennai, IN",
    status: "Inactive",
    balance: 300,
  },
];

export default function FixedHeaderFooterTable({
  items = defaultItems,
  footerTotal,
  title = "Users Table",
}: FixedHeaderFooterTableProps) {
  const totalBalance =
    footerTotal !== undefined
      ? footerTotal
      : items.reduce((acc, item) => acc + item.balance, 0);

  return (
    <div className="bg-background w-full max-w-5xl mx-auto">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

      <div className="h-96 flex flex-col border rounded-lg overflow-hidden">
        {/* Table header */}
        <div className="flex-none">
          <Table className="w-full border-separate border-spacing-0">
            <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          <Table className="w-full border-separate border-spacing-0 [&_td]:border-border [&_tr:not(:last-child)_td]:border-b">
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell className="text-right">{item.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Table footer */}
        <div className="flex-none">
          <Table className="w-full border-separate border-spacing-0">
            <TableFooter className="sticky bottom-0 bg-background/90 backdrop-blur-sm">
              <TableRow>
                <TableCell colSpan={4} className="font-medium">
                  Total
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${totalBalance.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Table with fixed header & footer, scrollable body
      </p>
    </div>
  );
}
