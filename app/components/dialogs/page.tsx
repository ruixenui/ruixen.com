'use client'

import React, { useState } from 'react';
import HeadingSpotlight from '@/components/ruixen/heading-spotlight';
import ImageCardToggle from '@/components/ruixen/ImageCardToggle';
import { dialogComponents } from './DialogComponentsExport';
import TemplateShowcasePage from '@/components/ruixen/PreviewCard';
import { useRef } from 'react';

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text?: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <div className="dark:bg-black bg-white w-full min-h-screen flex flex-col items-start p-2 pt-24">
      <HeadingSpotlight
        title="Dialogs"
      />
      <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 relative inner-container">
        {dialogComponents.map((item, index) => (
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
                   title={dialogComponents[openIndex].name}
                   description={dialogComponents[openIndex].description}
                   preview={dialogComponents[openIndex].preview}
                   code={dialogComponents[openIndex].code}
                 />
               </div>
             )} 
    </div>
  );
}
