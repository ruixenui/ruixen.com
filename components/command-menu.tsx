"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const { setTheme } = useTheme();

  // Extract component categories from Components section
  const componentCategories = React.useMemo(() => {
    const componentsGroup = docsConfig.sidebarNav.find(
      (group) => group.title === "Components"
    );
    if (!componentsGroup?.items) return [];
    
    return componentsGroup.items
      .filter((item) => item.items && item.items.length > 0 && !item.href)
      .map((item) => item.title);
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64",
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        
        {/* Category Filter Buttons - horizontal scroll */}
        <div className="border-b bg-background">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            <div className="flex gap-1.5 px-3 py-2 min-w-max">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("all");
                }}
              >
                All
              </Button>
              {componentCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs shrink-0"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category);
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {docsConfig.mainNav
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href as string));
                  }}
                >
                  <FileIcon className="mr-2 size-4" />
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>
          {docsConfig.sidebarNav.map((group) => {
            // Skip non-component groups if a specific category is selected
            if (selectedCategory !== "all" && group.title !== "Components") {
              return null;
            }

            // Filter items based on selected category
            const filteredItems = group.items?.filter((navItem) => {
              if (selectedCategory === "all") return true;
              if (group.title !== "Components") return true;
              return navItem.title === selectedCategory;
            });

            // Don't show empty groups
            if (!filteredItems || filteredItems.length === 0) return null;

            return (
              <CommandGroup key={group.title} heading={group.title}>
                {filteredItems.map((navItem) => {
                  // If item has children (subcategories), show them with breadcrumb
                  if (navItem.items && navItem.items.length > 0 && !navItem.href) {
                    return navItem.items.map((subItem) => (
                      <CommandItem
                        key={subItem.href}
                        value={`${group.title} ${navItem.title} ${subItem.title}`}
                        onSelect={() => {
                          runCommand(() => router.push(subItem.href as string));
                        }}
                      >
                        <div className="mr-2 flex size-4 items-center justify-center">
                          <CircleIcon className="size-3" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground text-xs">
                            {navItem.title}
                          </span>
                          <span className="text-muted-foreground">/</span>
                          <span>{subItem.title}</span>
                        </div>
                      </CommandItem>
                    ));
                  }
                  // Regular item with href
                  if (navItem.href) {
                    return (
                      <CommandItem
                        key={navItem.href}
                        value={navItem.title}
                        onSelect={() => {
                          runCommand(() => router.push(navItem.href as string));
                        }}
                      >
                        <div className="mr-2 flex size-4 items-center justify-center">
                          <CircleIcon className="size-3" />
                        </div>
                        {navItem.title}
                      </CommandItem>
                    );
                  }
                  return null;
                })}
              </CommandGroup>
            );
          })}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 size-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 size-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <LaptopIcon className="mr-2 size-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
