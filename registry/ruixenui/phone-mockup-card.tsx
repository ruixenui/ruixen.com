"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IoCellular, IoWifi, IoBatteryFull } from "react-icons/io5";

interface PhoneMockupCardProps {
  title?: string;
  bodyText?: string;
  highlight?: string;
  secondaryText?: string;
  metrics?: { label: string; value: string }[];
  className?: string;
}

const ease = [0.2, 0.8, 0.2, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease },
  },
};

export default function PhoneMockupCard({
  title = "Craft",
  bodyText = "Interfaces shaped by spatial intention — where every surface, shadow, and transition exists with purpose.",
  highlight = "spatial intention",
  secondaryText = "Typography that breathes. Motion that guides. Surfaces that know the light.",
  metrics = [
    { label: "Tracking", value: "–0.02" },
    { label: "Leading", value: "1.65" },
    { label: "Weight", value: "420" },
  ],
  className,
}: PhoneMockupCardProps) {
  const renderBody = () => {
    if (!highlight || !bodyText.includes(highlight)) return <p>{bodyText}</p>;
    const i = bodyText.indexOf(highlight);
    return (
      <p>
        {bodyText.slice(0, i)}
        <span className="font-medium text-neutral-800 dark:text-neutral-200">
          {highlight}
        </span>
        {bodyText.slice(i + highlight.length)}
      </p>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease }}
      className={`relative w-full max-w-[340px] ${className ?? ""}`}
      style={{
        maskImage: "linear-gradient(to bottom, black 82%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent)",
      }}
    >
      {/* device frame */}
      <div
        className="rounded-t-[46px] border border-neutral-200/80 bg-neutral-100 p-[6px] dark:border-neutral-700/50 dark:bg-neutral-800"
        style={{
          boxShadow: "0 5px 10px rgba(0,0,0,0.12), 0 8px 30px rgba(0,0,0,0.12)",
        }}
      >
        {/* screen */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="overflow-hidden rounded-t-[40px] bg-white dark:bg-neutral-950"
          style={{
            boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.1)",
          }}
        >
          {/* status bar + dynamic island — single row */}
          <div className="relative flex items-center justify-center px-7 pb-1 pt-3">
            <span className="absolute left-7 text-[12px] font-semibold leading-none text-neutral-800 dark:text-neutral-200">
              9:41
            </span>
            <div className="h-[28px] w-[96px] rounded-full bg-black" />
            <div className="absolute right-7 flex items-center gap-1">
              <IoCellular
                size={15}
                className="text-neutral-800 dark:text-neutral-200"
              />
              <IoWifi
                size={16}
                className="text-neutral-800 dark:text-neutral-200"
              />
              <IoBatteryFull
                size={20}
                className="text-neutral-800 dark:text-neutral-200"
              />
            </div>
          </div>

          {/* content */}
          <div className="px-6 pb-16 pt-6">
            {/* app nav */}
            <motion.div
              variants={item}
              className="mb-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-[7px] w-[7px] rounded-full bg-neutral-900 dark:bg-neutral-100" />
                <span className="text-[15px] font-semibold tracking-[-0.03em] text-neutral-900 dark:text-neutral-100">
                  {title}
                </span>
              </div>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="currentColor"
                className="text-neutral-400 dark:text-neutral-600"
              >
                <circle cx="2.5" cy="7.5" r="1.2" />
                <circle cx="7.5" cy="7.5" r="1.2" />
                <circle cx="12.5" cy="7.5" r="1.2" />
              </svg>
            </motion.div>

            {/* separator */}
            <motion.div
              variants={item}
              className="mb-6 h-px bg-neutral-200 dark:bg-neutral-800"
            />

            {/* body */}
            <motion.div
              variants={item}
              className="space-y-3 text-[13.5px] leading-[1.7] tracking-[-0.01em] text-neutral-500 dark:text-neutral-400"
            >
              {renderBody()}
              <p className="text-neutral-400 dark:text-neutral-500">
                {secondaryText}
              </p>
            </motion.div>

            {/* metrics */}
            <motion.div variants={item} className="mt-8 grid grid-cols-3 gap-3">
              {metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-[18px] font-light tabular-nums tracking-tight text-neutral-800 dark:text-neutral-200">
                    {m.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.06em] text-neutral-400 dark:text-neutral-500">
                    {m.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
