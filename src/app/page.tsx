import dynamic from "next/dynamic";
import PageBox from "@/components/core/PageBox";
import { navMenus } from "@/data/navMenus";
import { Suspense } from "react";
import Loading from "./loading";

const HomeSection1 = dynamic(() => import("@/components/home/Section1"));
const HomeSection2 = dynamic(() => import("@/components/home/Section2"));
const HomeSection3 = dynamic(() => import("@/components/home/Section3"));
const HomeSection4 = dynamic(() => import("@/components/home/Section4"));
const HomeSection5 = dynamic(() => import("@/components/home/Section5"));
const HomeSection6 = dynamic(() => import("@/components/home/Section6"));

const FloatingNavbar = dynamic(
  () => import("@/components/navbar/FloatingNavbar")
);
const ScrollToTop = dynamic(() => import("@/components/common/ScrollToTop"));

const Home = () => {
  return (
    <PageBox>
      <Suspense fallback={<Loading />}>
        <FloatingNavbar className="app_nav" navItems={navMenus} />
        <HomeSection1 id="hero" />
        <HomeSection2 id="services" />
        <HomeSection3 id="experiences" />
        <HomeSection4 id="skills" />
        <HomeSection5 id="projects" />
        <HomeSection6 id="contact" />
        <ScrollToTop />
      </Suspense>
    </PageBox>
  );
};

export default Home;
