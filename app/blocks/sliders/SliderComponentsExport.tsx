import Slider_01, { codeStringSlider_01 } from './components/Slider_01';

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

export const sliderComponents: ComponentInfo[] = [
    {
      name: 'Slider 01',
      component: <Slider_01 />,
      description: 'A minimal, single-open accordion with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/blocks/slider/dark/slider-01.png",
      imageLight: "/blocks/slider/light/slider-01.png",
      code: codeStringSlider_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Slider_01 />
    }
];
