'use client'

import React, { useEffect, useRef, useState } from 'react';
import HeadingSpotlight from '@/components/ruixen/heading-spotlight';
import ImageCardToggle from '@/components/ruixen/ImageCardToggle';
import { navbarComponents } from './NavbarComponentsExport';
import TemplateShowcasePage from '@/components/ruixen/PreviewCard';

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openIndex !== null && showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [openIndex]);

  return (
    <div className="dark:bg-black bg-white w-full min-h-screen flex flex-col items-start p-2 pt-24">
      <HeadingSpotlight title="Navbar" />

      <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4 relative inner-container">
        {navbarComponents.map((item, index) => (
          <React.Fragment key={index}>
            <ImageCardToggle
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              item={item}
            />
          </React.Fragment>
        ))}
      </div>

      {openIndex !== null && (
        <div ref={showcaseRef} className="w-full mt-12">
          <TemplateShowcasePage
            title={navbarComponents[openIndex].name}
            description={navbarComponents[openIndex].description}
            preview={navbarComponents[openIndex].preview}
            code={navbarComponents[openIndex].code}
          />
        </div>
      )}
    </div>
  );
}
