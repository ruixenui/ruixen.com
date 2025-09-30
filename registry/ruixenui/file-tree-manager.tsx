"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import {
  Folder,
  File as FileIcon,
  ChevronDown,
  ChevronRight,
  Trash2,
  FilePlus,
  Edit2,
} from "lucide-react";

// File/folder node type
export type FileNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
};

// Props for configurable FileTree
interface FileTreeProps {
  treeData?: FileNode[];
  initialExpanded?: string[];
  initialSelected?: string | null;
  onSelect?: (node: FileNode) => void;
  onDelete?: (node: FileNode) => void;
  onCreate?: (
    parent?: FileNode,
    type?: "file" | "folder",
    name?: string,
  ) => void;
  onRename?: (node: FileNode, newName: string) => void;
}

export default function FileTree({
  treeData = [],
  initialExpanded = [],
  initialSelected = null,
  onSelect,
  onDelete,
  onCreate,
  onRename,
}: FileTreeProps) {
  const [tree, setTree] = useState<FileNode[]>(treeData);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    initialExpanded.reduce((acc, id) => ({ ...acc, [id]: true }), {}),
  );
  const [selected, setSelected] = useState<string | null>(initialSelected);
  const [newName, setNewName] = useState("");

  const toggle = (id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  const handleSelect = (id: string) => {
    setSelected(id);
    if (onSelect) {
      const node = findNodeById(tree, id);
      if (node) onSelect(node);
    }
  };

  const handleDelete = (id: string) => {
    const node = findNodeById(tree, id);
    if (!node) return;

    const next = mutateTree(tree, (nodes) => {
      function remove(nodesArr: FileNode[]) {
        for (let i = nodesArr.length - 1; i >= 0; i--) {
          if (nodesArr[i].id === id) {
            nodesArr.splice(i, 1);
            return true;
          }
          if (nodesArr[i].children) remove(nodesArr[i].children!);
        }
        return false;
      }
      remove(nodes);
    });

    setTree(next);
    if (selected === id) setSelected(null);
    onDelete?.(node);
  };

  const handleCreate = (
    parentId?: string,
    type: "file" | "folder" = "file",
  ) => {
    if (!newName.trim()) return;
    const node: FileNode = { id: `${Date.now()}`, name: newName.trim(), type };
    const next = mutateTree(tree, (nodes) => {
      if (!parentId) {
        nodes.push(node);
        return;
      }
      const parent = findNodeById(nodes, parentId);
      if (parent && parent.type === "folder") {
        parent.children = parent.children || [];
        parent.children.push(node);
      }
    });
    setTree(next);
    setNewName("");
    if (parentId) setExpanded((s) => ({ ...s, [parentId]: true }));
    const parentNode = parentId
      ? (findNodeById(tree, parentId) ?? undefined)
      : undefined;
    onCreate?.(parentNode, type, node.name);
  };

  const handleRename = (id: string, name: string) => {
    const node = findNodeById(tree, id);
    if (!node) return;

    const next = mutateTree(tree, (nodes) => {
      const nodeToRename = findNodeById(nodes, id);
      if (nodeToRename) nodeToRename.name = name;
    });

    setTree(next);
    onRename?.(node, name);
  };

  const renderNodes = (nodes: FileNode[], level = 0) => {
    return nodes.map((n) => (
      <div key={n.id} className="group">
        <div
          role="treeitem"
          aria-expanded={n.type === "folder" ? !!expanded[n.id] : undefined}
          className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-muted",
            selected === n.id ? "bg-muted/50" : "",
          )}
          style={{ paddingLeft: level * 12 + 8 }}
          onClick={() => {
            handleSelect(n.id);
            if (n.type === "folder") toggle(n.id);
          }}
        >
          {n.type === "folder" ? (
            <span className="flex items-center gap-2">
              <button
                aria-label={expanded[n.id] ? "collapse" : "expand"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(n.id);
                }}
                className="inline-flex items-center justify-center w-6 h-6"
              >
                {expanded[n.id] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
              <Folder size={18} />
            </span>
          ) : (
            <FileIcon size={16} />
          )}

          <div className="flex-1 text-sm truncate">{n.name}</div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit2 size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rename</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(n.id);
                  }}
                >
                  <Trash2 size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {n.children && n.children.length > 0 && expanded[n.id] && (
          <div role="group">{renderNodes(n.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>File Tree — shadcn UI + lucide-react</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="flex gap-2 items-center mb-3">
            <Input
              placeholder="New file or folder name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => handleCreate(undefined, "file")}>
              Add File
            </Button>
            <Button onClick={() => handleCreate(undefined, "folder")}>
              Add Folder
            </Button>
          </div>

          <Separator className="my-2" />
          <div role="tree" className="space-y-1">
            {renderNodes(tree)}
          </div>
          <Separator className="my-3" />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Selected: <span className="font-medium">{selected ?? "—"}</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (!selected) return;
                  const node = findNodeById(tree, selected);
                  if (node && node.type === "folder")
                    handleCreate(selected, "file");
                }}
              >
                <FilePlus size={14} /> Add file in selected
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setExpanded({})}>
                <ChevronRight size={14} /> Collapse all
              </Button>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}

// Utility functions remain unchanged
function findNodeById(nodes: FileNode[], id: string): FileNode | null {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const found = findNodeById(n.children, id);
      if (found) return found;
    }
  }
  return null;
}

function mutateTree(nodes: FileNode[], cb: (nodes: FileNode[]) => void) {
  const cloned = JSON.parse(JSON.stringify(nodes)) as FileNode[];
  cb(cloned);
  return cloned;
}
