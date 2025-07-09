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
import { useRef } from "react";
import { gsap } from "gsap";

const HomeNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);
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
          <Link href="/" className="hidden sm:flex text-sm font-medium text-black dark:text-white ml-2">
          <div ref={logoRef} className="flex items-center space-x-3">
            <Image
              src="/ruixen_dark.png"
              alt="Ruixen Logo"
              width={40}
              height={40}
              className="rounded-full h-10 w-10 block dark:hidden"
            />
            <Image
              src="/ruixen_light.png"
              alt="Ruixen Logo"
              width={40}
              height={40}
              className="rounded-full h-10 w-10 hidden dark:block"
            />
            <span className="font-semibold text-[0.96rem] bg-gradient-to-r from-black via-gray-800 to-gray-600 dark:from-white dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
              Ruixen UI
            </span>
          </div>
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
            <Link href="https://github.com/ruixenui" target="_blank" className="flex items-center hover:text-black dark:hover:text-zinc-300">
              <FaGithub className="text-black dark:text-white" size={24} />
            </Link>
            <Link
              href="https://x.com/ruixen_ui"
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
