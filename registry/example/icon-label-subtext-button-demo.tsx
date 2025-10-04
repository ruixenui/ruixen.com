import IconLabelSubtextButton from "@/registry/ruixenui/icon-label-subtext-button";
import { DownloadCloud, Loader2, Check } from "lucide-react";

export default function DemoIconLabelSubtextButton() {
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <div className="flex gap-4 items-center">
        <IconLabelSubtextButton
          icon={<DownloadCloud />}
          label="Download"
          subtext="File size: 12MB"
          onClick={() => alert("Downloading...")}
        />

        <IconLabelSubtextButton
          icon={<DownloadCloud />}
          label="Export CSV"
          subtext="Rows: 12,341"
          variant="outline"
          size="lg"
          badge={"NEW"}
        />

        <IconLabelSubtextButton
          icon={<DownloadCloud />}
          label="Save"
          subtext="Auto-save enabled"
          variant="ghost"
          size="sm"
          tooltip="Saves your current draft to cloud storage"
        />
      </div>

      <div className="flex gap-4 items-center">
        <IconLabelSubtextButton
          icon={<DownloadCloud />}
          label="Upload"
          subtext=".png, .jpg only"
          loading
        />
        <IconLabelSubtextButton
          icon={<DownloadCloud />}
          label="Sent"
          subtext="Delivered"
          success
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Use cases: downloads, uploads, attachments, contextual actions (e.g.,
        "Add — 3 items"), or any place where a short caption helps reduce
        ambiguity.
      </p>
    </div>
  );
}
