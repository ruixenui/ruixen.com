"use client";

import FlexiFilterTable from "@/registry/ruixenui/flexi-filter-table";

const customData = [
  {
    id: 1,
    name: "Evelyn Carter",
    email: "evelyn@company.com",
    location: "Berlin",
    status: "Active",
    balance: 900,
    joined: new Date(2024, 4, 12),
  },
  {
    id: 2,
    name: "Mark Lee",
    email: "mark.lee@company.com",
    location: "Tokyo",
    status: "Inactive",
    balance: 400,
    joined: new Date(2023, 7, 3),
  },
];

export default function DemoPage() {
  return (
    <div className="p-6">
      <FlexiFilterTable
        data={customData}
        statuses={["Active", "Inactive", "Suspended"]}
        locations={["Berlin", "Tokyo"]}
        title="Employee Records"
      />
    </div>
  );
}
