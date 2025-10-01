"use client";

import TableWithDialog, { User } from "@/registry/ruixenui/table-with-dialog";

const customUsers: User[] = [
  {
    id: "101",
    name: "Emma Watson",
    email: "emma.w@company.com",
    location: "London, UK",
    status: "Active",
    balance: "$1,800.00",
  },
  {
    id: "102",
    name: "Liam Smith",
    email: "liam.s@company.com",
    location: "New York, US",
    status: "Inactive",
    balance: "$950.00",
  },
  {
    id: "103",
    name: "Olivia Brown",
    email: "olivia.b@company.com",
    location: "Toronto, CA",
    status: "Suspended",
    balance: "-$500.00",
  },
];

export default function TableDemoPage() {
  return (
    <div className="space-y-10 p-6">
      {/* Default Table */}
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Default Table (Uses Default Props)
        </h1>
        <TableWithDialog />
      </div>

      {/* Custom Data Table */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Custom Data Table</h1>
        <TableWithDialog
          data={customUsers}
          title="Custom User Table"
          footerTotal="$2,250.00"
        />
      </div>
    </div>
  );
}
