"use client" 

import * as React from "react"
 
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
 
export interface MagicTextProps {
  text: string;
}
 
interface WordProps {
  children: string;
  progress: any;
  range: number[];
}
 
const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
 
  return (
    <span className="relative mt-[12px] mr-1 text-3xl font-medium">
      <span className="absolute opacity-20 text-center">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const container = useRef(null);
 
  const { scrollYProgress } = useScroll({
    target: container,
 
    offset: ["start 0.9", "start 0.25"],
  });
  text;
  const words = text.split(" ");
 
  return (
    <p ref={container} className="flex text-gray-800 dark:text-white flex-wrap m-auto leading-[0.5] p-4 items-center justify-center">
      {words.map((word, i) => {
        const start = i / words.length;
 
        const end = start + 1 / words.length;
 
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};