"use client";

import * as React from "react";
import {
  Sun,
  Moon,
  Text,
  Eye,
  ChevronRightCircle,
  Settings2,
  Paintbrush,
} from "lucide-react";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export const codeStringDialog_04 = `"use client";

import * as React from "react";
import {
  Sun,
  Moon,
  Text,
  Eye,
  ChevronRightCircle,
  Settings2,
  Paintbrush,
} from "lucide-react";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export default function Dialog_04() {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState("system");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "t" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="gap-2 text-sm"
      >
        <Paintbrush size={16} />
        Theme Settings
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Change appearance…" />
        <CommandList>
          <CommandGroup heading="Appearance">
            <CommandItem onSelect={() => handleTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              Light Mode
              {theme === "light" && (
                <CommandShortcut>✓</CommandShortcut>
              )}
            </CommandItem>
            <CommandItem onSelect={() => handleTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
              {theme === "dark" && (
                <CommandShortcut>✓</CommandShortcut>
              )}
            </CommandItem>
            <CommandItem onSelect={() => handleTheme("system")}>
              <Settings2 className="mr-2 h-4 w-4" />
              System Default
              {theme === "system" && (
                <CommandShortcut>✓</CommandShortcut>
              )}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Accessibility">
            <CommandItem>
              <Text className="mr-2 h-4 w-4" />
              Increase font size
              <CommandShortcut>⌘ +</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Eye className="mr-2 h-4 w-4" />
              High contrast mode
              <CommandShortcut>⌘ H</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="More">
            <CommandItem>
              <ChevronRightCircle className="mr-2 h-4 w-4" />
              Advanced Preferences
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
`;

export default function Dialog_04() {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState("system");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "t" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="gap-2 text-sm"
      >
        <Paintbrush size={16} />
        Theme Settings
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Change appearance…" />
        <CommandList>
          <CommandGroup heading="Appearance">
            <CommandItem onSelect={() => handleTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              Light Mode
              {theme === "light" && (
                <CommandShortcut>✓</CommandShortcut>
              )}
            </CommandItem>
            <CommandItem onSelect={() => handleTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
              {theme === "dark" && (
                <CommandShortcut>✓</CommandShortcut>
              )}
            </CommandItem>
            <CommandItem onSelect={() => handleTheme("system")}>
              <Settings2 className="mr-2 h-4 w-4" />
              System Default
              {theme === "system" && (
                <CommandShortcut>✓</CommandShortcut>
              )}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Accessibility">
            <CommandItem>
              <Text className="mr-2 h-4 w-4" />
              Increase font size
              <CommandShortcut>⌘ +</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Eye className="mr-2 h-4 w-4" />
              High contrast mode
              <CommandShortcut>⌘ H</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="More">
            <CommandItem>
              <ChevronRightCircle className="mr-2 h-4 w-4" />
              Advanced Preferences
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
