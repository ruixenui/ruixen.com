"use client";

import * as React from "react";
import MinimisableTable, {
  ColumnConfig,
} from "@/registry/ruixenui/minimisable-table";
import { User, Mail, MapPin, ShieldCheck, DollarSign } from "lucide-react";

type CustomRow = {
  id: string;
  fullName: string;
  emailAddress: string;
  city: string;
  status: "Active" | "Inactive";
  balanceUSD: string;
};

export default function MinimisableTableDemo() {
  const customData: CustomRow[] = [
    {
      id: "1",
      fullName: "Srinath G",
      emailAddress: "srinath.g@company.com",
      city: "Bangalore, IN",
      status: "Active",
      balanceUSD: "$2,500.00",
    },
    {
      id: "2",
      fullName: "Alice Wong",
      emailAddress: "alice.wong@company.com",
      city: "Singapore",
      status: "Inactive",
      balanceUSD: "$1,200.00",
    },
    {
      id: "3",
      fullName: "John Doe",
      emailAddress: "john.doe@company.com",
      city: "New York, USA",
      status: "Active",
      balanceUSD: "$3,100.00",
    },
  ];

  const customColumns: ColumnConfig<CustomRow>[] = [
    { key: "fullName", label: "Full Name", icon: <User className="h-4 w-4" /> },
    { key: "emailAddress", label: "Email", icon: <Mail className="h-4 w-4" /> },
    { key: "city", label: "City", icon: <MapPin className="h-4 w-4" /> },
    {
      key: "status",
      label: "Status",
      icon: <ShieldCheck className="h-4 w-4" />,
    },
    {
      key: "balanceUSD",
      label: "Balance",
      icon: <DollarSign className="h-4 w-4" />,
      align: "text-right",
    },
  ];

  return (
    <div className="space-y-10 p-6">
      <h1 className="text-2xl font-bold">Minimisable Table Demo</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default Table</h2>
        <MinimisableTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Table</h2>
        <MinimisableTable
          data={customData}
          columns={customColumns}
          defaultMinimized={["status", "balanceUSD"]}
        />
      </section>
    </div>
  );
}
