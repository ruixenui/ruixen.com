import ClientLabel_01, { codeStringClientLabel_01 } from './components/ClientLabel_01';

type ComponentInfo = {
  name: string;
  component: React.ReactNode;
  description: string;
  imageDark: string;
  imageLight: string;
  code: string;
  installCommand: string;
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
    }
  ];
