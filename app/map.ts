import HeroSection_01 from "./sections/hero-sections/components/HeroSection_01";
import HeroSection_02 from "./sections/hero-sections/components/HeroSection_02";
import HeroSection_03 from "./sections/hero-sections/components/HeroSection_03";


const sectionsMap: Record<string, React.ComponentType<any>> = {
  "hero-01": HeroSection_01,
  "hero-02": HeroSection_02,
  "hero-03": HeroSection_03,
};

export default sectionsMap;
