"use client";

import { useState } from "react";

export default function HoverPreview({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-simulated-hover={enabled ? "true" : "false"}
    >
      {children}
    </div>
  );
}
