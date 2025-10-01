"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type Item = {
  id: number;
  category: string;
  price: number;
  rating: number;
  stock: number;
};

// Default sample data
const defaultData: Item[] = [
  { id: 1, category: "Laptop", price: 1200, rating: 4.5, stock: 20 },
  { id: 2, category: "Tablet", price: 600, rating: 4.1, stock: 35 },
  { id: 3, category: "Smartphone", price: 800, rating: 4.7, stock: 50 },
  { id: 4, category: "Monitor", price: 300, rating: 4.0, stock: 15 },
  { id: 5, category: "Laptop", price: 1500, rating: 4.8, stock: 10 },
  { id: 6, category: "Tablet", price: 550, rating: 4.2, stock: 28 },
];

const defaultCategories = ["Laptop", "Tablet", "Smartphone", "Monitor"];

interface ComparisonTableProps {
  /** Data for the table */
  data?: Item[];
  /** Categories available for filtering */
  categories?: string[];
  /** Optional heading/title */
  title?: string;
}

export default function ComparisonTable({
  data = defaultData,
  categories = defaultCategories,
  title = "Comparison Table",
}: ComparisonTableProps) {
  const [selected, setSelected] = React.useState<number[]>([]);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");

  // Toggle select logic (max 2 items)
  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 2
          ? [...prev, id]
          : prev,
    );
  };

  const resetSelection = () => setSelected([]);

  // Apply filters
  const filteredData = data.filter((item) => {
    const matchesSearch = item.category
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "all" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  // Selected comparison items
  const comparedItems = data.filter((item) => selected.includes(item.id));

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-3">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <Input
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={resetSelection}>
            Reset
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Select</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow
                key={item.id}
                className={cn(selected.includes(item.id) && "bg-muted/50")}
              >
                <TableCell className="p-2">{item.category}</TableCell>
                <TableCell className="p-2">{item.price}</TableCell>
                <TableCell className="p-2">{item.rating}</TableCell>
                <TableCell className="p-2">{item.stock}</TableCell>
                <TableCell className="p-2">
                  <Button
                    variant={
                      selected.includes(item.id) ? "destructive" : "outline"
                    }
                    size="sm"
                    className={selected.includes(item.id) ? "text-white" : ""}
                    onClick={() => toggleSelect(item.id)}
                  >
                    {selected.includes(item.id) ? "Remove" : "Compare"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Comparison view */}
        {comparedItems.length === 2 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Comparison Result</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="font-semibold">Attribute</div>
              <div className="font-semibold">{comparedItems[0].category}</div>
              <div className="font-semibold">{comparedItems[1].category}</div>

              <div>Price ($)</div>
              <div
                className={cn(
                  comparedItems[0].price < comparedItems[1].price &&
                    "text-green-600 dark:text-green-400",
                )}
              >
                {comparedItems[0].price}
              </div>
              <div
                className={cn(
                  comparedItems[1].price < comparedItems[0].price &&
                    "text-green-600 dark:text-green-400",
                )}
              >
                {comparedItems[1].price}
              </div>

              <div>Rating</div>
              <div
                className={cn(
                  comparedItems[0].rating > comparedItems[1].rating &&
                    "text-green-600 dark:text-green-400",
                )}
              >
                {comparedItems[0].rating}
              </div>
              <div
                className={cn(
                  comparedItems[1].rating > comparedItems[0].rating &&
                    "text-green-600 dark:text-green-400",
                )}
              >
                {comparedItems[1].rating}
              </div>

              <div>Stock</div>
              <div
                className={cn(
                  comparedItems[0].stock > comparedItems[1].stock &&
                    "text-green-600 dark:text-green-400",
                )}
              >
                {comparedItems[0].stock}
              </div>
              <div
                className={cn(
                  comparedItems[1].stock > comparedItems[0].stock &&
                    "text-green-600 dark:text-green-400",
                )}
              >
                {comparedItems[1].stock}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
