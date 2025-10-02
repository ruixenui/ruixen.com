"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star, Folder, File } from "lucide-react";

// -------- MagicNode Types --------
export type MagicNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: MagicNode[];
  sparkle?: boolean;
};

export type MagicTreeProps = {
  data?: MagicNode[];
  onSelect?: (node: MagicNode) => void;
};

// -------- Default Data --------
const defaultMagicData: MagicNode[] = [
  {
    id: "1",
    name: "Magical Folder",
    type: "folder",
    sparkle: true,
    children: [
      { id: "1-1", name: "Shiny File.txt", type: "file", sparkle: true },
      {
        id: "1-2",
        name: "Hidden Gems",
        type: "folder",
        children: [
          { id: "1-2-1", name: "Gem.js", type: "file", sparkle: true },
        ],
      },
    ],
  },
  { id: "2", name: "Plain File.md", type: "file" },
];

export default function MagicTree({
  data = defaultMagicData,
  onSelect,
}: MagicTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNodes = (nodes: MagicNode[], level = 0) => {
    return nodes.map((n) => (
      <div key={n.id} className="relative group">
        <motion.div
          className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer select-none",
            selected === n.id
              ? "bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
              : "hover:bg-muted",
          )}
          style={{ paddingLeft: level * 16 + 8 }}
          onClick={() => {
            if (n.type === "folder") toggle(n.id);
            setSelected(n.id);
            onSelect?.(n);
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Icon for selected node */}
          {selected === n.id ? (
            <Star size={16} className="text-yellow-400" />
          ) : n.type === "folder" ? (
            <Folder size={16} />
          ) : (
            <File size={14} />
          )}
          <span className="flex-1 truncate">{n.name}</span>
        </motion.div>

        <AnimatePresence>
          {n.children && n.children.length > 0 && expanded[n.id] && (
            <motion.div
              role="group"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pl-4 border-l border-purple-300"
            >
              {renderNodes(n.children, level + 1)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ));
  };

  return <div className="space-y-1 max-w-sm">{renderNodes(data)}</div>;
}
