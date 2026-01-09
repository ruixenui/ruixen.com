"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionPlusItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionPlusProps {
  items: AccordionPlusItem[];
  defaultValue?: string;
  className?: string;
}

export default function AccordionPlus({
  items,
  defaultValue,
  className,
}: AccordionPlusProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultValue}
      className={className}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className="border-b last:border-b-0"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                "group flex flex-1 items-center justify-between py-4 text-left text-[15px] font-medium transition-all hover:underline",
              )}
            >
              {item.title}
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:hidden" />
              <Minus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 hidden group-data-[state=open]:block" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="pb-4 text-muted-foreground">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
