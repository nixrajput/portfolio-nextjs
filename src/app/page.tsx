import dynamic from "next/dynamic";
import PageBox from "@/components/core/PageBox";
import { menuItems } from "@/data/navMenus";
import FloatingNavbar from "@/components/navbar/FloatingNavbar";
import HomeSection1 from "@/components/home/Section1";

const HomeSection2 = dynamic(() => import("@/components/home/Section2"));
const HomeSection3 = dynamic(() => import("@/components/home/Section3"));
const HomeSection4 = dynamic(() => import("@/components/home/Section4"));
const HomeSection5 = dynamic(() => import("@/components/home/Section5"));
const HomeSection6 = dynamic(() => import("@/components/home/Section6"));

const ScrollToTop = dynamic(() => import("@/components/common/ScrollToTop"));

const Home = () => {
  return (
    <PageBox>
      <FloatingNavbar className="app_nav" navItems={menuItems} />
      <HomeSection1 id="hero" />
      <HomeSection2 id="services" />
      <HomeSection3 id="experiences" />
      <HomeSection4 id="skills" />
      <HomeSection5 id="projects" />
      <HomeSection6 id="contact" />
      <ScrollToTop />
    </PageBox>
  );
};

export default Home;
