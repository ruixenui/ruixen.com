"use client";

import * as React from "react";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: `${100 / ratio}%`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 0 }} {...props} />
    </div>
  ),
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
