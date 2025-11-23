"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  generatePureCss,
  generateTailwindSnippet,
  formatCssBlock,
  downloadFile,
  copyToClipboard,
  GlassState,
} from "@/lib/glass";
import { Textarea } from "@/components/ui/textarea";

type Props = { value: GlassState; shareUrl: string };

export default function CodeOutput({ value, shareUrl }: Props) {
  const [tab, setTab] = useState<"tailwind" | "css">("tailwind");
  const [clicked, setClicked] = useState<string | null>(null);

  const tailwindSnippet = useMemo(
    () => generateTailwindSnippet(value),
    [value],
  );
  const cssSnippet = useMemo(
    () => formatCssBlock(generatePureCss(value)),
    [value],
  );

  const animate = (key: string) => {
    setClicked(key);
    setTimeout(() => setClicked(null), 1200);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Code Output</CardTitle>
        <CardDescription>
          Copy Tailwind snippet or download a .css file.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList className="!w-fit">
            <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
            <TabsTrigger value="css">Pure CSS</TabsTrigger>
          </TabsList>

          {/* TAILWIND TAB */}
          <TabsContent value="tailwind" className="space-y-3">
            <Textarea
              className="font-mono text-xs min-h-[160px] resize-none"
              value={tailwindSnippet}
              readOnly
            />

            <div className="flex flex-wrap gap-2">
              {/* COPY BUTTON */}
              <Button
                size="sm"
                className="cursor-pointer"
                onClick={() => {
                  copyToClipboard(tailwindSnippet);
                  animate("copy-tw");
                }}
              >
                <AnimatePresence mode="wait">
                  {clicked === "copy-tw" ? (
                    <motion.span
                      key="copied-tw"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      Copied ✔
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy-tw-idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Copy Code
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              {/* DOWNLOAD BUTTON */}
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  downloadFile(
                    "glass-tailwind.html",
                    tailwindSnippet,
                    "text/html",
                  );
                  animate("download-tw");
                }}
              >
                <AnimatePresence mode="wait">
                  {clicked === "download-tw" ? (
                    <motion.span
                      key="downloaded-tw"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      Downloaded ↓
                    </motion.span>
                  ) : (
                    <motion.span
                      key="download-tw-idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Download
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </TabsContent>

          {/* CSS TAB */}
          <TabsContent value="css" className="space-y-3">
            <Textarea
              className="font-mono text-xs min-h-[200px] resize-none"
              value={cssSnippet}
              readOnly
            />

            <div className="flex flex-wrap gap-2">
              {/* COPY CSS BUTTON */}
              <Button
                size="sm"
                className="cursor-pointer"
                onClick={() => {
                  copyToClipboard(cssSnippet);
                  animate("copy-css");
                }}
              >
                <AnimatePresence mode="wait">
                  {clicked === "copy-css" ? (
                    <motion.span
                      key="copied-css"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      Copied ✔
                    </motion.span>
                  ) : (
                    <motion.span key="copy-css-idle">Copy Code</motion.span>
                  )}
                </AnimatePresence>
              </Button>

              {/* DOWNLOAD CSS BUTTON */}
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  downloadFile("glass.css", cssSnippet, "text/css");
                  animate("download-css");
                }}
              >
                <AnimatePresence mode="wait">
                  {clicked === "download-css" ? (
                    <motion.span
                      key="downloaded-css"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      Downloaded ↓
                    </motion.span>
                  ) : (
                    <motion.span key="download-css-idle">
                      Download .css
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* SHARE URL */}
        <div className="pt-2 border-t">
          <Button
            size="sm"
            variant="secondary"
            className="w-full sm:w-auto cursor-pointer"
            onClick={() => {
              copyToClipboard(shareUrl);
              animate("share");
            }}
          >
            <AnimatePresence mode="wait">
              {clicked === "share" ? (
                <motion.span
                  key="share-copied"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  Link Copied ✔
                </motion.span>
              ) : (
                <motion.span key="share-idle">Copy Share URL</motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Note: If you generate Tailwind classes at runtime, consider
          safelisting arbitrary values in your Tailwind config for production
          builds.
        </p>
      </CardContent>
    </Card>
  );
}
