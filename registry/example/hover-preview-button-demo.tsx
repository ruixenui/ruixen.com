"use client";

import HoverPreviewButton from "@/registry/ruixenui/hover-preview-button";

export default function HoverPreviewButtonDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-6">
      <HoverPreviewButton
        label="View Report"
        previewContent={
          <div style={{ fontSize: 13 }}>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Sales Report</p>
            <p>Total Revenue: $12,340</p>
            <p>New Customers: 120</p>
          </div>
        }
      />
    </div>
  );
}
