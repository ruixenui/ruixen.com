"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

export interface PackageTab {
  /** Unique id for the tab */
  id: string;
  /** Label shown on the tab */
  label: string;
  /** Icon shown on the tab (e.g., <SiNpm />) */
  icon?: React.ReactNode;
  /** CLI command (like npx, pnpm dlx, yarn dlx, etc.) */
  command: string;
  /** The package install command (like shadcn@latest add ...) */
  packageName: string;
  /** Extra text appended after the package name (optional) */
  extra?: string;
}

interface PackageInstallerTabsProps {
  /** Tabs configuration */
  tabs: PackageTab[];
  /** Default selected tab id */
  defaultTab?: string;
  /** Optional heading shown above tabs */
  title?: string;
  /** Optional callback when copy occurs */
  onCopy?: (copiedText: string) => void;
}

const PackageInstallerTabs: React.FC<PackageInstallerTabsProps> = ({
  tabs,
  defaultTab,
  title = "Install the component",
  onCopy,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0].id);
  const [copied, setCopied] = useState(false);

  const activeCommand = tabs.find((tab) => tab.id === activeTab)!;

  const handleCopy = () => {
    const commandText = `${activeCommand.command} ${activeCommand.packageName}${
      activeCommand.extra ? " " + activeCommand.extra : ""
    }`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(commandText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        onCopy?.(commandText);
      });
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-sm">
      <CardHeader className="p-4 border-b">
        {title && <h2 className="mb-3 text-lg font-semibold">{title}</h2>}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="relative p-4">
        <div className="flex items-center justify-between">
          <pre className="font-mono text-sm bg-zinc-100 dark:bg-zinc-950 p-2 rounded-md w-full overflow-x-auto">
            <span className="text-amber-400">{activeCommand.command}</span>{" "}
            <span className="text-teal-500">{activeCommand.packageName}</span>{" "}
            {activeCommand.extra && (
              <span className="text-zinc-700 dark:text-zinc-300">
                {activeCommand.extra}
              </span>
            )}
          </pre>
          <Button
            variant="outline"
            className="ml-2 flex items-center gap-1"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageInstallerTabs;
