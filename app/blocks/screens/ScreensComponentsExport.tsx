import Safari_01, { codeStringSafari_01 } from './components/Safari_01';

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

export const screensComponents: ComponentInfo[] = [
    {
      name: 'Safari 01',
      component: <Safari_01 />,
      description: 'A minimal, single-open accordion with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/blocks/screens/dark/safari-01.png",
      imageLight: "/blocks/screens/light/safari-01.png",
      code: codeStringSafari_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Safari_01 />
    }
];
