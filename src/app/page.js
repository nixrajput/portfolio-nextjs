import { Provider as WrapBalancerProvider } from "react-wrap-balancer";
import Script from "next/script";
import PageBox from "@/components/common/PageBox";
import NavBar from "@/components/navbar/NavBar";
import HomeSection1 from "@/components/home/Section1";
import HomeSection2 from "@/components/home/Section2";
import HomeSection3 from "@/components/home/Section3";
import HomeSection4 from "@/components/home/Section4";
import HomeSection5 from "@/components/home/Section5";
import HomeSection6 from "@/components/home/Section6";
import LocalConfig from "@/constants/config";

export default function Home() {
  return (
    <PageBox>
      <Script
        strategy="worker"
        src={`https://www.googletagmanager.com/gtag/js?id=${LocalConfig.values.NEXT_PUBLIC_GTAG_ID}`}
      />

      <Script id="google-analytics" strategy="worker">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${LocalConfig.values.NEXT_PUBLIC_GTAG_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <NavBar />
      <WrapBalancerProvider>
        <HomeSection1 id="about" />
        <HomeSection2 id="services" />
        <HomeSection3 id="experiences" />
        <HomeSection4 id="skills" />
        <HomeSection5 id="projects" />
        <HomeSection6 id="contact" />
      </WrapBalancerProvider>
    </PageBox>
  );
}
