"use client";

import { useState } from "react";
import ConfigurableEditableTable, {
  User,
} from "@/registry/ruixenui/table-edit";
import { Button } from "@/components/ui/button";

export default function TableDemoPage() {
  const customData: User[] = [
    {
      id: "101",
      name: "Liam Johnson",
      email: "liam.j@custom.com",
      role: "Developer",
      status: "Active",
      balance: "$1,500.00",
    },
    {
      id: "102",
      name: "Emma Brown",
      email: "emma.b@custom.com",
      role: "Designer",
      status: "Inactive",
      balance: "$700.00",
    },
    {
      id: "103",
      name: "Noah Smith",
      email: "noah.s@custom.com",
      role: "Manager",
      status: "Active",
      balance: "$2,000.00",
    },
  ];

  const [useCustom, setUseCustom] = useState(false);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Configurable Editable Table Demo</h1>

      <div className="flex gap-4">
        <Button
          onClick={() => setUseCustom(false)}
          variant={useCustom ? "outline" : "default"}
        >
          Use Default Data
        </Button>
        <Button
          onClick={() => setUseCustom(true)}
          variant={useCustom ? "default" : "outline"}
        >
          Use Custom Data
        </Button>
      </div>

      <ConfigurableEditableTable
        data={useCustom ? customData : undefined}
        footerTotal={useCustom ? "$4,200.00" : undefined}
      />
    </div>
  );
}
