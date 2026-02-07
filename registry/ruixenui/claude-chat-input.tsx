"use client";

import * as React from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  X,
  FileText,
  Loader2,
  Check,
  Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

/* ------------------------------------------------------------------ */
/*  utility                                                           */
/* ------------------------------------------------------------------ */
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

/* ------------------------------------------------------------------ */
/*  types                                                             */
/* ------------------------------------------------------------------ */
export interface AttachedFile {
  id: string;
  file: File;
  type: string;
  preview: string | null;
  uploadStatus: "pending" | "uploading" | "complete";
}

export interface PastedContent {
  id: string;
  content: string;
  timestamp: Date;
}

export interface ModelOption {
  id: string;
  name: string;
  description?: string;
}

export interface SuggestionChip {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
}

export interface ClaudeChatInputProps {
  onSubmit?: (data: {
    message: string;
    files: AttachedFile[];
    pastedContent: PastedContent[];
    model: string;
    thinking: boolean;
  }) => void;
  placeholder?: string;
  models?: ModelOption[];
  defaultModel?: string;
  suggestions?: SuggestionChip[];
  greeting?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  file preview card                                                 */
/* ------------------------------------------------------------------ */
const FilePreviewCard: React.FC<{
  file: AttachedFile;
  onRemove: (id: string) => void;
}> = ({ file, onRemove }) => {
  const isImage = file.type.startsWith("image/") && file.preview;

  return (
    <div className="group/file relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-foreground/[0.06] bg-foreground/[0.015] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground/[0.10]">
      {isImage ? (
        <div className="relative h-full w-full">
          <img
            src={file.preview!}
            alt={file.file.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover/file:bg-black/0" />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="rounded bg-foreground/[0.04] p-1.5">
              <FileText className="h-3.5 w-3.5 text-foreground/30" />
            </div>
            <span className="truncate text-[10px] font-medium uppercase tracking-wider text-foreground/25">
              {file.file.name.split(".").pop()}
            </span>
          </div>
          <div className="space-y-0.5">
            <p
              className="truncate text-xs font-medium text-foreground/60"
              title={file.file.name}
            >
              {file.file.name}
            </p>
            <p className="text-[10px] text-foreground/25">
              {formatFileSize(file.file.size)}
            </p>
          </div>
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(file.id)}
        className="absolute right-1 top-1 h-auto w-auto rounded-full bg-black/40 p-1 text-white opacity-0 hover:bg-black/60 hover:text-white group-hover/file:opacity-100"
      >
        <X className="size-2.5" />
      </Button>

      {file.uploadStatus === "uploading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  pasted content card                                               */
/* ------------------------------------------------------------------ */
const PastedContentCard: React.FC<{
  content: PastedContent;
  onRemove: (id: string) => void;
}> = ({ content, onRemove }) => (
  <div className="group/paste relative flex h-24 w-28 flex-shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-foreground/[0.06] bg-foreground/[0.015] p-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground/[0.10]">
    <p className="line-clamp-4 select-none whitespace-pre-wrap break-words font-mono text-[10px] leading-[1.4] text-foreground/25">
      {content.content}
    </p>
    <Badge
      variant="outline"
      className="mt-2 w-fit rounded border-foreground/[0.08] px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-foreground/30"
    >
      PASTED
    </Badge>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onRemove(content.id)}
      className="absolute right-2 top-2 h-auto w-auto rounded-full border border-foreground/[0.08] bg-background p-[3px] text-foreground/25 opacity-0 hover:bg-background hover:text-foreground/50 group-hover/paste:opacity-100"
    >
      <X className="size-2" />
    </Button>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Claude starburst — the real icon, every curve authentic            */
/* ------------------------------------------------------------------ */
const ClaudeStarburst: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-[#c96442]", className)}
  >
    <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  model selector — Popover with thinking toggle & more models       */
/* ------------------------------------------------------------------ */
const ModelSelector: React.FC<{
  models: ModelOption[];
  selectedModel: string;
  onSelect: (id: string) => void;
  thinking: boolean;
  onThinkingChange: (v: boolean) => void;
}> = ({ models, selectedModel, onSelect, thinking, onThinkingChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const current = models.find((m) => m.id === selectedModel) || models[0];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-8 gap-1 rounded-xl px-2.5 text-[13px] font-medium tracking-[-0.01em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isOpen
              ? "bg-foreground/[0.06] text-foreground/70"
              : "text-foreground/40 hover:bg-foreground/[0.04] hover:text-foreground/60",
          )}
        >
          <span className="select-none whitespace-nowrap">{current.name}</span>
          <ChevronDown
            className={cn(
              "size-3 opacity-50 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isOpen && "rotate-180",
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[260px] rounded-xl p-0 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]"
      >
        {/* model list */}
        <div className="p-1.5">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                onSelect(model.id);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-foreground/[0.035]"
            >
              <div className="flex flex-col gap-px">
                <span className="text-[13.5px] font-medium tracking-[-0.01em] text-foreground/75">
                  {model.name}
                </span>
                {model.description && (
                  <span className="text-[11.5px] text-foreground/30">
                    {model.description}
                  </span>
                )}
              </div>
              {selectedModel === model.id && (
                <Check className="h-4 w-4 flex-shrink-0 text-emerald-500" />
              )}
            </button>
          ))}
        </div>

        <Separator className="mx-3 bg-foreground/[0.06]" />

        {/* extended thinking toggle */}
        <div className="p-1.5">
          <button
            onClick={() => onThinkingChange(!thinking)}
            className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-foreground/[0.035]"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-medium tracking-[-0.01em] text-foreground/75">
                Extended thinking
              </p>
              <p className="text-[11.5px] leading-snug text-foreground/30">
                Think longer for complex tasks
              </p>
            </div>
            <Switch
              checked={thinking}
              onCheckedChange={onThinkingChange}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="h-[22px] w-10 data-[state=checked]:bg-[#c96442] data-[state=unchecked]:bg-foreground/[0.12]"
            />
          </button>
        </div>

        <Separator className="mx-3 bg-foreground/[0.06]" />

        {/* more models */}
        <div className="p-1.5">
          <Button
            variant="ghost"
            className="flex h-auto w-full items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-foreground/[0.035]"
          >
            <span className="text-[13.5px] font-medium tracking-[-0.01em] text-foreground/45">
              More models
            </span>
            <ChevronRight className="size-4 text-foreground/25" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

/* ------------------------------------------------------------------ */
/*  defaults                                                          */
/* ------------------------------------------------------------------ */
const defaultModels: ModelOption[] = [
  {
    id: "opus-4.6",
    name: "Opus 4.6",
    description: "Most capable for ambitious work",
  },
  {
    id: "sonnet-4.5",
    name: "Sonnet 4.5",
    description: "Best for everyday tasks",
  },
  {
    id: "haiku-4.5",
    name: "Haiku 4.5",
    description: "Fastest for quick answers",
  },
];

const defaultSuggestions: SuggestionChip[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className="size-[18px]">
        <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z" />
      </svg>
    ),
    label: "Code",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className="size-[18px]">
        <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" />
      </svg>
    ),
    label: "Write",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className="size-[18px]">
        <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
      </svg>
    ),
    label: "Learn",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className="size-[18px]">
        <path d="M80,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm40,8a8,8,0,0,0,8-8V24a8,8,0,0,0-16,0V56A8,8,0,0,0,120,64Zm32,0a8,8,0,0,0,8-8V24a8,8,0,0,0-16,0V56A8,8,0,0,0,152,64Zm96,56v8a40,40,0,0,1-37.51,39.91,96.59,96.59,0,0,1-27,40.09H208a8,8,0,0,1,0,16H32a8,8,0,0,1,0-16H56.54A96.3,96.3,0,0,1,24,136V88a8,8,0,0,1,8-8H208A40,40,0,0,1,248,120ZM200,96H40v40a80.27,80.27,0,0,0,45.12,72h69.76A80.27,80.27,0,0,0,200,136Zm32,24a24,24,0,0,0-16-22.62V136a95.78,95.78,0,0,1-1.2,15A24,24,0,0,0,232,128Z" />
      </svg>
    ),
    label: "Life stuff",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className="size-[18px]">
        <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z" />
      </svg>
    ),
    label: "Claude's choice",
  },
];

