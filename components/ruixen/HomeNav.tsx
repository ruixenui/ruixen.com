"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { SiDiscord } from "react-icons/si";
import Image from "next/image";
import Search from "./Search";
import HamburgurNavbar from "./HamburgerNavbar";
import CommandSearch from "./CommandSearch";
import ThemeSwitch from "@/components/ui/theme-switch";

const HomeNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false); // sm breakpoint
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-shadow">
      <div className={`navbar-container bg-white/10 dark:bg-black/10 border border-gray-300 dark:border-gray-800 backdrop-blur-lg py-2 px-3 text-sm flex justify-between items-center sm:m-6 sm:rounded-2xl transition-colors ${scrolled ? "shadow-md" : ""}`}>
        <div className="flex items-center">
          <Image
            src={"/ruixen.png"}
            alt="Ruixen Logo"
            width={40}
            height={40}
            className="rounded-full h-10 w-10"
          />
          <Link href="/" className="hidden sm:flex text-sm font-medium text-black dark:text-white ml-2">
            Ruixen UI
          </Link>
          <div className="items-center flex space-x-6 text-zinc-600 dark:text-zinc-400 ml-6">
            <Link href="/components" className="hover:text-black dark:hover:text-zinc-300 hidden sm:flex">
              Components
            </Link>
            <Link href="/templates" className="hover:text-black dark:hover:text-zinc-300 hidden sm:flex">
              Templates
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex pr-2">
            <Search />
          </div>
          <CommandSearch />

          <div className="hidden sm:flex space-x-4 mr-2">
            <ThemeSwitch className="mr-2" />
            <Link href="https://github.com/ayushmxxn" target="_blank" className="flex items-center hover:text-black dark:hover:text-zinc-300">
              <FaGithub className="text-black dark:text-white" size={24} />
            </Link>
            <Link href="https://discord.gg/kzk6uWey3g" target="_blank" className="flex items-center hover:text-black dark:hover:text-zinc-300">
              <SiDiscord className="text-black dark:text-white" size={24} />
            </Link>
            <Link
              href="https://twitter.com/messages/compose?recipient_id=YOUR_TWITTER_ID"
              target="_blank"
              className="flex items-center hover:text-black dark:hover:text-zinc-300"
            >
              <RiTwitterXLine className="text-black dark:text-white" size={24} />
            </Link>
          </div>

          <HamburgurNavbar />
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
