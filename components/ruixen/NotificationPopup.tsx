// components/NotificationPopup.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const NotificationPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the notification after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-4 left-4 md:left-4  transform -translate-x-1/2 md:translate-x-0 z-50 max-w-md w-[90%] md:w-auto"
        >
          <div className="bg-neutral-900 text-white rounded-lg shadow-lg overflow-hidden border border-neutral-800">
            <div className="flex justify-between items-start p-4">
              <h3 className="font-medium">New Template Available!</h3>
              <button
                onClick={handleClose}
                className="text-neutral-400 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="relative h-40 w-full">
              <Image
                src="/image/saas-template.png"
                alt="SASS Landing Page Template"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl">
                75% OFF - Limited Time!
              </div>
            </div>

            <div className="p-4">
              <p className="mb-2 text-neutral-300">
                SaaS landing page template is now live!
              </p>
              <p className="mb-4 text-red-400 text-sm font-medium">
                Limited offer: 75% off for the first 5 buyers!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
                <Link href="/templates">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out w-full sm:w-auto"
                  >
                    See Template
                  </motion.button>
                </Link>
                <a
                  href="https://ayushmxxn.gumroad.com/l/saas-template/t0bwno0"
                  target="blank"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-neutral-900 font-medium px-4 py-2 rounded-full flex items-center justify-center transition duration-300 ease-in-out w-full sm:w-auto"
                  >
                    <span className="text-neutral-500 line-through mr-2 text-sm">
                      $79
                    </span>
                    Buy Now $19
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </motion.button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;
