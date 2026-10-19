import Header from "./componentes/Header/Header";
import HeroSection from "./pages/heroSection/HeroSection";
import MainSections from "./pages/mainSections/MainSections";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <MainSections />
    </div>
  );
}
