import Accordion_01, { codeStringAccordion_01 } from './components/Accordion_01';
import Accordion_02, { codeStringAccordion_02 } from './components/Accordion_02';
import Accordion_03, { codeStringAccordion_03 } from './components/Accordion_03';

type ComponentInfo = {
  name: string;
  component: React.ReactNode;
  description: string;
  imageDark: string;
  imageLight: string;
  code: string;
  installCommand: string;
};

export const accordionComponents: ComponentInfo[] = [
    {
      name: 'Accordion 01',
      component: <Accordion_01 />,
      description: 'A minimal, single-open accordion with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/components/accordions/dark/accordion-01.png",
      imageLight: "/components/accordions/light/accordion-01.png",
      code: codeStringAccordion_01,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Accordion 02',
      component: <Accordion_02 />,
      description: 'A responsive FAQ section with categorized accordions, designed to guide users and provide quick answers.',
      imageDark: "/components/accordions/dark/accordion-02.png",
      imageLight: "/components/accordions/light/accordion-02.png",
      code: codeStringAccordion_02,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Accordion 03',
      component: <Accordion_03 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/accordions/dark/accordion-03.png",
      imageLight: "/components/accordions/light/accordion-03.png",
      code: codeStringAccordion_03,
      installCommand: 'npm install @ruixen/ui',
    }
  ];
  