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
      <div>
        <FixedHeaderFooterTable />
      </div>

      <div>
        <FixedHeaderFooterTable
          items={customItems}
          title="Custom Users Table"
          footerTotal={customItems.reduce((acc, item) => acc + item.balance, 0)}
        />
      </div>
    </div>
  );
}
