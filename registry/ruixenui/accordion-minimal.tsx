"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [openItem, setOpenItem] = useState<string | undefined>(defaultValue);

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map((item) => {
        const isOpen = openItem === item.id;
        return (
          <div key={item.id}>
            <h3 className="flex">
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? undefined : item.id)}
                className="flex flex-1 items-center justify-between py-4 text-left text-[15px] font-medium transition-all"
              >
                {item.title}
                {isOpen ? (
                  <span className="text-primary text-sm font-normal">Hide</span>
                ) : (
                  <span className="text-muted-foreground text-sm font-normal">
                    Show
                  </span>
                )}
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-4 text-sm text-muted-foreground">
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
