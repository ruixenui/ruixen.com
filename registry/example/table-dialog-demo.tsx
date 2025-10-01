"use client";

import { useState } from "react";
import TableDialog, { User } from "@/registry/ruixenui/table-dialog";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const customData: User[] = [
    {
      id: "10",
      name: "Liam Smith",
      email: "liam@company.com",
      role: "Developer",
      status: "Active",
      balance: "$1,000.00",
    },
    {
      id: "11",
      name: "Emma Brown",
      email: "emma@company.com",
      role: "Designer",
      status: "Inactive",
      balance: "$500.00",
    },
    {
      id: "12",
      name: "Noah Johnson",
      email: "noah@company.com",
      role: "Manager",
      status: "Active",
      balance: "$2,100.00",
    },
  ];

  const [useCustom, setUseCustom] = useState(false);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Configurable Editable Table Demo</h1>
      <div className="flex gap-4">
        <Button onClick={() => setUseCustom(false)}>Use Default Data</Button>
        <Button onClick={() => setUseCustom(true)}>Use Custom Data</Button>
      </div>

      <TableDialog
        data={useCustom ? customData : undefined}
        footerTotal={useCustom ? "$3,600.00" : undefined}
        maxHeight="450px"
      />
    </div>
  );
}
