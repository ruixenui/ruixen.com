"use client";

import ShowcaseCard from "../ruixenui/showcase-card";

export default function ShowcaseCardDemo() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ShowcaseCard
        title="Build Stunning Interfaces"
        subtitle="Harness the power of elegant components built for speed and clarity with RUIXEN UI"
        image="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_hero_gradient.jpg"
        badge={{ text: "New", variant: "orange" }}
        href="#"
        id="showcase-card"
      />
    </div>
  );
}
