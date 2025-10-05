"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VerificationCardProps {
  backgroundImage?: string;
  idNumber?: string;
  name?: string;
  validThru?: string;
  label?: string;
}

export function VerificationCard({
  backgroundImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png",
  idNumber = "ID **** 4590",
  name = "JANE DOE",
  validThru = "11/29",
  label = "IDENTITY CARD",
}: VerificationCardProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative h-52 w-80 rounded-2xl p-6 shadow-2xl text-white flex flex-col justify-between bg-cover bg-center",
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 rounded-2xl" />

      {/* Card Content */}
      <div className="relative z-10 flex justify-between items-start text-xs tracking-wide">
        <span>{label}</span>
        <span>VALID</span>
      </div>

      <div className="relative z-10">
        <p className="text-lg tracking-widest font-semibold">{idNumber}</p>
        <div className="flex justify-between text-sm mt-2">
          <span>{name}</span>
          <span>{validThru}</span>
        </div>
      </div>
    </motion.div>
  );
}
