import dynamic from "next/dynamic";
import PageBox from "@/components/core/PageBox";
import { Suspense } from "react";
import Loading from "../loading";
import { navMenus } from "@/data/navMenus";

const FloatingNavbar = dynamic(
  () => import("@/components/navbar/FloatingNavbar")
);
const PaymentMainSection = dynamic(
  () => import("@/components/payment/MainSection")
);
const ScrollToTop = dynamic(() => import("@/components/common/ScrollToTop"));

const Home = () => {
  return (
    <PageBox>
      <Suspense fallback={<Loading />}>
        <FloatingNavbar className="app_nav" navItems={navMenus} />
        <PaymentMainSection />
        <ScrollToTop />
      </Suspense>
    </PageBox>
  );
};

export default Home;
