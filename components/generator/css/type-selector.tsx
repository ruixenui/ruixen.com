"use client";

import * as React from "react";
import type { GradientType } from "@/lib/use-gradient";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TypeSelectorProps {
  value: GradientType;
  onChange: (value: GradientType) => void;
}

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-slate-500">Type</p>
      <Tabs value={value} onValueChange={(v) => onChange(v as GradientType)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="linear">Linear</TabsTrigger>
          <TabsTrigger value="radial">Radial</TabsTrigger>
          <TabsTrigger value="conic">Conic</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
