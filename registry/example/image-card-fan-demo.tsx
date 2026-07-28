"use client";

import {
  ImageCardFan,
  type FanCardItem,
} from "@/registry/ruixenui/image-card-fan";

const cards: FanCardItem[] = [
  {
    id: "deep-field",
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg",
    title: "Deep Field",
    description:
      "A diver held inside a sunset horizon, the seascape cut to the shape of a profile. Printed at 300gsm on uncoated stock.",
  },
  {
    id: "city-exposure",
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/821d815affa6496c39cbdeeec7a84603.jpg",
    title: "City Exposure",
    description:
      "Double exposure of a portrait and a skyline at dusk, where the streetlights read as freckles across the jaw.",
  },
  {
    id: "motion-study",
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/937438c560ada1c83317f2c11b3454b0.jpg",
    title: "Motion Study",
    description:
      "One long exposure, one turn of the head. The orange backdrop stays still while everything in front of it smears.",
  },
  {
    id: "kinetic-bloom",
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/98f89cb9994f5c382ab964062c4039db.jpg",
    title: "Kinetic Bloom",
    description:
      "A racket dissolving mid-swing into a cloud of colour, drawn the moment the follow-through leaves the frame.",
  },
  {
    id: "paper-flight",
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg",
    title: "Paper Flight",
    description:
      "A cut-paper bird threaded between two fingers, the only colour in an otherwise black and white plate.",
  },
];

export default function ImageCardFanDemo() {
  return (
    <div className="flex w-full items-center justify-center bg-background px-6 py-10">
      <ImageCardFan cards={cards} className="max-w-5xl" />
    </div>
  );
}
