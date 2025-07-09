import ClientLabel_01, { codeStringClientLabel_01 } from './components/ClientLabel_01';
import ClientLabel_02, { codeStringClientLabel_02 } from './components/ClientLabel_02';
import ClientLabel_03, { codeStringClientLabel_03 } from './components/ClientLabel_03';

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

export const clientLabelComponents: ComponentInfo[] = [
    {
      name: 'Client Label 01',
      component: <ClientLabel_01 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/client-labels/dark/client-label-01.png",
      imageLight: "/sections/client-labels/light/client-label-01.png",
      code: codeStringClientLabel_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <ClientLabel_01 />
    },
    {
      name: 'Client Label 02',
      component: <ClientLabel_02 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/client-labels/dark/client-label-02.png",
      imageLight: "/sections/client-labels/light/client-label-02.png",
      code: codeStringClientLabel_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <ClientLabel_02 />
    },
    {
      name: 'Client Label 03',
      component: <ClientLabel_03 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/client-labels/dark/client-label-03.png",
      imageLight: "/sections/client-labels/light/client-label-03.png",
      code: codeStringClientLabel_03,
      installCommand: 'npm install @ruixen/ui',
      preview: <ClientLabel_03 />
    }
  ];
  