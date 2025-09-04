"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchWithCategory() {
  const id = useId();

  return (
    <div className="space-y-2 mx-auto max-w-md">
      <Label htmlFor={id}>Search with category</Label>

      <div className="flex rounded-md shadow-sm">
        {/* Category selector */}
        <Select>
          <SelectTrigger className="h-10 w-[120px] rounded-e-none border-r-0 text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="products">Products</SelectItem>
            <SelectItem value="blogs">Blogs</SelectItem>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="docs">Docs</SelectItem>
          </SelectContent>
        </Select>

        {/* Search input */}
        <Input
          id={id}
          type="text"
          placeholder="Search..."
          className="h-10 -ms-px rounded-none text-sm focus-visible:z-10"
        />

        {/* Search button */}
        <Button
          type="submit"
          className="h-10 rounded-s-none rounded-e-md"
          variant="secondary"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
