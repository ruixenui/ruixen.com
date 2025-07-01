import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";
import Image from "next/image";
import Search from "./Search";
import HamburgurNavbar from "./HamburgerNavbar";
import { Inter } from "next/font/google";
import CommandSearch from "./CommandSearch";
import ThemeSwitch from "../ui/theme-switch";

const inter = Inter({ subsets: ["latin"], weight: "500" });

function Navbar() {
  return (
    <div
      className={`navbar-container fixed top-0 left-0 right-0 flex justify-between items-center backdrop-blur-xl border-b h-auto sm:py-3 py-4 px-3 text-sm z-50 ${inter.className} 
      bg-white/60 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900`}
    >
      <span className="flex items-center">
        <Link href={"/"} className="flex justify-center items-center">
          <Image src="/ruixen.png" alt="RuixenLogo" width={40} height={40} className="rounded-full"/>
          <span className="hidden sm:flex sm:text-lg pr-20 pl-1 text-zinc-900 dark:text-white">
            Ruixen UI
          </span>
        </Link>

        <div className="items-center flex space-x-6 text-zinc-600 dark:text-[#ABAFB4]">
          <Link href="/components">
            <span className="hover:text-zinc-800 dark:hover:text-zinc-300 cursor-pointer hidden sm:flex ml-10 md:ml-0">
              Components
            </span>
          </Link>
          <Link href="/templates" prefetch>
            <div className="flex items-center space-x-2">
              <span className="hover:text-zinc-800 dark:hover:text-zinc-300 cursor-pointer">
                Templates
              </span>
              <span className="text-xs border border-green-400 text-green-400 rounded-full px-2 py-[2px]">
                New
              </span>
            </div>
          </Link>
        </div>
      </span>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex pr-2">
          <Search />
        </div>
        <CommandSearch />

        <div className="hidden sm:flex items-center space-x-4 mr-2">
          <div className="z-50 relative">
            <ThemeSwitch className="mr-2" />
          </div>
          <Link href="https://github.com/ruixenui" target="_blank">
            <FaGithub className="text-zinc-900 dark:text-white" size={18} />
          </Link>
          {/* <Link href="https://x.com/ruixen_ui" target="_blank">
            <SiDiscord className="text-zinc-900 dark:text-white" size={18} />
          </Link> */}
          <Link
            href="https://x.com/ruixen_ui"
            target="_blank"
          >
            <RiTwitterXLine className="text-zinc-900 dark:text-white" size={18} />
          </Link>
        </div>

        <HamburgurNavbar />
      </div>
    </div>
  );
}

export default Navbar;
