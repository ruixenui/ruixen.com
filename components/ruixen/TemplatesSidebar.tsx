'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GeistSans } from 'geist/font/sans';

const templates = [
  { name: 'Star Portfolio', url: '/templates' },
  // { name: 'Premium Portfolio', url: '/templates/premium' }, coming soon
];


const TemplatesSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className={`${GeistSans.className} fixed bg-white dark:bg-black backdrop-blur-lg p-4 rounded-2xl text-black dark:text-white hidden md:flex flex-col h-[calc(100vh-6rem)] sticky top-0 left-0 z-40 overflow-hidden`}>
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <nav>
          <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center">Templates</h2>
          {templates.map(({ name, url }) => (
            <Link key={name} href={url} className={`flex items-center justify-between text-sm py-1 hover:text-gray-900 ${pathname !== url ? 'text-gray-600 dark:text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default TemplatesSidebar;
