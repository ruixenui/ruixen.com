import React from "react";

function Search() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex items-center w-52 h-10 rounded-full border shadow-md transition-all 
      bg-zinc-100/50 dark:bg-black/50 
      border-zinc-300 dark:border-zinc-900 
      hover:shadow-lg group">
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-zinc-500 dark:text-zinc-400 w-4 h-4 absolute left-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m1.72-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          name="SearchBar"
          id="Searchbar"
          placeholder="Press / to search"
          className="placeholder-zinc-500 dark:placeholder-zinc-400 bg-transparent outline-none flex-grow 
          pl-10 pr-10 py-2 text-sm text-zinc-900 dark:text-white cursor-not-allowed"
        />

        <span
          className="absolute right-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 
          p-1 rounded w-5 h-5 flex items-center justify-center text-xs font-semibold group-hover:scale-105 transition-transform"
        >
          /
        </span>
      </div>
    </div>
  );
}

export default Search;
