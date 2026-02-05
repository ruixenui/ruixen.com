"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [openItem, setOpenItem] = useState<string | undefined>(defaultValue);

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = openItem === item.id;
        return (
          <div key={item.id} className="border-b last:border-b-0">
            <h3 className="flex">
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? undefined : item.id)}
                className="flex flex-1 items-center gap-3 py-4 text-left text-[15px] font-medium transition-all hover:underline"
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-90",
                  )}
                />
                {item.title}
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-4 ps-7 text-sm text-muted-foreground">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
