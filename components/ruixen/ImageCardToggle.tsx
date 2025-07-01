'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Container } from 'lucide-react';

interface ImageCardToggleProps {
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number) => void;
  item: {
    name: string;
    description: string;
    imageLight: string;
    imageDark: string;
  };
}

export default function ImageCardToggle({
  index,
  openIndex,
  setOpenIndex,
  item,
}: ImageCardToggleProps) {
  return (
    <div className="relative flex flex-col max-w-[17rem] rounded-3xl overflow-hidden">
      <div
        className="absolute top-3 right-3 flex items-center cursor-pointer z-20"
        onClick={() => setOpenIndex(index)}
      >
        <div
          className={`p-1 rounded-3xl border-2 border-blue-200 dark:border-blue-400 transition-transform ${openIndex === index ? 'rotate-180' : ''
            }`}
        >
          <Container size={12} className="text-blue-300 dark:text-blue-400 w-4 h-4" />
        </div>
      </div>

      <Card className="rounded-3xl overflow-hidden bg-gray-50 dark:bg-black/60">
        <CardHeader className="p-0">
          <CardTitle className="p-0 border border-gray-200 dark:border-gray-700 rounded-3xl">
            <div className="relative w-full h-48 overflow-hidden rounded-3xl hidden dark:block">
              <Image
                src={item.imageLight}
                alt={item.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>

            <div className="relative w-full h-48 overflow-hidden rounded-3xl block dark:hidden">
              <Image
                src={item.imageDark}
                alt={item.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-2 rounded-b-3xl bg-gray-50 dark:bg-black/60">
          <h2 className="text-md font-normal text-gray-700 dark:text-gray-300">{item.name}</h2>
          <p className="font-normal text-[0.75rem] text-gray-500">{item.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
