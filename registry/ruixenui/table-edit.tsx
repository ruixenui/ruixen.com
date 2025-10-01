"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  balance: string;
};

export type ConfigurableTableProps = {
  data?: User[];
  footerTotal?: string;
};

const defaultUsers: User[] = [
  {
    id: "1",
    name: "Arjun Mehta",
    email: "arjun.mehta@company.com",
    role: "Manager",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Hannah Park",
    email: "hannah.park@company.com",
    role: "Designer",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "Oliver Scott",
    email: "oliver.scott@company.com",
    role: "Engineer",
    status: "Inactive",
    balance: "$650.00",
  },
  {
    id: "4",
    name: "Camila Torres",
    email: "camila.torres@company.com",
    role: "Engineer",
    status: "Active",
    balance: "$900.00",
  },
];

export default function ConfigurableEditableTable({
  data = defaultUsers,
  footerTotal = "$3,400.00",
}: ConfigurableTableProps) {
  const [users, setUsers] = useState<User[]>(data);
  const [selected, setSelected] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditData({ ...user });
  };

  const saveEdit = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? ({ ...u, ...editData } as User) : u)),
    );
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="bg-background border rounded-md shadow-sm max-w-4xl overflow-hidden">
      <div className="max-h-[400px] overflow-y-auto">
        <Table>
          {/* Fixed Header */}
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selected.length === users.length}
                  onCheckedChange={(checked) =>
                    setSelected(checked ? users.map((u) => u.id) : [])
                  }
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/40">
                <TableCell>
                  <Checkbox
                    checked={selected.includes(user.id)}
                    onCheckedChange={() => toggleSelect(user.id)}
                  />
                </TableCell>

                {editingId === user.id ? (
                  <>
                    <TableCell className="font-medium">
                      <Input
                        value={editData.name || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="h-8 px-2"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editData.email || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        className="h-8 px-2"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editData.role || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, role: e.target.value })
                        }
                        className="h-8 px-2"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editData.status || "Active"}
                        onValueChange={(val) =>
                          setEditData({
                            ...editData,
                            status: val as "Active" | "Inactive",
                          })
                        }
                      >
                        <SelectTrigger className="h-8 w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        value={editData.balance || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, balance: e.target.value })
                        }
                        className="h-8 px-2 text-right"
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => saveEdit(user.id)}>
                        Save
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{user.balance}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => startEdit(user)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>

          {/* Fixed Footer */}
          <TableFooter className="sticky bottom-0 bg-background">
            <TableRow>
              <TableCell colSpan={5}>
                {selected.length > 0
                  ? `${selected.length} selected`
                  : "No rows selected"}
              </TableCell>
              <TableCell colSpan={2} className="text-right">
                Total: {footerTotal}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
