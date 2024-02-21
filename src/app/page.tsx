import PageBox from "@/components/core/PageBox";
import HomeSection1 from "@/components/home/Section1";
import HomeSection2 from "@/components/home/Section2";
import HomeSection3 from "@/components/home/Section3";
import HomeSection4 from "@/components/home/Section4";
import HomeSection5 from "@/components/home/Section5";
import HomeSection6 from "@/components/home/Section6";

const Home = () => {
  return (
    <PageBox>
      <HomeSection1 id="about" />
      <HomeSection2 id="services" />
      <HomeSection3 id="experiences" />
      <HomeSection4 id="skills" />
      <HomeSection5 id="projects" />
      <HomeSection6 id="contact" />
    </PageBox>
  );
};

export default Home;
