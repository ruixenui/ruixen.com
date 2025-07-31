"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className = "" }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors cursor-pointer ${
        theme === "dark" 
          ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700" 
          : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300"
      } ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun size={18} className="transition-all" />
      ) : (
        <Moon size={18} className="transition-all" />
      )}
    </button>
  );
};

export default ThemeSwitch;
