"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

export interface AccordionMinimalItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionMinimalProps {
  items: AccordionMinimalItem[];
  defaultValue?: string;
  className?: string;
}

export default function AccordionMinimal({
  items,
  defaultValue,
  className,
}: AccordionMinimalProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultValue}
      className={cn("divide-y divide-border", className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item key={item.id} value={item.id}>
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                "group flex flex-1 items-center justify-between py-4 text-left text-[15px] font-medium transition-all",
              )}
            >
              {item.title}
              <span className="text-muted-foreground text-sm font-normal group-data-[state=open]:hidden">
                Show
              </span>
              <span className="text-primary text-sm font-normal hidden group-data-[state=open]:inline">
                Hide
              </span>
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
