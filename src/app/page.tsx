import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageBox from "@/components/core/PageBox";
import { menuItems } from "@/data/navMenus";

const FloatingNav = dynamic(() => import("@/components/navbar/NavbarNew"), {
  ssr: false,
});

const HomeSection1 = dynamic(() => import("@/components/home/Section1"), {
  ssr: false,
});
const HomeSection2 = dynamic(() => import("@/components/home/Section2"), {
  ssr: false,
});
const HomeSection3 = dynamic(() => import("@/components/home/Section3"), {
  ssr: false,
});
const HomeSection4 = dynamic(() => import("@/components/home/Section4"), {
  ssr: false,
});
const HomeSection5 = dynamic(() => import("@/components/home/Section5"), {
  ssr: false,
});
const HomeSection6 = dynamic(() => import("@/components/home/Section6"), {
  ssr: false,
});

const ScrollToTop = dynamic(() => import("@/components/common/ScrollToTop"), {
  ssr: false,
});

const Home = () => {
  return (
    <PageBox>
      <Suspense>
        <FloatingNav className="app_nav" navItems={menuItems} />
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
