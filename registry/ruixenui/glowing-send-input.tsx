"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

interface GlowingSendInputProps {
  placeholder?: string;
  sendIcon?: React.ReactNode;
  className?: string;
  onSend?: (value: string) => void;
}

export default function GlowingSendInput({
  placeholder = "Type your message...",
  sendIcon,
  className,
  onSend,
}: GlowingSendInputProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (message.trim() === "") return;
    setIsSending(true);
    onSend?.(message);
    setTimeout(() => {
      setMessage("");
      setIsSending(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={cn("w-full max-w-md relative", className)}>
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none blur-lg opacity-70 transition-opacity group-focus-within:opacity-100"
        initial={{ opacity: 0.4 }}
        animate={{
          boxShadow: [
            "0 0 10px rgba(99,102,241,0.7)",
            "0 0 20px rgba(99,102,241,0.9)",
            "0 0 10px rgba(99,102,241,0.7)",
          ],
        }}
        transition={{ repeat: Infinity, repeatType: "loop", duration: 2 }}
      />

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        disabled={isSending}
        className={`${poppins.className} w-full p-3 pr-12 pl-5 rounded-full backdrop-blur-lg focus:outline-none transition-all border bg-white/70 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800/70 dark:text-gray-100 dark:border-zinc-700 dark:placeholder:text-zinc-400 dark:focus:ring-indigo-500 ${
          isSending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />

      <motion.button
        onClick={handleSend}
        disabled={isSending}
        whileHover={{ scale: 1.1 }}
        className={cn(
          "absolute right-2 top-1.5 p-2 rounded-full backdrop-blur-lg shadow-lg",
          isSending
            ? "bg-gray-400 dark:bg-zinc-600 cursor-not-allowed"
            : message.trim() !== ""
              ? "bg-indigo-500 hover:bg-indigo-600"
              : "bg-gray-300 hover:bg-gray-400 dark:bg-zinc-700 dark:hover:bg-zinc-600",
        )}
      >
        {sendIcon ?? <FaArrowRight size={20} className="text-white" />}
      </motion.button>
    </div>
  );
}
