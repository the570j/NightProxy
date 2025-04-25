import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import AboutSection from "@/components/AboutSection";
import CallToAction from "@/components/CallToAction";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <FeatureSection />
        <AboutSection />
        <CallToAction />
        <SupportSection />
      </main>
      <Footer />
    </>
  );
}
