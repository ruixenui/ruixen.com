"use client";

import ColumnCollaborationTable, {
  ColumnCollaborationItem,
} from "@/registry/ruixenui/column-collaboration-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoPage() {
  const customColumns = ["Name", "Email", "Status"];
  const customData: ColumnCollaborationItem[] = [
    {
      id: "101",
      Name: "Srinath G",
      Email: "srinath@opencvuniversity.com",
      Status: "Active",
    },
    {
      id: "102",
      Name: "Arjun M",
      Email: "arjun@opencvuniversity.com",
      Status: "Inactive",
    },
  ];

  return (
    <div className="space-y-8 p-8">
      {/* Default Table */}
      <Card>
        <CardHeader>
          <CardTitle>Default Column Collaboration Table</CardTitle>
        </CardHeader>
        <CardContent>
          <ColumnCollaborationTable />
        </CardContent>
      </Card>

      {/* Custom Table */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Column Collaboration Table</CardTitle>
        </CardHeader>
        <CardContent>
          <ColumnCollaborationTable columns={customColumns} data={customData} />
        </CardContent>
      </Card>
    </div>
  );
}
