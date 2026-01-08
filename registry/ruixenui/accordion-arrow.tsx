"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionArrowItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionArrowProps {
  items: AccordionArrowItem[];
  defaultValue?: string;
  className?: string;
}

export default function AccordionArrow({
  items,
  defaultValue,
  className,
}: AccordionArrowProps) {
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
                "flex flex-1 items-center gap-3 py-4 text-left text-[15px] font-medium transition-all hover:underline",
                "[&[data-state=open]>svg]:rotate-90",
              )}
            >
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
              {item.title}
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="pb-4 ps-7 text-muted-foreground">
              {item.content}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
