"use client";

import { useState, useMemo } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MaterialSettings, TextureSettings } from "./lib/types";
import { defaultMaterialSettings, defaultTextureSettings } from "./lib/types";
import type { LightSettings } from "./lib/canvas-defaults";
import { defaultLightSettings } from "./lib/canvas-defaults";

interface EmbedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inputTab: string;
  text: string;
  font: string;
  activeSvg: string;
  depth: number;
  smoothness: number;
  color: string;
  materialSettings: MaterialSettings;
  textureUrl: string | null;
  textureSettings: TextureSettings;
  animate: string;
  animateSpeed: number;
  animateReverse: boolean;
  rotationX: number;
  rotationY: number;
  zoom: number;
  cursorOrbit: boolean;
  orbitStrength: number;
  resetOnIdle: boolean;
  resetDelay: number;
  lightSettings: LightSettings;
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

function generateProps(props: EmbedDialogProps): string {
  const lines: string[] = [];

  if (props.inputTab === "text") {
    lines.push(`  text="${props.text}"`);
    if (props.font !== "DM Sans") lines.push(`  font="${props.font}"`);
  } else {
    lines.push(`  svg={mySvg}`);
  }

  if (props.depth !== 1) lines.push(`  depth={${props.depth}}`);
  if (props.smoothness !== 0.2)
    lines.push(`  smoothness={${props.smoothness}}`);
  if (props.color !== "#ffffff") lines.push(`  color="${props.color}"`);

  if (props.materialSettings.preset !== "default") {
    lines.push(`  material="${props.materialSettings.preset}"`);
  }
  if (props.materialSettings.metalness !== defaultMaterialSettings.metalness) {
    lines.push(`  metalness={${props.materialSettings.metalness}}`);
  }
  if (props.materialSettings.roughness !== defaultMaterialSettings.roughness) {
    lines.push(`  roughness={${props.materialSettings.roughness}}`);
  }
  if (props.materialSettings.opacity !== defaultMaterialSettings.opacity) {
    lines.push(`  opacity={${props.materialSettings.opacity}}`);
  }
  if (props.materialSettings.wireframe) lines.push(`  wireframe`);

  if (props.textureUrl) {
    lines.push(`  texture="${props.textureUrl}"`);
    if (props.textureSettings.repeatX !== defaultTextureSettings.repeatX) {
      lines.push(`  textureRepeat={${props.textureSettings.repeatX}}`);
    }
    if (props.textureSettings.rotation !== defaultTextureSettings.rotation) {
      lines.push(`  textureRotation={${props.textureSettings.rotation}}`);
    }
    if (
      props.textureSettings.offsetX !== defaultTextureSettings.offsetX ||
      props.textureSettings.offsetY !== defaultTextureSettings.offsetY
    ) {
      lines.push(
        `  textureOffset={[${props.textureSettings.offsetX}, ${props.textureSettings.offsetY}]}`,
      );
    }
  }

  if (props.animate !== "none") {
    lines.push(`  animate="${props.animate}"`);
    if (props.animateSpeed !== 1)
      lines.push(`  animateSpeed={${props.animateSpeed}}`);
    if (props.animateReverse) lines.push(`  animateReverse`);
  }

  if (props.rotationX !== 0)
    lines.push(`  rotationX={${round(props.rotationX)}}`);
  if (props.rotationY !== 0)
    lines.push(`  rotationY={${round(props.rotationY)}}`);
  if (props.zoom !== 8) lines.push(`  zoom={${props.zoom}}`);

  if (props.cursorOrbit) {
    lines.push(`  cursorOrbit`);
    if (props.orbitStrength !== 0.15)
      lines.push(`  orbitStrength={${props.orbitStrength}}`);
  }
  if (props.resetOnIdle) {
    lines.push(`  resetOnIdle`);
    if (props.resetDelay !== 2)
      lines.push(`  resetDelay={${props.resetDelay}}`);
  }

  const dl = defaultLightSettings;
  const ls = props.lightSettings;
  if (ls.keyX !== dl.keyX || ls.keyY !== dl.keyY || ls.keyZ !== dl.keyZ) {
    lines.push(`  lightPosition={[${ls.keyX}, ${ls.keyY}, ${ls.keyZ}]}`);
  }
  if (ls.keyIntensity !== dl.keyIntensity)
    lines.push(`  lightIntensity={${ls.keyIntensity}}`);
  if (ls.ambientIntensity !== dl.ambientIntensity)
    lines.push(`  ambientIntensity={${ls.ambientIntensity}}`);
  if (!ls.shadowEnabled) lines.push(`  shadow={false}`);

  return lines.join("\n");
}

function formatCode(code: string) {
  return code.split("\n").map((line, i) => (
    <span key={i} className="block">
      <span className="inline-block w-7 text-right mr-4 text-muted-foreground/60 select-none">
        {i + 1}
      </span>
      {line}
    </span>
  ));
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pb-4 min-w-0">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-[10px] font-medium text-foreground/70">
          {number}
        </span>
        <span className="text-sm text-foreground/80">{title}</span>
      </div>
      {children}
    </div>
  );
}

function CodeBlock({
  code,
  label,
  onCopy,
  copied,
  lineNumbers = true,
}: {
  code: string;
  label: string;
  onCopy: () => void;
  copied: boolean;
  lineNumbers?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted overflow-hidden mt-2 min-w-0">
      {label && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <span className="text-[11px] text-muted-foreground font-mono">
            {label}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            onClick={onCopy}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      )}
      <pre className="p-4 text-[11px] leading-relaxed font-mono overflow-auto max-h-56 whitespace-pre w-0 min-w-full">
        {lineNumbers ? formatCode(code) : code}
      </pre>
    </div>
  );
}

export function EmbedDialog(props: EmbedDialogProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const isTextMode = props.inputTab === "text";

  const embedCode = useMemo(() => {
    const propsStr = generateProps(props);
    if (!propsStr) return `<Extrude />`;
    return `<Extrude\n${propsStr}\n/>`;
  }, [props]);

  const fullSnippet = useMemo(() => {
    const importLine = `import { Extrude } from "@ruixen/extrude";`;
    if (!isTextMode) {
      const escaped = props.activeSvg.replace(/`/g, "\\`");
      return `${importLine}\n\nconst mySvg = \`${escaped}\`;\n\n${embedCode}`;
    }
    return `${importLine}\n\n${embedCode}`;
  }, [embedCode, isTextMode, props.activeSvg]);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border border-border shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Embed</DialogTitle>
        </DialogHeader>

        <div className="mt-1">
          <Step number={1} title="Install the package">
            <CodeBlock
              code="npm install @ruixen/extrude"
              label="Terminal"
              onCopy={() => handleCopy("npm install @ruixen/extrude", "npm")}
              copied={copied === "npm"}
              lineNumbers={false}
            />
          </Step>

          <Step
            number={2}
            title={
              isTextMode
                ? "Add the component to your project"
                : "Copy and paste into your component"
            }
          >
            <CodeBlock
              code={fullSnippet}
              label="your-component.tsx"
              onCopy={() => handleCopy(fullSnippet, "code")}
              copied={copied === "code"}
            />
          </Step>
        </div>
      </DialogContent>
    </Dialog>
  );
}
