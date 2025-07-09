'use client'

import React, { useEffect, useState } from 'react';
import HeadingSpotlight from '@/components/ruixen/heading-spotlight';
import ImageCardToggle from '@/components/ruixen/ImageCardToggle';
import { tableComponents } from './TableComponentsExport';
import TemplateShowcasePage from '@/components/ruixen/PreviewCard';
import { useRef } from 'react';

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
      <HeadingSpotlight
        title="Table"
      />
      <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 relative inner-container">
        {tableComponents.map((item, index) => (
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
                   title={tableComponents[openIndex].name}
                   description={tableComponents[openIndex].description}
                   preview={tableComponents[openIndex].preview}
                   code={tableComponents[openIndex].code}
                 />
               </div>
             )} 
    </div>
  );
}
