'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GeistSans } from 'geist/font/sans';

const blocks = [
  { name: 'Sliders', url: '/blocks/sliders' },
]

const sections = [
  { name: 'Navbar', url: '/sections/navbar' },
  { name: 'Hero Sections', url: '/sections/hero-sections' },
  { name: 'Client Label', url: '/sections/client-labels' },
  { name: 'Feature Sections', url: '/sections/feature-sections' },
  { name: 'Faq Sections', url: '/components/accordion' },
  { name: 'Testimonials', url: '/sections/testimonials' },
  { name: 'Pricing', url: '/sections/pricing' },
  { name: 'CTA', url: '/sections/cta' },
  {name: 'Footer', url: '/sections/footer'},
];

const additionalComponentsList = [
  { name: 'Inputs', url: '/components/inputs' },
  { name: 'Buttons', url: '/components/buttons' },
  { name: 'Accordion', url: '/components/accordion' },
  { name: 'Cards', url: '/components/cards' },
  { name: 'Dialogs', url: '/components/dialogs' },
  { name: 'Tables', url: '/components/tables' },
  { name: 'Profiles', url: '/components/profiles' },
  { name: 'Dropdowns', url: '/components/dropdowns' },
  { name: 'Forms', url: '/components/forms' },
  { name: 'Sidebars', url: '/components/sidebars' },
];

const SideBar: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSection = (name: string) => setExpandedSection(expandedSection === name ? null : name);

  return (
    <aside className={`${GeistSans.className} fixed bg-white dark:bg-black backdrop-blur-lg p-4 rounded-2xl text-black dark:text-white hidden md:flex flex-col h-[calc(100vh-6rem)] sticky top-0 left-0 z-40 overflow-hidden`}>
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <nav>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-200">Getting Started</h2>
            </div>
            <Link href="/docs/introduction" className={`flex items-center space-x-2 hover:text-gray-300 py-1 text-sm ${pathname === '/docs/introduction' ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}><span>Introduction</span></Link>
            <Link href="/docs/installation" className={`flex items-center space-x-2 hover:text-gray-300 py-1 text-sm ${pathname === '/docs/installation' ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}><span>Installation</span></Link>
          </div>

          <h2 className="mt-8 mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center">Sections & Blocks</h2>
          {sections.map(({ name, url }) => (
            <Link key={name} href={url} className={`flex items-center justify-between text-sm py-1 hover:text-gray-900 ${pathname !== url ? 'text-gray-600 dark:text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
              <span>{name}</span>
            </Link>
          ))}

          <h2 className="mt-6 mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Blocks</h2>
          {blocks.map(({ name, url }) => (
            <Link key={name} href={url} className={`flex items-center justify-between text-sm py-1 hover:text-gray-900 ${pathname !== url ? 'text-gray-600 dark:text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
              <span>{name}</span>
            </Link>
          ))}

          <h2 className="mt-6 mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Other Components</h2>
          {additionalComponentsList.map(({ name, url }) => (
            <Link key={name} href={url} className={`flex items-center justify-between text-sm py-1 hover:text-gray-900 ${pathname !== url ? 'text-gray-600 dark:text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
