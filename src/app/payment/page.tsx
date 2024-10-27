import dynamic from "next/dynamic";
import PageBox from "@/components/core/PageBox";
import { Suspense } from "react";
import Loading from "../loading";

const PaymentMainSection = dynamic(
  () => import("@/components/payment/MainSection")
);
const ScrollToTop = dynamic(() => import("@/components/common/ScrollToTop"));

const Home = () => {
  return (
    <PageBox>
      <Suspense fallback={<Loading />}>
        <PaymentMainSection />
        <ScrollToTop />
      </Suspense>
    </PageBox>
  );
};

export default Home;
