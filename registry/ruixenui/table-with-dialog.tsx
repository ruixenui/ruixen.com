"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export type User = {
  id: string;
  name: string;
  email: string;
  location: string;
  status: "Active" | "Inactive" | "Suspended";
  balance: string;
};

type TableWithDialogProps = {
  data?: User[];
  title?: string;
  footerTotal?: string;
};

const defaultUsers: User[] = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    location: "San Francisco, US",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    location: "Singapore",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "James Wilson",
    email: "j.wilson@company.com",
    location: "London, UK",
    status: "Inactive",
    balance: "$650.00",
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "m.garcia@company.com",
    location: "Madrid, Spain",
    status: "Active",
    balance: "$0.00",
  },
  {
    id: "5",
    name: "David Kim",
    email: "d.kim@company.com",
    location: "Seoul, KR",
    status: "Suspended",
    balance: "-$1,000.00",
  },
];

export default function TableWithDialog({
  data = defaultUsers,
  title = "User Table",
  footerTotal = "$2,500.00",
}: TableWithDialogProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="bg-background border rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="max-h-[400px] overflow-y-auto">
        <Table>
          {/* Fixed Header */}
          <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
            <TableRow className="hover:bg-transparent">
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {/* Scrollable Body */}
          <TableBody>
            {data.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "Active"
                        ? "default"
                        : user.status === "Inactive"
                          ? "secondary"
                          : "destructive"
                    }
                    className={user.status === "Suspended" ? "text-white" : ""}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{user.balance}</TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedUser(user)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogDescription>
                          Full information about{" "}
                          <span className="font-medium">{user.name}</span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                          <strong>Location:</strong> {user.location}
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          <Badge
                            variant={
                              user.status === "Active"
                                ? "default"
                                : user.status === "Inactive"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </p>
                        <p>
                          <strong>Balance:</strong> {user.balance}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Fixed Footer */}
          <TableFooter className="sticky bottom-0 bg-background z-10 shadow-inner">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5} className="font-medium">
                Total Users: {data.length}
              </TableCell>
              <TableCell className="text-right">{footerTotal}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