/* ------------------------------------------------------------------ */
/*  main component                                                    */
/* ------------------------------------------------------------------ */
export default function ClaudeChatInput({
  onSubmit,
  placeholder = "How can I help you today?",
  models = defaultModels,
  defaultModel = "opus-4.6",
  suggestions = defaultSuggestions,
  greeting,
  className,
}: ClaudeChatInputProps) {
  const [message, setMessage] = React.useState("");
  const [files, setFiles] = React.useState<AttachedFile[]>([]);
  const [pastedContent, setPastedContent] = React.useState<PastedContent[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState(defaultModel);
  const [thinking, setThinking] = React.useState(false);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  /* auto-resize textarea */
  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 384) + "px";
  }, [message]);

  /* file handling */
  const handleFiles = React.useCallback((list: FileList | File[]) => {
    const incoming = Array.from(list).map((file) => {
      const isImage =
        file.type.startsWith("image/") ||
        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name);
      return {
        id: Math.random().toString(36).slice(2, 11),
        file,
        type: isImage
          ? "image/unknown"
          : file.type || "application/octet-stream",
        preview: isImage ? URL.createObjectURL(file) : null,
        uploadStatus: "pending" as const,
      };
    });

    setFiles((prev) => [...prev, ...incoming]);

    incoming.forEach((f) => {
      setTimeout(
        () =>
          setFiles((prev) =>
            prev.map((p) =>
              p.id === f.id ? { ...p, uploadStatus: "complete" as const } : p,
            ),
          ),
        600 + Math.random() * 800,
      );
    });
  }, []);

  /* paste handling */
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const pastedFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === "file") {
        const file = items[i].getAsFile();
        if (file) pastedFiles.push(file);
      }
    }
    if (pastedFiles.length > 0) {
      e.preventDefault();
      handleFiles(pastedFiles);
      return;
    }
    const text = e.clipboardData.getData("text");
    if (text.length > 300) {
      e.preventDefault();
      setPastedContent((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2, 11),
          content: text,
          timestamp: new Date(),
        },
      ]);
    }
  };

  /* drag & drop */
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  /* submit */
  const handleSend = () => {
    if (!message.trim() && files.length === 0 && pastedContent.length === 0)
      return;
    onSubmit?.({
      message,
      files,
      pastedContent,
      model: selectedModel,
      thinking,
    });
    setMessage("");
    setFiles([]);
    setPastedContent([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasContent =
    message.trim() || files.length > 0 || pastedContent.length > 0;

  return (
    <div
      className={cn("relative mx-auto w-full max-w-2xl", className)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* greeting — starburst + serif text, matching Claude's Tiempos feel */}
      {greeting && (
        <div className="mb-8 flex items-center justify-center gap-3.5">
          <ClaudeStarburst size={38} />
          <h2 className="font-serif text-[2.375rem] font-light tracking-[-0.02em] text-foreground/80">
            {greeting}
          </h2>
        </div>
      )}

      {/* input container — barely-there border, gentle shadow lift */}
      <div
        className={cn(
          "relative z-10 flex cursor-text flex-col rounded-[18px] border border-border bg-background shadow-[0_1px_4px_0_rgba(0,0,0,0.03)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        )}
      >
        <div className="px-4 pb-3 pt-4">
          {/* attachments row */}
          {(files.length > 0 || pastedContent.length > 0) && (
            <div className="mb-3 flex gap-2.5 overflow-x-auto pb-1">
              {pastedContent.map((c) => (
                <PastedContentCard
                  key={c.id}
                  content={c}
                  onRemove={(id) =>
                    setPastedContent((prev) => prev.filter((p) => p.id !== id))
                  }
                />
              ))}
              {files.map((f) => (
                <FilePreviewCard
                  key={f.id}
                  file={f}
                  onRemove={(id) =>
                    setFiles((prev) => prev.filter((p) => p.id !== id))
                  }
                />
              ))}
            </div>
          )}

          {/* textarea */}
          <div className="mb-4 max-h-96 overflow-y-auto">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              aria-label="Message input"
              className="min-h-0 w-full resize-none overflow-hidden rounded-none border-0 bg-transparent px-0 py-0 text-[15px] leading-[1.65] tracking-[-0.01em] text-foreground/90 shadow-none outline-none ring-0 ring-offset-0 placeholder:text-foreground/[0.28] focus-visible:ring-0 focus-visible:ring-offset-0"
              rows={1}
              style={{ minHeight: "1.5em" }}
            />
          </div>

          {/* action bar */}
          <div className="flex w-full items-center">
            {/* left: attach */}
            <div className="flex flex-1 items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                type="button"
                className="h-8 w-8 rounded-xl text-foreground/25 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-foreground/[0.04] hover:text-foreground/45 active:scale-95"
              >
                <Plus className="size-5" strokeWidth={1.8} />
              </Button>
            </div>

            {/* right: model selector + send */}
            <div className="flex items-center gap-2">
              <ModelSelector
                models={models}
                selectedModel={selectedModel}
                onSelect={setSelectedModel}
                thinking={thinking}
                onThinkingChange={setThinking}
              />

              {/* send — raw button to avoid shadcn base-class conflicts */}
              <button
                onClick={handleSend}
                disabled={!hasContent}
                type="button"
                style={{ backgroundColor: "#E2AF9E" }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm text-white shadow-[0_1px_3px_rgba(226,175,158,0.3)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#d4714d] active:scale-[0.92] disabled:cursor-default"
              >
                <ArrowUp className="size-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* suggestion chips — barely-there pills, warm on hover */}
      {suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {suggestions.map((chip, i) => (
            <Button
              key={i}
              variant="outline"
              onClick={chip.onClick}
              type="button"
              className="h-auto gap-1.5 rounded-md border-foreground/[0.06] bg-transparent px-3 py-[6.5px] text-[13.7px] font-medium tracking-[-0.01em] text-foreground/50 shadow-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground/[0.12] hover:bg-foreground/[0.02] hover:text-foreground/50 active:scale-[0.97]"
            >
              <span className="">{chip.icon}</span>
              {chip.label && <span>{chip.label}</span>}
            </Button>
          ))}
        </div>
      )}

      {/* drag overlay */}
      {isDragging && (
        <div className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-foreground/15 bg-background/90 backdrop-blur-sm">
          <Archive className="mb-2 h-8 w-8 animate-bounce text-foreground/40" />
          <p className="text-sm font-medium text-foreground/40">
            Drop files to upload
          </p>
        </div>
      )}

      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
