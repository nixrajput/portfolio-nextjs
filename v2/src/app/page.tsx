import HeroSection from "@/components/home/hero-section";
import CustomNavBar from "@/components/nav/custom-nav-bar";

export default function Home() {
  return (
    <div className="relative w-full">
      <CustomNavBar />
      <HeroSection />
    </div>
  );
}
