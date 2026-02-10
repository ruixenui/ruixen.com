"use client";

import * as React from "react";
import { ButtonLoading } from "@/registry/ruixenui/button-loading";
import type { LoadingButtonState } from "@/registry/ruixenui/button-loading";

export default function ButtonLoadingDemo() {
  const [state, setState] = React.useState<LoadingButtonState>("idle");

  const handleClick = () => {
    setState("loading");
    setTimeout(() => {
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    }, 2000);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonLoading state={state} onClick={handleClick}>
        Submit
      </ButtonLoading>
      <ButtonLoading state="idle" variant="outline">
        Idle
      </ButtonLoading>
      <ButtonLoading state="loading" variant="primary">
        Processing
      </ButtonLoading>
      <ButtonLoading state="success" variant="primary">
        Done
      </ButtonLoading>
      <ButtonLoading state="error" variant="primary">
        Failed
      </ButtonLoading>
    </div>
  );
}
