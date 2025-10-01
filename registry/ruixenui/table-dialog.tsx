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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  balance: string;
};

export type ConfigurableEditableTableProps = {
  /** Pass your own data to override defaults */
  data?: User[];
  /** Total balance to show in the footer */
  footerTotal?: string;
  /** Allows you to set a custom height for the scrollable section */
  maxHeight?: string;
};

/** Default table data */
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

export default function TableDialog({
  data = defaultUsers,
  footerTotal = "$3,400.00",
  maxHeight = "400px",
}: ConfigurableEditableTableProps) {
  const [users, setUsers] = useState<User[]>(data);
  const [selected, setSelected] = useState<string[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setEditData({ ...user });
  };

  const saveEdit = () => {
    if (!editingUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id ? ({ ...u, ...editData } as User) : u,
      ),
    );
    setEditingUser(null);
    setEditData({});
  };

  return (
    <div className="bg-background border rounded-md shadow-sm overflow-hidden">
      <div className={`max-h-[${maxHeight}] overflow-y-auto`}>
        <Table>
          {/* Table Header */}
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

          {/* Table Body */}
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/40">
                <TableCell>
                  <Checkbox
                    checked={selected.includes(user.id)}
                    onCheckedChange={() => toggleSelect(user.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "Active" ? "default" : "secondary"}
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
                      <DropdownMenuItem onClick={() => openEditDialog(user)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Table Footer */}
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

      {/* Edit Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <Input
              value={editData.name || ""}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              placeholder="Name"
            />
            <Input
              value={editData.email || ""}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              placeholder="Email"
            />
            <Input
              value={editData.role || ""}
              onChange={(e) =>
                setEditData({ ...editData, role: e.target.value })
              }
              placeholder="Role"
            />
            <Select
              value={editData.status || "Active"}
              onValueChange={(val) =>
                setEditData({
                  ...editData,
                  status: val as "Active" | "Inactive",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={editData.balance || ""}
              onChange={(e) =>
                setEditData({ ...editData, balance: e.target.value })
              }
              placeholder="Balance"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
