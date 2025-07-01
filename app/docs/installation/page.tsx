'use client';

import React from 'react';
import CodeStepper from '@/components/ruixen/CodeStepper';

function Installation() {
  return (
    <div className="w-full h-full pt-28 p-5 bg-white dark:bg-black text-black dark:text-white transition-colors">
      <h1 className="text-4xl font-bold pl-4">Installation</h1>
      <p className="sm:text-base max-w-xl mt-4 pl-4 text-zinc-600 dark:text-zinc-400">
        Follow these simple steps to integrate <span className="font-semibold">Ruixen UI</span> into your project and get started building sleek, scalable interfaces.
      </p>

      <div className="mt-10 relative">
        <CodeStepper />
      </div>
    </div>
  );
}

export default Installation;
