"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus, ChevronRight } from "lucide-react";

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

  const handleChange = () => {
    onToggle(node, state !== "checked");
  };

  return (
    <div className="flex flex-col">
      <div
        className="group flex items-center gap-2 py-1"
        style={{ paddingLeft: `${level * 20}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-muted"
          >
            <ChevronRight
              className={cn(
                "size-4 transition-transform duration-200",
                isExpanded && "rotate-90",
              )}
            />
          </button>
        ) : (
          <div className="w-5" />
        )}
        <label className="inline-flex cursor-pointer items-center gap-2">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChange}
              className="peer sr-only"
            />
            <div
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200",
                isChecked || isIndeterminate
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 bg-background group-hover:border-muted-foreground/50",
              )}
            >
              {isChecked && <Check className="size-3.5 stroke-[3]" />}
              {isIndeterminate && <Minus className="size-3.5 stroke-[3]" />}
            </div>
          </div>
          <span className="text-sm font-medium text-foreground">
            {node.label}
          </span>
        </label>
      </div>
      {hasChildren && isExpanded && (
        <div className="flex flex-col">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedIds={selectedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
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
