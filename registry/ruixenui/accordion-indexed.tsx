"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface AccordionIndexedItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionIndexedProps {
  items?: AccordionIndexedItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  className?: string;
}

const defaultItems: AccordionIndexedItem[] = [
  {
    id: "strategy",
    title: "Strategy",
    content:
      "Every product starts with a question worth answering. We map user needs, business goals, and technical constraints into a focused direction before a single pixel is placed.",
  },
  {
    id: "design",
    title: "Design",
    content:
      "Interface decisions shaped by real usage patterns. Typography, spacing, and color are tuned until the experience feels inevitable rather than designed.",
  },
  {
    id: "engineering",
    title: "Engineering",
    content:
      "Components built for composition, not configuration. Server-first rendering, edge delivery, and zero-layout-shift interactions ship as defaults.",
  },
  {
    id: "motion",
    title: "Motion",
    content:
      "Animation as communication. Spring physics for direct manipulation, opacity curves for state transitions, and layout animations that preserve spatial context.",
  },
  {
    id: "systems",
    title: "Systems",
    content:
      "Tokens, primitives, and patterns that scale across surfaces. A single source of truth that keeps twenty screens consistent without slowing down any of them.",
  },
  {
    id: "delivery",
    title: "Delivery",
    content:
      "Incremental rollouts behind feature flags, performance budgets enforced in CI, and lighthouse scores that never regress. Production is the only environment that matters.",
  },
];

export default function AccordionIndexed({
  items = defaultItems,
  defaultValue = "engineering",
  value,
  onValueChange,
  collapsible = true,
  className,
}: AccordionIndexedProps) {
  return (
    <div className={cn("mx-auto w-full max-w-lg", className)}>
      <Accordion
        type="single"
        defaultValue={value ? undefined : defaultValue}
        value={value}
        onValueChange={onValueChange}
        collapsible={collapsible}
      >
        {items.map((item, index) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="group/item border-border/20 last:border-b"
          >
            <AccordionTrigger className="cursor-pointer py-4 hover:no-underline [&>svg]:hidden">
              <div className="flex items-baseline gap-4">
                <span className="shrink-0 font-mono text-lg tabular-nums text-foreground/15 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=open]/item:text-foreground/50 group-data-[state=open]/item:translate-y-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-light tracking-[-0.015em] text-foreground/35 transition-all duration-300 ease-out group-hover/item:text-foreground/55 group-data-[state=open]/item:text-foreground/85">
                  {item.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="pb-3 pl-[2.35rem] text-[13px] leading-[1.7] text-foreground/40">
                {item.content}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
