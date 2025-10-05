"use client";

import * as React from "react";
import {
  Carousel3DSelect,
  CarouselOption,
} from "@/registry/ruixenui/carousel-3d-select";

const options: CarouselOption[] = [
  { value: "template1", label: "Template 1", color: "#f87171" },
  { value: "template2", label: "Template 2", color: "#fbbf24" },
  { value: "template3", label: "Template 3", color: "#34d399" },
  { value: "template4", label: "Template 4", color: "#60a5fa" },
  { value: "template5", label: "Template 5", color: "#a78bfa" },
];

export default function DemoCarousel3DSelect() {
  const [selected, setSelected] = React.useState<string>("");

  return (
    <div className="p-8 flex flex-col gap-8 items-center">
      <h1 className="text-xl font-bold">3D Carousel Select Demo</h1>
      <Carousel3DSelect
        options={options}
        radius={150}
        itemWidth={100}
        itemHeight={60}
        placeholder="Pick a template"
        onChange={setSelected}
      />
    </div>
  );
}
