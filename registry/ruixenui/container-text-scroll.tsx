"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerTextScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scale from smaller to full size as we scroll
  const scaleDimensions = () => (isMobile ? [0.8, 1] : [0.9, 1]);

  // Tilt forward from bottom: start 20°, end 0° (straight)
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translateY = useTransform(scrollYProgress, [0, 1], [100, 0]); // moves up
  const titleTranslateY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div
      ref={containerRef}
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative px-8"
    >
      <motion.div
        style={{ translateY }}
        className="relative w-full max-w-5xl flex flex-col items-center justify-center"
      >
        {/* Card */}
        <Card rotate={rotate} scale={scale}>
          {children}

          {/* Title inside card */}
          <motion.div
            style={{ translateY: titleTranslateY, scale: titleScale }}
            className="absolute inset-0 flex items-center justify-center text-center px-4"
          >
            <div className="text-white">{titleComponent}</div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="relative h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] bg-[#222222] rounded-[30px] shadow-2xl overflow-hidden"
    >
      <div className="h-full w-full rounded-2xl bg-gray-100 dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};
