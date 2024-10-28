import dynamic from "next/dynamic";

const PageBox = dynamic(() => import("@/components/core/PageBox"));
const PaymentMainSection = dynamic(
  () => import("@/components/payment/MainSection")
);

const Home = () => {
  return (
    <PageBox>
      <PaymentMainSection />
    </PageBox>
  );
};

export default Home;
