"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface LogoItem {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
  className?: string;
}

export interface TrustedClientsShowcaseProps {
  logos?: LogoItem[];
  defaultHeight?: number;
  defaultWidth?: number;
}

export const TrustedClientsShowcase: React.FC<TrustedClientsShowcaseProps> = ({
  logos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "Slack Logo",
      href: "https://slack.com",
      width: 54,
      height: 24,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "Amazon Logo",
      href: "https://amazon.com",
      width: 54,
      height: 24,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "GitHub Logo",
      href: "https://github.com",
      width: 54,
      height: 24,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "PlayStation Logo",
      href: "https://playstation.com",
      width: 54,
      height: 24,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "IBM Logo",
      href: "https://ibm.com",
      width: 54,
      height: 24,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "Ebay Logo",
      href: "https://ebay.com",
      width: 54,
      height: 24,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "Meta Logo",
      href: "https://meta.com",
      width: 54,
      height: 24,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "Adobe Logo",
      href: "https://adobe.com",
      width: 54,
      height: 24,
    },
  ],
  defaultHeight = 24,
  defaultWidth = 60,
}) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", bounce: 0.3 },
    },
  };

  return (
    <section className="overflow-hidden bg-background py-16 md:py-32">
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-14"
        >
          {logos.map((logo, index) => (
            <motion.div key={index} className="flex">
              <Link
                href={logo.href || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={`mx-auto object-contain grayscale dark:grayscale-0 ${logo.className || ""}`}
                  src={logo.src}
                  alt={logo.alt}
                  height={logo.height || defaultHeight}
                  width={logo.width || defaultWidth}
                  unoptimized={logo.src.startsWith("http")}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
