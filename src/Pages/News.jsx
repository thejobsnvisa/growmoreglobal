import NewsSection from "../Components/NewsSection";
import img from "../assets/img24.png";
import { Helmet } from "react-helmet-async";

const News = () => {
  const url = "https://growmoreglobalvisa.com/latest-update/news/";
      const ogImage = "https://growmoreglobalvisa.com/assets/img24-akcN61EP.png";
      return (
          <>
            <Helmet>
              <title>News | Growmore Global Visa</title>
      
              <meta
                name="description"
                content="Stay updated with the latest news and updates from Growmore Global Visa."
              />
      
              {/* ✅ Canonical for News */}
              <link rel="canonical" href={url} />
      
              {/* ✅ OG */}
              <meta
                property="og:title"
                content="News | Growmore Global Visa"
              />
              <meta
                property="og:description"
                content="Stay updated with the latest news and updates from Growmore Global Visa."
              />
              <meta property="og:url" content={url} />
              <meta property="og:image" content={ogImage} />
              <meta property="og:image:secure_url" content={ogImage} />
              <meta property="og:image:type" content="image/png" />
              <meta property="og:image:alt" content="News by Growmore Global Visa" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:image" content={ogImage} />
            </Helmet>
      <div>
       <section
               className="relative h-[300px] w-full overflow-hidden 2xl:h-[580px] sm:h-[340px] md:h-[370px] lg:h-[480px]"
             >
               <img
                 src={img}
                 alt="News banner"
                 className="absolute inset-0 h-full w-full object-cover"
               />
       
                              <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-white via-white/90 to-transparent" />

               <div className="relative z-10 mx-auto flex h-full w-full max-w-[1256px] flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-0">
                 <p className="mb-2 text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px]">
                   <span className="text-sky-500 lg:ml-10 xl:ml-0">Home &gt; </span>
                   <span className="text-cyan-800">News</span>
                 </p>
       
                 <h1 className="mt-6 w-full text-[32px] font-semibold leading-[1.1] text-[#669980] sm:mt-10 sm:text-[44px] md:mt-16 md:text-[52px] lg:mt-20 lg:ml-10 lg:text-[60px] xl:ml-0">
                   News
                 </h1>
               </div>
             </section>{" "}
        <NewsSection />
      </div>
    </>
  );
};

export default News;
