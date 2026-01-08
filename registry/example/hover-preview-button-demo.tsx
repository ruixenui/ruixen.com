"use client";

import HoverPreviewButton from "@/registry/ruixenui/hover-preview-button";

export default function HoverPreviewButtonDemo() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-6">
      <HoverPreviewButton
        label="View Report"
        previewContent={
          <div className="text-sm">
            <p className="font-semibold mb-1">Sales Report</p>
            <p>Total Revenue: $12,340</p>
            <p>New Customers: 120</p>
          </div>
        }
      />

      <HoverPreviewButton
        label="Preview Image"
        previewContent={
          <img
            src="https://placekitten.com/200/150"
            alt="Preview"
            className="w-full h-auto rounded-md"
          />
        }
      />

      <HoverPreviewButton
        label="Mini Chart"
        previewContent={
          <div className="w-full h-24 bg-gray-100 flex items-center justify-center rounded-md text-gray-500">
            Chart Preview
          </div>
        }
      />
    </div>
  );
}
