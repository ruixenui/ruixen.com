"use client";

import { SiNpm, SiPnpm, SiYarn, SiBun } from "react-icons/si";
import PackageInstallerTabs, {
  PackageTab,
} from "@/registry/ruixenui/package-installer-tabs";
import { toast } from "sonner"; // Optional toast library

const tabs: PackageTab[] = [
  {
    id: "npm",
    label: "npm",
    icon: <SiNpm className="w-4 h-4" />,
    command: "npx",
    packageName: "shadcn@latest add https://ruixen.com/r/staggered-faq-section",
    extra: "--save",
  },
  {
    id: "pnpm",
    label: "pnpm",
    icon: <SiPnpm className="w-4 h-4" />,
    command: "pnpm dlx",
    packageName: "shadcn@latest add https://ruixen.com/r/staggered-faq-section",
  },
  {
    id: "yarn",
    label: "yarn",
    icon: <SiYarn className="w-4 h-4" />,
    command: "yarn dlx",
    packageName: "shadcn@latest add https://ruixen.com/r/staggered-faq-section",
  },
  {
    id: "bun",
    label: "bun",
    icon: <SiBun className="w-4 h-4" />,
    command: "bunx",
    packageName: "shadcn@latest add https://ruixen.com/r/staggered-faq-section",
  },
];

export default function PackageInstallerDemoPage() {
  const handleCopy = (text: string) => {
    toast?.success(`Copied: ${text}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-2xl font-bold text-center">
        Package Installer Tabs Demo
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center max-w-lg">
        Switch between package managers to see the installation commands and
        copy them easily.
      </p>

      <PackageInstallerTabs
        tabs={tabs}
        defaultTab="npm"
        title="Install Staggered FAQ Section"
        onCopy={handleCopy}
      />
    </div>
  );
}
