'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa'; 
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export const codeStringInput_01 = `
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa'; 
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"], weight: "500" });

function Input_01 () {
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSend = () => {
    if (message.trim() !== "") {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setMessage("");
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-zinc-950 transition-colors duration-500 p-4">
      <div className="relative flex flex-col items-center space-y-4 w-full max-w-lg md:max-w-md">
        <div className="relative w-full group">
          
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none blur-lg opacity-70 group-focus-within:opacity-100 transition-opacity"
            initial={{ opacity: 0.4 }}
            animate={{
              boxShadow: [
                "0 0 10px rgba(99,102,241,0.7)",
                "0 0 20px rgba(99,102,241,0.9)",
                "0 0 10px rgba(99,102,241,0.7)",
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
            }}
          />

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className={\`\${inter.className} w-full p-3 pr-12 pl-5 rounded-full backdrop-blur-lg focus:outline-none transition-all border \${isSending ? "opacity-50 cursor-not-allowed" : ""} bg-white/70 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800/70 dark:text-gray-100 dark:border-zinc-700 dark:placeholder:text-zinc-400 dark:focus:ring-indigo-500\`}
            disabled={isSending}
          />

          <motion.button
            onClick={handleSend}
            className={\`absolute right-2 top-1.5 p-2 rounded-full backdrop-blur-lg shadow-lg \${isSending ? "bg-gray-400 dark:bg-zinc-600 cursor-not-allowed" : message.trim() !== "" ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-300 hover:bg-gray-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"}\`}
            whileHover={{ scale: 1.1 }}
            disabled={isSending}
          >
            <FaArrowRight size={20} className="text-white" />
          </motion.button>

          {isSending && (
            <motion.div
              className="absolute inset-0 flex items-center pl-5 pr-12 overflow-hidden pointer-events-none rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [1, 0.5, 0],
                filter: ["blur(0px)", "blur(5px)", "blur(12px)"],
              }}
              transition={{ duration: 2, ease: "linear" }}
            >
              <div className="relative w-full h-full overflow-hidden">
                {[...Array(25)].map((_, index) => {
                  const size = Math.random() * 5 + 3;
                  const top = Math.random() * 100;
                  const left = Math.random() * 100;
                  const opacity = Math.random() * 0.5 + 0.5;
                  const translateY = Math.random() * 20 - 10;
                  const translateX = Math.random() * 20 - 10;

                  return (
                    <motion.div
                      key={index}
                      className="absolute rounded-full bg-black/80 dark:bg-white/80"
                      style={{
                        width: \`\${size}px\`,
                        height: \`\${size}px\`,
                        top: \`\${top}%\`,
                        left: \`\${left}%\`,
                        opacity,
                      }}
                      initial={{ opacity: 1, scale: 1, rotate: 0 }}
                      animate={{
                        opacity: [1, 0],
                        scale: [1, 1.8],
                        rotate: [0, 360],
                        y: [translateY, translateY],
                        x: [translateX, translateX],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: Math.random() * 1.2 + 1,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input_01;
`;

export default function Input_01 () {
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSend = () => {
    if (message.trim() !== "") {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setMessage("");
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative flex flex-col items-center space-y-4 w-full">
        <div className="relative w-full group">
          
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none blur-lg opacity-70 group-focus-within:opacity-100 transition-opacity"
            initial={{ opacity: 0.4 }}
            animate={{
              boxShadow: [
                "0 0 10px rgba(99,102,241,0.7)",
                "0 0 20px rgba(99,102,241,0.9)",
                "0 0 10px rgba(99,102,241,0.7)",
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
            }}
          />

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className={`${poppins.className} w-full p-3 pr-12 pl-5 rounded-full backdrop-blur-lg focus:outline-none transition-all border ${
              isSending ? "opacity-50 cursor-not-allowed" : ""
            } bg-white/70 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800/70 dark:text-gray-100 dark:border-zinc-700 dark:placeholder:text-zinc-400 dark:focus:ring-indigo-500`}
            disabled={isSending}
          />

          <motion.button
            onClick={handleSend}
            className={`absolute right-2 top-1.5 p-2 rounded-full backdrop-blur-lg shadow-lg ${
              isSending
                ? "bg-gray-400 dark:bg-zinc-600 cursor-not-allowed"
                : message.trim() !== ""
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-gray-300 hover:bg-gray-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
            }`}
            whileHover={{ scale: 1.1 }}
            disabled={isSending}
          >
            <FaArrowRight size={20} className="text-white" />
          </motion.button>

          {isSending && (
            <motion.div
              className="absolute inset-0 flex items-center pl-5 pr-12 overflow-hidden pointer-events-none rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [1, 0.5, 0],
                filter: ["blur(0px)", "blur(5px)", "blur(12px)"],
              }}
              transition={{ duration: 2, ease: "linear" }}
            >
              <div className="relative w-full h-full overflow-hidden">
                {[...Array(25)].map((_, index) => {
                  const size = Math.random() * 5 + 3;
                  const top = Math.random() * 100;
                  const left = Math.random() * 100;
                  const opacity = Math.random() * 0.5 + 0.5;
                  const translateY = Math.random() * 20 - 10;
                  const translateX = Math.random() * 20 - 10;

                  return (
                    <motion.div
                      key={index}
                      className="absolute rounded-full bg-black/80 dark:bg-white/80"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        top: `${top}%`,
                        left: `${left}%`,
                        opacity,
                      }}
                      initial={{ opacity: 1, scale: 1, rotate: 0 }}
                      animate={{
                        opacity: [1, 0],
                        scale: [1, 1.8],
                        rotate: [0, 360],
                        y: [translateY, translateY],
                        x: [translateX, translateX],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: Math.random() * 1.2 + 1,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
