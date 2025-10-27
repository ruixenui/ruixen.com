"use client";

import FileTree, { FileNode } from "@/registry/ruixenui/file-tree-manager";

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

export default function FileTreeDemoPage() {
  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <FileTree
        treeData={demoTree}
        initialExpanded={["1", "1-1"]}
        initialSelected={"1-1-1"}
        onSelect={(node) => console.log("Selected:", node)}
        onDelete={(node) => console.log("Deleted:", node)}
        onCreate={(parent, type, name) =>
          console.log("Created:", { parent, type, name })
        }
        onRename={(node, newName) =>
          console.log("Renamed:", node, "to", newName)
        }
      />
    </div>
  );
}
