import Head from "next/head";
import { Hero, About, Projects, Experiences, Footer } from "../components";

export default function Home() {
  return (
    <div className="app">
      <Head>
        <title>Nikhil Rajput - Portfolio</title>
        <meta name="description" content="Nikhil Rajput's portfolio developed using Next.js." />
        <meta name="keywords" content="Nixrajput,nixrajput,nix,software engineer,full stack developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Footer />
    </div>
  );
}
