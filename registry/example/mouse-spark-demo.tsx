"use client";

import React, { useState } from "react";
import MouseSpark from "@/registry/ruixenui/mouse-spark";

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <MouseSpark />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: theme === "dark" ? "#000" : "#fff",
          fontSize: "1rem",
          textAlign: "center",
        }}
      >
        Move your mouse to see the splash effect!
      </div>
    </div>
  );
}
