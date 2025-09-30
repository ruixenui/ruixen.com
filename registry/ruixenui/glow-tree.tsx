"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Folder, File, Zap } from "lucide-react";

// -------- GlowNode Types --------
export type GlowNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: GlowNode[];
  glow?: boolean;
};

export type GlowTreeProps = {
  data?: GlowNode[];
  onSelect?: (node: GlowNode) => void;
};

// -------- Default Data --------
const defaultGlowData: GlowNode[] = [
  {
    id: "1",
    name: "Glowing Folder",
    type: "folder",
    glow: true,
    children: [
      { id: "1-1", name: "Light File.txt", type: "file", glow: true },
      {
        id: "1-2",
        name: "Hidden Glow",
        type: "folder",
        children: [{ id: "1-2-1", name: "Glow.js", type: "file", glow: true }],
      },
    ],
  },
  { id: "2", name: "Normal File.md", type: "file" },
];

// -------- GlowTree Component --------
export default function GlowTree({
  data = defaultGlowData,
  onSelect,
}: GlowTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const renderNodes = (nodes: GlowNode[], level = 0) =>
    nodes.map((n) => (
      <div key={n.id} className="relative group">
        <motion.div
          className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer select-none transition-all",
            selected === n.id
              ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white shadow"
              : "hover:bg-muted",
          )}
          style={{ paddingLeft: level * 16 + 8 }}
          onClick={() => {
            if (n.type === "folder") toggle(n.id);
            setSelected(n.id);
            onSelect?.(n);
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {n.type === "folder" ? <Folder size={16} /> : <File size={14} />}
          <span className="flex-1 truncate">{n.name}</span>
          {n.glow && (
            <Zap size={16} className="text-yellow-300 animate-pulse" />
          )}
        </motion.div>

        <AnimatePresence>
          {n.children && n.children.length > 0 && expanded[n.id] && (
            <motion.div
              role="group"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="pl-4 border-l border-gray-400 dark:border-gray-600"
            >
              {renderNodes(n.children, level + 1)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ));

  return <div className="space-y-1">{renderNodes(data)}</div>;
}
