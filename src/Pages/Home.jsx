import Approach from "../Components/Approach"
import Certification from "../Components/Certification"
import Destination from "../Components/Destination"
import Faq from "../Components/Faq"
import Hero from "../Components/Hero"
import LatestArticles from "../Components/LatestArticles"
import Member from "../Components/Member"
import Services from "../Components/Services"
import Testimonials from "../Components/Testimonials"
import VisaGuidance from "../Components/VisaGuidance"
import WhyGrowmore from "../Components/WhyGrowmore"
import { Helmet } from "react-helmet-async";

const url = "https://growmoreglobalvisa.com/";
const ogImage = "https://growmoreglobalvisa.com/assets/hero-image.png";

const Home = () => {
  return (
    <>
     <Helmet>
        <title>Growmore Global Visa | Global Migration Consultants Melbourne</title>

        <meta
          name="description"
          content="Growmore Global Visa provides immigration and visa support in Melbourne for destinations around the world, including skilled migration, permanent residency, employer-sponsored visas, and documentation assistance."
        />

        {/* ✅ Canonical for homepage */}
        <link rel="canonical" href={url} />

        {/* ✅ OG */}
        <meta
          property="og:title"
          content="Growmore Global Visa | Immigration & Visa Consultants in Melbourne"
        />
        <meta
          property="og:description"
          content="Get expert immigration and visa support in Melbourne for skilled migration, permanent residency, employer-sponsored visas, and documentation assistance."
        />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Growmore Global Visa" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />

      </Helmet>
    <div>
      <Hero/>
      <Destination/>
      <Services/>
      <WhyGrowmore/>
      <Approach/>
      <Member/>
      <VisaGuidance/>
      <Testimonials/>
      <Certification/>
      <LatestArticles/>
      <Faq/>
    </div>
    </>
  )
}

export default Home
