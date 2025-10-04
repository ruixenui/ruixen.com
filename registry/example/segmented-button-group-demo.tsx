"use client";

import SegmentedButtonGroup from "@/registry/ruixenui/segmented-button-group";
import { useState } from "react";

export default function SegmentedButtonGroupDemo() {
  const [period, setPeriod] = useState("Day");

  return (
    <div className="p-6 flex flex-col gap-4">
      <SegmentedButtonGroup
        options={["Day", "Week", "Month"]}
        selected={period}
      />
      <p>Selected Period: {period}</p>

      <SegmentedButtonGroup options={["Low", "Medium", "High", "Critical"]} />
    </div>
  );
}
