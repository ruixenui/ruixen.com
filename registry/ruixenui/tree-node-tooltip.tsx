"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Folder, File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type TreeNode = {
  id: string;
  name: string;
  tooltip?: string;
  type: "folder" | "file";
  children?: TreeNode[];
};

const demoData: TreeNode[] = [
  {
    id: "1",
    name: "src",
    tooltip: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        tooltip: "components",
        type: "folder",
        children: [
          {
            id: "3",
            name: "Button.tsx",
            tooltip: "Button's tooltip",
            type: "file",
          },
          {
            id: "4",
            name: "Card.tsx",
            tooltip: "Card's tooltip",
            type: "file",
          },
        ],
      },
      {
        id: "5",
        name: "lib",
        tooltip: "lib",
        type: "folder",
        children: [
          {
            id: "6",
            name: "utils.ts",
            tooltip: "utils's tooltip",
            type: "file",
          },
        ],
      },
    ],
  },
];

export default function TreeNodeTooltip({ node }: { node: TreeNode }) {
  const [expanded, setExpanded] = useState(false);

  const isFolder = node.type === "folder";

  const toggle = () => {
    if (isFolder) setExpanded((prev) => !prev);
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggle}
              className={cn(
                "flex items-center gap-2 px-2 py-1 rounded-md w-full text-left",
                "hover:bg-accent hover:text-accent-foreground transition-colors",
              )}
            >
              {isFolder ? (
                <Folder
                  size={16}
                  className={cn(
                    "text-muted-foreground",
                    expanded && "text-blue-500",
                  )}
                />
              ) : (
                <File size={16} className="text-muted-foreground" />
              )}
              <span className="truncate">{node.name}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">{node.tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Animate children */}
      {isFolder && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 border-l pl-2 space-y-1"
            >
              {node.children?.map((child) => (
                <TreeNodeTooltip key={child.id} node={child} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
