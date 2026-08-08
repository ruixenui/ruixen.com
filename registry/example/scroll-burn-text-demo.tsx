"use client";

import { useRef } from "react";

import { ScrollBurnText } from "@/registry/ruixenui/scroll-burn-text";

const SECTIONS = [
  "Every interface worth using begins as a list of things it refuses to do. The first idea is free and the second one is cheap, so cut them both and keep cutting, well past the point where it starts to feel wasteful, until what is left cannot lose another piece and still stand up on its own.",
  "Type, colour and motion are not a coat of paint you roll on at the end. They are the material the thing is made of, and the only honest way to learn how they behave is to build with them, stand back, and look hard at what you actually made rather than at what you meant to make.",
  "The best change is the one nobody can point at, because the friction it removed was never something anyone had a word for. Nobody writes in to thank you for the step they did not have to take. Ship it anyway, then go looking for the next one, and for the one waiting behind that.",
];

export default function ScrollBurnTextDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ScrollBurnText sections={SECTIONS} container={containerRef} />
    </div>
  );
}
