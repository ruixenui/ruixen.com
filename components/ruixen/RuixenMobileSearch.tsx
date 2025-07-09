"use client";
import React, {
  useState,
  ChangeEvent,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { motion } from "framer-motion";
import { IoMdSearch } from "react-icons/io";
import Link from "next/link";


interface Page {
  title: string;
  url: string;
  icon?: ReactNode;
}

interface SearchModalProps {
  pages: Page[];
  mode?: "light" | "dark";
  showmodal: boolean;
  setshowmodal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RuixenMobileSearch: React.FC<SearchModalProps> = ({
  pages,
  mode = "dark",
  showmodal,
  setshowmodal,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showmodal) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [showmodal]);

  const ToggleModal = () => {
    setIsOpen((prev) => !prev);

    if (!isOpen) {
      setshowmodal(true);
    } else {
      setshowmodal(false);
    }

    setOverlayVisible(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      } else if (event.key === "/" && !isOpen) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (isOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleAnimationComplete = () => {
    setOverlayVisible(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pt-60">
      {/* Background Overlay */}
      {isOverlayVisible && (
        <div className="absolute inset-0 bg-black/20  backdrop-blur"></div>
      )}

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onAnimationComplete={handleAnimationComplete}
        className={`${
          mode === "dark"
            ? "bg-black border-zinc-900"
            : "bg-white border-zinc-300"
        } w-[550px] h-auto max-h-[320px] border shadow-lg flex flex-col z-50 mx-2`}
      >
        {/* Searchbar */}
        <div
          className={`px-5 py-2 border-b border-zinc-900 z-50 ${
            mode === "dark" ? "bg-black" : "bg-white"
          } ${
            filteredPages.length < 1 && mode === "dark"
              ? "border-b border-zinc-900"
              : ""
          } ${
            filteredPages.length < 1 &&
            mode === "light" &&
            "border-b border-zinc-200"
          }`}
        >
          <div className="relative py-2  flex items-center z-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={mode === "dark" ? "#A1A1AA" : "#71717A"}
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              ref={inputRef}
              placeholder="Search"
              className={`${
                mode === "dark"
                  ? "bg-black text-white border-zinc-800 placeholder-zinc-400"
                  : "bg-white text-black border-zinc-300 placeholder-zinc-500"
              } w-full px-3 focus:outline-none`}
            />
            <span
              onClick={ToggleModal}
              className="ml-3 bg-gradient-to-tr from-zinc-500 to-zinc-700  border-b-2 border-zinc-400 text-white px-2 py-1 rounded-lg text-xs cursor-pointer"
            >
              Esc
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto  custom-scrollbar pl-2 pr-1 mt-2 z-50">
          <div>
            {filteredPages.length > 0 ? (
              filteredPages.map((page, index) => (
                <motion.div
                  key={index}
                  className={`${
                    mode === "dark"
                      ? "bg-gradient-to-tr from-zinc-900 to-zinc-950"
                      : "bg-white border-zinc-300"
                  } p-3 rounded mb-2 transition-all duration-200 ease-in-out`}
                >
                  <Link
                    prefetch
                    onClick={ToggleModal}
                    href={page.url}
                    className={`${
                      mode === "dark" ? "text-white" : "text-black"
                    } text-sm flex-1 overflow-hidden text-ellipsis flex items-center`}
                  >
                    {page.icon && <span className="mr-2">{page.icon}</span>}
                    {page.title}
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="flex justify-center items-center gap-1 z-50">
                <IoMdSearch
                  className={`${
                    mode === "dark" ? "text-zinc-300" : "text-zinc-600"
                  }`}
                  size={20}
                />
                <p
                  className={`${
                    mode === "dark" ? "text-zinc-300" : "text-zinc-600"
                  } text-center py-10`}
                >
                  No results found
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {/* Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: ${mode === "dark" ? "#27272A" : "#D1D5DB"};
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: ${mode === "dark" ? "#5555" : "#9ca3af9f"};
        }
      `}</style>
    </div>
  );
};

export default RuixenMobileSearch;
