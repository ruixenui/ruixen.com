"use client";

import * as React from "react";
import type { GradientState } from "@/lib/use-gradient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy, Check, Download, FileCode } from "lucide-react";
import { generateGradientCSS } from "@/utils/generate-css";
import { generateTailwindClass } from "@/utils/generate-tailwind";
import { downloadPNG } from "@/utils/download-png";
import { downloadSVG } from "@/utils/download-svg";

interface ExportButtonsProps {
  gradient: GradientState;
}

export function ExportButtons({ gradient }: ExportButtonsProps) {
  const [copiedCss, setCopiedCss] = React.useState(false);
  const [copiedTailwind, setCopiedTailwind] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("css");

  const cssCode = React.useMemo(() => generateGradientCSS(gradient), [gradient]);
  const tailwindCode = React.useMemo(() => generateTailwindClass(gradient), [gradient]);

  const copyCss = async () => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(cssCode);
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    }
  };

  const copyTailwind = async () => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(tailwindCode);
      setCopiedTailwind(true);
      setTimeout(() => setCopiedTailwind(false), 2000);
    }
  };

  const copyActive = activeTab === "css" ? copyCss : copyTailwind;
  const isCopied = activeTab === "css" ? copiedCss : copiedTailwind;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            Export Code
          </CardTitle>
          <Button size="sm" variant="outline" onClick={copyActive} className="gap-2">
            {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {isCopied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
          </TabsList>
          <TabsContent value="css" className="mt-3">
            <div className="relative rounded-lg bg-muted p-4 font-mono text-xs overflow-x-auto">
              <pre className="whitespace-pre-wrap break-all">{cssCode}</pre>
            </div>
          </TabsContent>
          <TabsContent value="tailwind" className="mt-3">
            <div className="relative rounded-lg bg-muted p-4 font-mono text-xs overflow-x-auto">
              <pre className="whitespace-pre-wrap break-all">{tailwindCode}</pre>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => downloadPNG(gradient, "gradient.png")}
            className="flex-1 gap-2"
          >
            <Download className="h-3 w-3" />
            Download PNG
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => downloadSVG(gradient, "gradient.svg")}
            className="flex-1 gap-2"
          >
            <Download className="h-3 w-3" />
            Download SVG
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
