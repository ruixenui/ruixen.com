"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const HamburgurNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setIsOpen(false); // sm breakpoint
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: [50, -10, 5, 0],
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <>
      <button
        className="z-40 flex items-center justify-center w-10 h-10 text-white rounded-full sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed top-0 right-0 w-2/3 h-full bg-black bg-opacity-90 backdrop-blur-md shadow-lg z-30 p-6 flex flex-col space-y-6 sm:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.a
                href="https://github.com"
                className="flex items-center space-x-2 text-white hover:text-gray-300"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <span className="bg-zinc-900 border border-zinc-800 p-2 rounded-full">
                  <FaGithub size={20} />
                </span>
              </motion.a>

              <motion.a
                href="https://twitter.com"
                className="flex items-center space-x-2 text-white hover:text-gray-300"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <span className="bg-zinc-900 border border-zinc-800 p-2 rounded-full">
                  <RiTwitterXLine size={20} />
                </span>
              </motion.a>

              <motion.a
                href="https://discord.com"
                className="flex items-center space-x-2 text-white hover:text-gray-300"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <span className="bg-zinc-900 border border-zinc-800 p-2 rounded-full">
                  <FaDiscord size={20} />
                </span>
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgurNavbar;
