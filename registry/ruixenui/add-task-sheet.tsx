"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar as CalendarIcon, User, Flag } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function AddTaskSheet() {
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Task</Button>
      </SheetTrigger>

      <SheetContent className="max-w-md">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            Add New Task
          </SheetTitle>
          <SheetDescription>
            Add a new task to your project and assign priority & category.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 p-2">
          {/* Task Name */}
          <div className="grid gap-2">
            <Label htmlFor="taskName">Task Name</Label>
            <Input id="taskName" placeholder="Enter task name..." />
          </div>

          {/* Assignee */}
          <div className="grid gap-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Select>
              <SelectTrigger>
                <SelectValue id="assignee" placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  <User className="w-4 h-4 mr-2 inline-block" /> Adam
                </SelectItem>
                <SelectItem value="2">
                  <User className="w-4 h-4 mr-2 inline-block" /> Ruth
                </SelectItem>
                <SelectItem value="3">
                  <User className="w-4 h-4 mr-2 inline-block" /> Taylor
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue id="category" placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">
                  <Flag className="w-4 h-4 mr-2 inline-block" /> Design
                </SelectItem>
                <SelectItem value="development">
                  <Flag className="w-4 h-4 mr-2 inline-block" /> Development
                </SelectItem>
                <SelectItem value="testing">
                  <Flag className="w-4 h-4 mr-2 inline-block" /> Testing
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date with Calendar Popover */}
          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? dueDate.toLocaleDateString() : "Select due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Priority */}
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger>
                <SelectValue id="priority" placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <Flag className="w-4 h-4 mr-2 text-green-500 inline-block" />{" "}
                  Low
                </SelectItem>
                <SelectItem value="medium">
                  <Flag className="w-4 h-4 mr-2 text-yellow-500 inline-block" />{" "}
                  Medium
                </SelectItem>
                <SelectItem value="high">
                  <Flag className="w-4 h-4 mr-2 text-red-500 inline-block" />{" "}
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="flex justify-end gap-2 px-4 py-3">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="submit">Add Task</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
