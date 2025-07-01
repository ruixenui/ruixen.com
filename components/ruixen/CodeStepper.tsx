'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';

interface Step {
  title?: string;
  description?: string;
  code?: string;
  highlightLines?: number[];
}

const steps: Step[] = [
  {
    title: "Install Ruixen UI",
    description: "Run the following command to install Ruixen UI and set up your project:",
    code: "npx ruixen-ui@latest init",
  },
  {
    title: "Add New Components",
    description: "Easily add any component to your project with a single command:",
    code: `npx ruixen-ui@latest add [component-name]`,
  },
  {
    title: "Use a Component",
    description: "After adding, components are available under `components/ruixen`. Here's an example:",
    code: `import Button from './components/ruixen/Button';

export default function Page() {
  return <Button label="Click Me" />;
}`,
    highlightLines: [0, 4],
  },
  {
    title: "List Available Components",
    description: "See all available components with this command:",
    code: `npx ruixen-ui@latest list`,
  },
  {
    title: "Component Library Example",
    description: "Ruixen UI offers a growing library of production-ready components:",
    code: `Available components:

✔ Button
✔ Card
✔ Navbar
✔ Sidebar
✔ HeroSection
✔ FeatureGrid
✔ TestimonialSlider
✔ Modal
✔ Footer
✔ PricingTable
✔ FAQ
✔ ContactForm`,
  },
];

const CodeStepper: FC = () => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (code: string | undefined, index: number) => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => setCopiedStep(index)).catch(console.error);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const renderCodeWithHighlight = (code: string | undefined, highlightLines?: number[]) => {
    if (!code) return null;
    return code.split('\n').map((line, idx) => (
      <div
        key={idx}
        className={`py-1 px-2 ${highlightLines?.includes(idx) ? 'bg-zinc-800/50 dark:bg-zinc-700/50' : ''} whitespace-pre`}
      >
        {line}
      </div>
    ));
  };

  return (
    <div className="relative mx-auto my-10 lg:px-4">
      <div className="relative">
        
        <div className="absolute top-0 left-4 w-1 bg-zinc-300 dark:bg-zinc-700 h-full z-0"></div>

        <div className="flex flex-col space-y-10 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col space-y-4">
              
              <div className="relative w-8 h-8 rounded-full flex items-center justify-center text-white bg-gradient-to-b from-zinc-900 to-zinc-700 shadow-lg">
                {index + 1}
              </div>

              <div className="ml-12 flex-1">
                {step.title && <h3 className="text-lg font-semibold">{step.title}</h3>}
                {step.description && <p className="text-zinc-600 dark:text-zinc-400 mt-1">{step.description}</p>}

                {step.code && (
                  <div className="relative mt-4 bg-zinc-100 dark:bg-zinc-900 p-4 rounded-md shadow border border-zinc-300 dark:border-zinc-800 overflow-x-auto">
                    <pre className="text-sm text-black dark:text-white">
                      <code>{renderCodeWithHighlight(step.code, step.highlightLines)}</code>
                    </pre>

                    <button
                      onClick={() => copyToClipboard(step.code, index)}
                      className="absolute top-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded hover:bg-black transition"
                      aria-label="Copy code"
                    >
                      {copiedStep === index ? (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400">
                          Copied!
                        </motion.span>
                      ) : (
                        "Copy"
                      )}
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeStepper;
