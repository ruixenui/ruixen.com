"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollTextRiseProps {
  text: string;
  className?: string;
  /** Text size classes */
  textClassName?: string;
}

const ScrollTextRise: FC<ScrollTextRiseProps> = ({
  text,
  className,
  textClassName,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      data-scroll-text-rise
      className={cn("relative h-[500px] overflow-y-auto", className)}
      style={{ scrollbarWidth: "none" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `[data-scroll-text-rise]::-webkit-scrollbar{display:none}`,
        }}
      />
      {/* 3× container height creates the scroll runway */}
      <div className="h-[300%]">
        {/* sticky viewport — calc(100%/3) of the 300% parent = exact container height */}
        <div className="sticky top-0 mx-auto flex h-[calc(100%/3)] max-w-4xl flex-col items-center justify-center">
          <p
            className={cn(
              "flex flex-wrap justify-center p-5 text-center text-xl font-medium text-black/20 dark:text-white/20 sm:text-3xl md:p-8 md:text-[2rem] lg:p-10 lg:text-[2.5rem] xl:text-[3.1rem]",
              textClassName,
            )}
          >
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 0.03;
              return (
                <RevealWord
                  key={`${i}-${word}`}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </RevealWord>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

interface RevealWordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const RevealWord: FC<RevealWordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <span className="relative mx-1 overflow-hidden lg:mx-2.5 xl:mx-3">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity, y }}
        className="inline-block text-black dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  );
};

export { ScrollTextRise };
