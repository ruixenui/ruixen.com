'use client'

import React, { useState } from 'react';
import { Code } from 'lucide-react';
import SnippetSidebar from '@/components/snippet-sidebar';
import HeadingSpotlight from '@/components/ruixen/heading-spotlight';
import ImageCardToggle from '@/components/ruixen/ImageCardToggle';
import { inputComponents } from './InputComponentsExport';

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('code');

  const copyToClipboard = (text?: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <div className="dark:bg-black bg-white w-full min-h-screen flex flex-col items-start p-2 pt-24">
      <HeadingSpotlight
        title="Inputs"
      />
      <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 relative inner-container">
        {inputComponents.map((item, index) => (
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
      <SnippetSidebar
        open={openIndex !== null}
        title={openIndex !== null ? inputComponents[openIndex].name : ''}
        installCommand={inputComponents[openIndex!]?.installCommand}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        copyToClipboard={copyToClipboard}
        onClose={() => setOpenIndex(null)}
        tabs={[
          {
            id: 'code',
            label: 'Code',
            icon: <Code size={14} />,
            content: (
              <pre className="text-sm whitespace-pre-wrap break-words text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-black rounded-xl p-4">
                {inputComponents[openIndex!]?.code}
              </pre>
            ),
          },
        ]}
      />
    </div>
  );
}
