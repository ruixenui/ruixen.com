"use client";

import * as React from "react";
import FixedHeaderFooterTable, {
  TableItem,
} from "@/registry/ruixenui/fixed-header-footer-table";

export default function DemoPage() {
  // Optional: Custom data for demo
  const customItems: TableItem[] = [
    {
      id: "101",
      name: "Alice Johnson",
      email: "alice.johnson@company.com",
      location: "New York, US",
      status: "Active",
      balance: 1200,
    },
    {
      id: "102",
      name: "Bob Smith",
      email: "bob.smith@company.com",
      location: "London, UK",
      status: "Inactive",
      balance: 800,
    },
    {
      id: "103",
      name: "Charlie Lee",
      email: "charlie.lee@company.com",
      location: "Sydney, AU",
      status: "Active",
      balance: 1500,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">
        Fixed Header & Footer Table Demo
      </h1>

      {/* Table with default props */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Default Table</h2>
        <FixedHeaderFooterTable />
      </div>

      {/* Table with custom data */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Custom Data Table</h2>
        <FixedHeaderFooterTable
          items={customItems}
          title="Custom Users Table"
          footerTotal={customItems.reduce((acc, item) => acc + item.balance, 0)}
        />
      </div>
    </div>
  );
}
