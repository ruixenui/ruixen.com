'use client'

import React, { useState, useEffect } from 'react';
import { Code } from 'lucide-react';
import SnippetSidebar from '@/components/snippet-sidebar';
import HeadingSpotlight from '@/components/ruixen/heading-spotlight';
import ImageCardToggle from '@/components/ruixen/ImageCardToggle';
import { accordionComponents } from './AccordionComponentsExport';
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

  const copyToClipboard = (text?: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <div className="dark:bg-black bg-white w-full min-h-screen flex flex-col items-start p-2 pt-24">
      <HeadingSpotlight
        title="Accordion"
      />
      <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4 relative inner-container">
        {accordionComponents.map((item, index) => (
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
             title={accordionComponents[openIndex].name}
             description={accordionComponents[openIndex].description}
             preview={accordionComponents[openIndex].preview}
             code={accordionComponents[openIndex].code}
           />
         </div>
       )} 
    </div>
  );
}
