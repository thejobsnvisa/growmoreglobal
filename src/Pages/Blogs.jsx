import BlogsStep from "../Components/BlogStep"
import img from "../assets/img23.png";
import { Helmet } from "react-helmet-async";

const Blogs = () => {
  const url = "https://growmoreglobalvisa.com/blogs";
       const ogImage = "https://growmoreglobalvisa.com/assets/img23-CEvjomMq.png";
       return (
           <>
             <Helmet>
               <title>Blogs | Growmore Global Visa</title>
       
               <meta
                 name="description"
                 content="Stay updated with the latest blogs and updates from Growmore Global Visa."
               />
       
               {/* ✅ Canonical for Blogs */}
               <link rel="canonical" href={url} />
       
               {/* ✅ OG */}
               <meta
                 property="og:title"
                 content="Blogs | Growmore Global Visa"
               />
               <meta
                 property="og:description"
                 content="Stay updated with the latest blogs and updates from Growmore Global Visa."
               />
               <meta property="og:url" content={url} />
               <meta property="og:image" content={ogImage} />
               <meta property="og:image:secure_url" content={ogImage} />
               <meta property="og:image:type" content="image/png" />
               <meta property="og:image:alt" content="Blogs by Growmore Global Visa" />
               <meta name="twitter:card" content="summary_large_image" />
               <meta name="twitter:image" content={ogImage} />
             </Helmet>
      <div>
        <section className="relative h-[240px] w-full overflow-hidden sm:h-[300px] md:h-[370px] lg:h-[480px] 2xl:h-[580px]">
          <img
            src={img}
            alt="Blogs banner"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

                          <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-white via-white/90 to-transparent" />


          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1256px] flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-10 xl:px-0">
            <p className="mb-2 text-sm sm:text-base md:text-[17px] lg:text-[18px]">
              <span className="text-sky-500">Home &gt; </span>
              <span className="text-cyan-800">Blogs</span>
            </p>

            <h1 className="mt-3 text-[32px] font-semibold leading-[1.1] text-[#669980] sm:mt-5 sm:text-[44px] md:mt-7 md:text-[52px] lg:mt-8 lg:text-[60px]">
              Blogs
            </h1>
          </div>
        </section>
        <BlogsStep />
      </div>
    </>
  );
};

export default Blogs;
