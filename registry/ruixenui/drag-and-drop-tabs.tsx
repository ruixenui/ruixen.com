"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface DragTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface DragAndDropTabsProps {
  items?: DragTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function DragAndDropTabs({
  items: defaultItems = [
    { value: "tab1", label: "Tab 1", content: "Content 1" },
    { value: "tab2", label: "Tab 2", content: "Content 2" },
    { value: "tab3", label: "Tab 3", content: "Content 3" },
    { value: "tab4", label: "Tab 4", content: "Content 4" },
  ],
  defaultValue,
  className,
}: DragAndDropTabsProps) {
  const [items, setItems] = React.useState(defaultItems);
  const [active, setActive] = React.useState(
    defaultValue || defaultItems[0].value,
  );

  const sensors = useSensors(useSensor(PointerSensor));

  function SortableTab({
    id,
    label,
    active,
  }: {
    id: string;
    label: string;
    active: boolean;
  }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 10 : "auto",
    };

    return (
      <TabsTrigger
        ref={setNodeRef}
        value={id}
        {...attributes}
        {...listeners}
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium flex items-center border justify-center cursor-pointer select-none transition-colors",
          active
            ? "bg-primary text-white shadow-md dark:bg-primary/80 dark:text-black"
            : "bg-background/50 text-foreground/20 dark:bg-background/30 dark:text-foreground/50 ",
          isDragging && "opacity-70 ring-2 ring-primary",
        )}
        style={style}
      >
        {label}
      </TabsTrigger>
    );
  }

  const handleDragEnd = (event: any) => {
    const { active: dragged, over } = event;
    if (dragged.id !== over?.id) {
      const oldIndex = items.findIndex((i) => i.value === dragged.id);
      const newIndex = items.findIndex((i) => i.value === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[70vh] w-full",
        className,
      )}
    >
      <Tabs
        value={active}
        onValueChange={setActive}
        className="w-full max-w-lg"
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((i) => i.value)}
            strategy={horizontalListSortingStrategy}
          >
            <TabsList className="flex gap-2 bg-background/30 p-2 rounded-xl">
              {items.map((item) => (
                <SortableTab
                  key={item.value}
                  id={item.value}
                  label={item.label}
                  active={active === item.value}
                />
              ))}
            </TabsList>
          </SortableContext>
        </DndContext>

        <div className="mt-4 w-full max-w-lg">
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <div className="p-4 bg-card">{item.content}</div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
