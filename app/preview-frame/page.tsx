'use client';

import React, { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import PreviewCard from "@/components/ruixen/PreviewCard";

export default function PreviewFrame() {
  const searchParams = useSearchParams();
  
  const componentName = searchParams.get('component') || 'Component';
  const componentDescription = searchParams.get('description') || 'Interactive component preview';
  
  const renderPreview = () => (
    <div className="flex items-center justify-center h-full p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="text-center">
        <h3 className="text-lg font-medium">{componentName} Preview</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          This is a preview of the {componentName} component
        </p>
      </div>
    </div>
  );

  const handleDownload = useCallback(() => {
    console.log('Downloading component:', componentName);
  }, [componentName]);

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <PreviewCard 
          title={componentName}
          description={componentDescription}
          preview={renderPreview()}
          downloadHandler={handleDownload}
          code={`// ${componentName} component code will appear here`}
          badge="Preview"
        />
      </div>
    </div>
  );
}
