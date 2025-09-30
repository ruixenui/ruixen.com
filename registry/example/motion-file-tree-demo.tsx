"use client";

import MotionFileTree, { FileNode } from "@/registry/ruixenui/motion-file-tree";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const demoTree: FileNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "1-1",
        name: "components",
        type: "folder",
        children: [{ id: "1-1-1", name: "Button.tsx", type: "file" }],
      },
      { id: "1-2", name: "app.tsx", type: "file" },
      { id: "1-3", name: "styles.css", type: "file" },
    ],
  },
  {
    id: "2",
    name: "public",
    type: "folder",
    children: [{ id: "2-1", name: "favicon.ico", type: "file" }],
  },
  { id: "3", name: "package.json", type: "file" },
];

export default function MotionFileTreeDemoPage() {
  const handleSelect = (node: FileNode) => {
    console.log("Selected node:", node);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-center">MotionFileTree Demo</h1>

      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Interactive MotionFileTree</CardTitle>
        </CardHeader>
        <CardContent>
          <MotionFileTree
            data={demoTree}
            defaultExpanded={{ "1": true, "1-1": true }}
            onSelect={handleSelect}
          />
        </CardContent>
      </Card>
    </div>
  );
}
