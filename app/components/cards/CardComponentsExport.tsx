import Card_01, { codeStringCard_01 } from './components/Card_01';
import Card_02, { codeStringCard_02 } from './components/Card_02';
import Card_03, { codeStringCard_03 } from './components/Card_03';
import Card_04, { codeStringCard_04 } from './components/Card_04';
import Card_05, { codeStringCard_05 } from './components/Card_05';
import Card_06, { codeStringCard_06 } from './components/Card_06';
import Card_07, { codeStringCard_07 } from './components/Card_07';
import Card_08, { codeStringCard_08 } from './components/Card_08';
import Card_09, { codeStringCard_09 } from './components/Card_09';
import Card_10, { codeStringCard_10 } from './components/Card_10';

type ComponentInfo = {
  name: string;
  component: React.ReactNode;
  description: string;
  imageDark: string;
  imageLight: string;
  code: string;
  installCommand: string;
};

export const cardComponents: ComponentInfo[] = [
    {
      name: 'Card 01',
      component: <Card_01 />,
      description: 'A minimal, single-open accordion with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/components/cards/dark/card-01.png",
      imageLight: "/components/cards/light/card-01.png",
      code: codeStringCard_01,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Card 02',
      component: <Card_02 />,
      description: 'A responsive FAQ section with categorized accordions, designed to guide users and provide quick answers.',
      imageDark: "/components/cards/dark/card-02.png",
      imageLight: "/components/cards/light/card-02.png",
      code: codeStringCard_02,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Card 03',
      component: <Card_03 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/cards/dark/card-03.png",
      imageLight: "/components/cards/light/card-03.png",
      code: codeStringCard_03,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Card 04',
      component: <Card_04 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/cards/dark/card-04.png",
      imageLight: "/components/cards/light/card-04.png",
      code: codeStringCard_04,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Card 05',
      component: <Card_05 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/cards/dark/card-05.png",
      imageLight: "/components/cards/light/card-05.png",
      code: codeStringCard_05,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Card 06',
      component: <Card_06 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/cards/dark/card-06.png",
      imageLight: "/components/cards/light/card-06.png",
      code: codeStringCard_06,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Card 07',
      component: <Card_07 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/cards/dark/card-07.png",
      imageLight: "/components/cards/light/card-07.png",
      code: codeStringCard_07,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Card 08',
      component: <Card_08 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/cards/dark/card-08.png",
      imageLight: "/components/cards/light/card-08.png",
      code: codeStringCard_08,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Card 09',
      component: <Card_09 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/cards/dark/card-09.png",
      imageLight: "/components/cards/light/card-09.png",
      code: codeStringCard_09,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Card 10',
      component: <Card_10 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/cards/dark/card-10.png",
      imageLight: "/components/cards/light/card-10.png",
      code: codeStringCard_10,
      installCommand: 'npm install @ruixen/ui',
    }
  ];
