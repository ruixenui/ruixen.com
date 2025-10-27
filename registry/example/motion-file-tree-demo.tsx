"use client";

import MotionFileTree, { FileNode } from "@/registry/ruixenui/motion-file-tree";

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
    <div className="p-8 flex flex-col items-center gap-6">
      <MotionFileTree
        data={demoTree}
        defaultExpanded={{ "1": true, "1-1": true }}
        onSelect={handleSelect}
      />
    </div>
  );
}
