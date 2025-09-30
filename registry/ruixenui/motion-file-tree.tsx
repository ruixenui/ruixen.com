"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";

// -------- Types --------
export type FileNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
};

export type MotionFileTreeProps = {
  data: FileNode[];
  defaultExpanded?: Record<string, boolean>;
  onSelect?: (node: FileNode) => void;
};

// -------- Component --------
export default function MotionFileTree({
  data,
  defaultExpanded = {},
  onSelect,
}: MotionFileTreeProps) {
  const [expanded, setExpanded] =
    useState<Record<string, boolean>>(defaultExpanded);
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNodes = (nodes: FileNode[], level = 0) => {
    return nodes.map((n) => (
      <div key={n.id} className="relative">
        <div
          role="treeitem"
          tabIndex={0}
          aria-expanded={n.type === "folder" ? !!expanded[n.id] : undefined}
          className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-colors select-none outline-none",
            selected === n.id
              ? "bg-accent text-accent-foreground border-l-2 border-primary"
              : "hover:bg-muted",
          )}
          style={{ paddingLeft: level * 14 + 8 }}
          onClick={() => {
            if (n.type === "folder") toggle(n.id);
            setSelected(n.id);
            onSelect?.(n);
          }}
          onKeyDown={(e) => {
            if (n.type === "folder" && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              toggle(n.id);
            }
          }}
        >
          {n.type === "folder" ? (
            <>
              {expanded[n.id] ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
              <Folder size={16} />
            </>
          ) : (
            <File size={14} />
          )}
          <span className="text-sm truncate">{n.name}</span>
        </div>

        {/* Children with smooth animation */}
        <AnimatePresence initial={false}>
          {n.children && n.children.length > 0 && expanded[n.id] && (
            <motion.div
              key="children"
              role="group"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="pl-3 border-l border-muted"
            >
              {renderNodes(n.children, level + 1)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ));
  };

  return (
    <div role="tree" className="space-y-1 text-sm">
      {renderNodes(data)}
    </div>
  );
}
