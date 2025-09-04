"use client";

import ShowcaseCard from "../ruixenui/showcase-card";

export default function ShowcaseCardDemo() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ShowcaseCard
        title="Build Stunning Interfaces"
        subtitle="Harness the power of elegant components built for speed and clarity with RUIXEN UI"
        image="/ruixenui-bg.png"
        badge={{ text: "New", variant: "orange" }}
        href="#"
        id="showcase-card"
      />
    </div>
  );
}
