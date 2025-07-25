import HeroSection_01, { codeStringHero_01 } from './components/HeroSection_01';
import HeroSection_02, { codeStringHero_02 } from './components/HeroSection_02';
import HeroSection_03, { codeStringHero_03 } from './components/HeroSection_03';
import HeroSection_04, { codeStringHero_04 } from './components/HeroSection_04';
import HeroSection_05, { codeStringHero_05 } from './components/HeroSection_05';

type ComponentInfo = {
  name: string;
  component: React.ReactNode;
  description: string;
  imageDark: string;
  imageLight: string;
  code: string;
  installCommand: string;
  preview?: React.ReactNode;
};

export const heroComponents: ComponentInfo[] = [
    {
      name: 'Hero Section 01',
      component: <HeroSection_01 />,
      description: 'A minimal, single-open hero section with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/hero-sections/dark/hero-section-01.png",
      imageLight: "/sections/hero-sections/light/hero-section-01.png",
      code: codeStringHero_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <HeroSection_01 />
    },
    {
      name: 'Hero Section 02',
      component: <HeroSection_02 />,
      description: 'A minimal, single-open hero section with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/hero-sections/dark/hero-section-02.png",
      imageLight: "/sections/hero-sections/light/hero-section-02.png",
      code: codeStringHero_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <HeroSection_02 />
    },
    {
      name: 'Hero Section 03',
      component: <HeroSection_03 />,
      description: 'A minimal, single-open hero section with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/hero-sections/dark/hero-section-03.png",
      imageLight: "/sections/hero-sections/light/hero-section-03.png",
      code: codeStringHero_03,
      installCommand: 'npm install @ruixen/ui',
    },
    {
      name: 'Hero Section 04',
      component: <HeroSection_04 />,
      description: 'A minimal, single-open hero section with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/hero-sections/dark/hero-section-04.png",
      imageLight: "/sections/hero-sections/light/hero-section-04.png",
      code: codeStringHero_04,
      installCommand: 'npm install @ruixen/ui',
      preview: <HeroSection_04 />
    },
    {
      name: 'Hero Section 05',
      component: <HeroSection_05 />,
      description: 'A minimal, single-open hero section with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/hero-sections/dark/hero-section-05.png",
      imageLight: "/sections/hero-sections/light/hero-section-05.png",
      code: codeStringHero_05,
      installCommand: 'npm install @ruixen/ui',
      preview: <HeroSection_05 />
    }
  ];
