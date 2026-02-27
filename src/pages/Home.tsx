import ConsultancyHighlight from "../components/Home/Consultancyhighlights";
import CoreSolutions from "../components/Home/CoreSolutions";
import ExcessMaterialsSection from "../components/Home/ExcessMaterials";
import FinalCTA from "../components/Home/FinalCTA";
import HeroSection from "../components/Home/HeroSection";
import HowItWorks from "../components/Home/HowItWorks";
import WhyChooseUs from "../components/Home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CoreSolutions/>
      <ConsultancyHighlight/>
      <ExcessMaterialsSection/>
      <HowItWorks/>
      <WhyChooseUs/>
      <FinalCTA/>
    </>
  );
}