"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface CheckboxTreeProps {
  nodes: TreeNode[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
}

function getAllChildIds(node: TreeNode): string[] {
  const ids = [node.id];
  if (node.children) {
    node.children.forEach((child) => {
      ids.push(...getAllChildIds(child));
    });
  }
  return ids;
}

function getNodeState(
  node: TreeNode,
  selectedIds: string[],
): "checked" | "indeterminate" | "unchecked" {
  if (!node.children || node.children.length === 0) {
    return selectedIds.includes(node.id) ? "checked" : "unchecked";
  }

  const childIds = node.children.flatMap((child) => getAllChildIds(child));
  const selectedChildCount = childIds.filter((id) =>
    selectedIds.includes(id),
  ).length;

  if (selectedChildCount === 0) return "unchecked";
  if (selectedChildCount === childIds.length) return "checked";
  return "indeterminate";
}

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  selectedIds: string[];
  onToggle: (node: TreeNode, checked: boolean) => void;
}

function TreeNodeItem({
  node,
  level,
  selectedIds,
  onToggle,
}: TreeNodeItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const state = getNodeState(node, selectedIds);
  const isChecked = state === "checked";
  const isIndeterminate = state === "indeterminate";
  const isFilled = isChecked || isIndeterminate;

  const handleChange = () => {
    onToggle(node, state !== "checked");
  };

  return (
    <div className="flex flex-col">
      <div
        className="group flex items-center gap-1.5 py-[3px]"
        style={{ paddingLeft: `${level * 20}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-5 w-5 items-center justify-center rounded-[4px] text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-400"
          >
            <motion.svg
              viewBox="0 0 12 12"
              className="h-3.5 w-3.5"
              fill="none"
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <path
                d="M4.5 2.5L8 6L4.5 9.5"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        ) : (
          <div className="w-5" />
        )}
        <label className="inline-flex cursor-pointer items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChange}
              className="peer sr-only"
            />
            <motion.div
              className={cn(
                "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150",
                isFilled
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
                  : "border-neutral-300 bg-transparent group-hover:border-neutral-400 dark:border-neutral-700 dark:group-hover:border-neutral-500",
              )}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isChecked && (
                  <motion.svg
                    key="check"
                    viewBox="0 0 12 12"
                    className="h-3 w-3"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <motion.path
                      d="M2.5 6.5L5 9L9.5 3.5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  </motion.svg>
                )}
                {isIndeterminate && (
                  <motion.svg
                    key="minus"
                    viewBox="0 0 12 12"
                    className="h-3 w-3"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <motion.path
                      d="M3 6h6"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          <span
            className={cn(
              "text-[14px] tracking-[-0.01em]",
              hasChildren
                ? "font-medium text-neutral-900 dark:text-neutral-100"
                : "text-neutral-700 dark:text-neutral-300",
            )}
          >
            {node.label}
          </span>
        </label>
      </div>
      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            {node.children!.map((child) => (
              <TreeNodeItem
                key={child.id}
                node={child}
                level={level + 1}
                selectedIds={selectedIds}
                onToggle={onToggle}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CheckboxTree({
  nodes,
  value,
  defaultValue = [],
  onValueChange,
  className,
}: CheckboxTreeProps) {
  const [internalValue, setInternalValue] =
    React.useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const selectedIds = isControlled ? value : internalValue;

  const handleToggle = (node: TreeNode, checked: boolean) => {
    const affectedIds = getAllChildIds(node);
    let newValue: string[];

    if (checked) {
      newValue = [...new Set([...selectedIds, ...affectedIds])];
    } else {
      newValue = selectedIds.filter((id) => !affectedIds.includes(id));
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          level={0}
          selectedIds={selectedIds}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
