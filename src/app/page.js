import Script from "next/script";
import PageBox from "@/components/common/PageBox";
import HomeSection1 from "@/components/home/Section1";
import HomeSection2 from "@/components/home/Section2";
import HomeSection3 from "@/components/home/Section3";
import HomeSection4 from "@/components/home/Section4";
import HomeSection5 from "@/components/home/Section5";

const gtagId = process.env.NEXT_PUBLIC_GTAG_ID;

export default function Home() {
  return (
    <PageBox>
      <Script
        strategy="worker"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
      />

      <Script id="google-analytics" strategy="worker">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtagId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <HomeSection5 />
    </PageBox>
  );
}
