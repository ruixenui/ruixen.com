"use client";

import AnimatedHighlightText, {
  HeartIcon,
  Highlight,
  MousePointerClickIcon,
  SparklesIcon,
} from "@/registry/ruixenui/animated-highlight-text";

const CDN = "https://ruixen.com/card-slides";

export default function AnimatedHighlightTextDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-8 py-20">
      <AnimatedHighlightText className="text-center">
        Every interface deserves thoughtful craft: effortlessly{" "}
        <Highlight
          icon={<MousePointerClickIcon />}
          image={`${CDN}/card-slide-01.jpg`}
          imageAlt="Built"
        >
          built
        </Highlight>
        , truly{" "}
        <Highlight
          icon={<HeartIcon />}
          color="#ef4444"
          image={`${CDN}/card-slide-02.jpg`}
          imageAlt="Loved"
        >
          loved
        </Highlight>
        , beautifully{" "}
        <Highlight
          icon={<SparklesIcon />}
          image={`${CDN}/card-slide-03.jpg`}
          imageAlt="Polished"
        >
          polished
        </Highlight>
        .
      </AnimatedHighlightText>
    </div>
  );
}
