"use client";

import ReorderableTable, {
  ColumnDef,
} from "@/registry/ruixenui/reorderable-table";

export default function ReorderableTableDemo() {
  // --- Custom Data Example ---
  const customData = [
    {
      id: 1,
      name: "John Doe",
      department: "Engineering",
      salary: 90000,
      status: "Active",
    },
    {
      id: 2,
      name: "Anna Smith",
      department: "HR",
      salary: 70000,
      status: "Inactive",
    },
    {
      id: 3,
      name: "Mark Lee",
      department: "Finance",
      salary: 80000,
      status: "Active",
    },
    {
      id: 4,
      name: "Sophia Liu",
      department: "Marketing",
      salary: 75000,
      status: "Suspended",
    },
  ];

  const customColumns: ColumnDef<(typeof customData)[0]>[] = [
    { key: "name", label: "Full Name", width: "200px" },
    { key: "department", label: "Department", width: "150px" },
    {
      key: "salary",
      label: "Salary",
      width: "120px",
      render: (row) => `$${row.salary.toLocaleString()}`,
    },
    {
      key: "status",
      label: "Status",
      width: "120px",
      render: (row) => {
        const statusColors = {
          Active: "bg-green-100 text-green-800",
          Inactive: "bg-gray-100 text-gray-800",
          Suspended: "bg-red-100 text-red-800",
        };
        const status = row.status as keyof typeof statusColors;
        return (
          <span
            className={`inline-block px-2 py-0.5 rounded-md text-sm font-medium ${statusColors[status]}`}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-10">
      <div>
        <ReorderableTable title="Default Users Table" />
      </div>

      <div>
        <ReorderableTable
          title="Employee Table"
          data={customData}
          columns={customColumns}
          lsOrderKey="employee_table_order"
          lsVisibleKey="employee_table_visible"
        />
      </div>
    </div>
  );
}
