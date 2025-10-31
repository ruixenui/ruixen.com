"use client";

import CoreValueStats, { CoreStat } from "@/registry/ruixenui/core-value-stats";

export default function CoreValueStatsDemo() {
  const stats: CoreStat[] = [
    {
      value: "8+",
      label: "Years of Innovation",
      description:
        "Over eight years of building design systems that empower developers and designers.",
    },
    {
      value: "32+",
      label: "Industries Served",
      description:
        "From fintech to healthcare, we build adaptive digital frameworks for every challenge.",
    },
    {
      value: "20+",
      label: "Creative Partners",
      description:
        "We work with studios and startups to transform bold ideas into exceptional results.",
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/abstract-bg_11zon.jpg",
    },
    {
      value: "19+",
      label: "Expert Teams",
      description:
        "A collective of engineers, designers, and strategists united by a shared goal.",
    },
    {
      value: "100+",
      label: "Delivered Projects",
      description:
        "Every launch is proof of our dedication to craft, performance, and seamless user experience.",
    },
  ];

  return <CoreValueStats stats={stats} />;
}
