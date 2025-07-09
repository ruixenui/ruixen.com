import Dialog_01, { codeStringDialog_01 } from './components/Dialog_01';
import Dialog_02, { codeStringDialog_02 } from './components/Dialog_02';
import Dialog_03, { codeStringDialog_03 } from './components/Dialog_03';
import Dialog_04, { codeStringDialog_04 } from './components/Dialog_04';

type ComponentInfo = {
  name: string;
  component: React.ReactNode;
  description: string;
  imageDark: string;
  imageLight: string;
  code: string;
  installCommand: string;
  preview: React.ReactNode;
};

export const dialogComponents: ComponentInfo[] = [
    {
      name: 'Dialog 01',
      component: <Dialog_01 />,
      description: 'A minimal, single-open accordion with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/components/dialogs/dark/dialog-01.png",
      imageLight: "/components/dialogs/light/dialog-01.png",
      code: codeStringDialog_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Dialog_01 />
    },
    {
      name: 'Dialog 02',
      component: <Dialog_02 />,
      description: 'A responsive FAQ section with categorized accordions, designed to guide users and provide quick answers.',
      imageDark: "/components/dialogs/dark/dialog-02.png",
      imageLight: "/components/dialogs/light/dialog-02.png",
      code: codeStringDialog_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <Dialog_02 />
    },
    {
      name: 'Dialog 03',
      component: <Dialog_03 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/dialogs/dark/dialog-03.png",
      imageLight: "/components/dialogs/light/dialog-03.png",
      code: codeStringDialog_03,
      installCommand: 'npm install @ruixen/ui',
      preview: <Dialog_03 />
    },
    {
      name: 'Dialog 04',
      component: <Dialog_04 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/dialogs/dark/dialog-04.png",
      imageLight: "/components/dialogs/light/dialog-04.png",
      code: codeStringDialog_04,
      installCommand: 'npm install @ruixen/ui',
      preview: <Dialog_04 />
    } 
  ];
  