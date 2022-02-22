import Head from 'next/head';
import {
  Navbar, Header, About, Skills,
  Work, Footer
} from '../components';

export default function Home() {
  return (
    <div className='app'>

      <Head>
        <title>Nikhil Rajput</title>
        <meta name="description" content="Nikhil Rajput's portfolio web app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Footer />

    </div>
  )
}
