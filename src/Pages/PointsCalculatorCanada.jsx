import { useState } from "react";
import img from "../assets/p2.png";
import ScorePanel from "../Components/ScorePanel1";
import Age from "./Age";
import FinalResult from "../Components/FinalResult1";
import Exerience from "./Experience";
import Language from "../Components/Language";
import Education from "../Components/Education";
import Adaptibility from "../Components/Adaptibility";
import Language2 from "../Components/Language2";
import { Helmet } from "react-helmet-async";

const PointsCalculatorCanada = () => {
    /* ---------------- STEP CONTROLLER ---------------- */ const [
    step,
    setStep,
  ] = useState(1);
  /* ---------------- SCORE STATE ---------------- */ const [
    scores,
    setScores,
  ] = useState({
    age: 0,
    experience: 0,
    language: 0,
    languageproficiency: 0,
    education: 0,
    adaptability: 0,
  });
  /* ---------------- UPDATE SCORE SAFELY ---------------- */ const updateScore =
    (key, value) => {
      setScores((prev) => ({ ...prev, [key]: value }));
    };
  /* ---------------- NAVIGATION ---------------- */ const nextStep = () =>
    setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  /* ⭐ RESTART CALCULATOR */ const restartCalculator = () => {
    setStep(1);
    setScores({
    age: 0,
    experience: 0,
    language: 0,
    languageproficiency: 0,
    education: 0,
    adaptability: 0,
    });
  };
  /* ---------------- TOTAL POINTS ---------------- */ const totalScore =
    Object.values(scores).reduce((sum, val) => sum + (val || 0), 0);
 const url = "https://growmoreglobalvisa.com/migration-assessment/points-calculator-canada/";
     const ogImage = "https://growmoreglobalvisa.com/assets/p2-D2o7P2d9.png";
     return (
         <>
           <Helmet>
             <title>Canada PR Points Calculator | Growmore Global Visa</title>
     
             <meta
               name="description"
               content="Estimate your Canada PR points based on age, language proficiency, work experience, education, and other factors with the Canada PR Points Calculator from Growmore Global Visa."
             />
     
             {/* ✅ Canonical for Canada PR Points Calculator */}
             <link rel="canonical" href={url} />
     
             {/* ✅ OG */}
             <meta
               property="og:title"
               content="Canada PR Points Calculator | Growmore Global Visa"
             />
             <meta
               property="og:description"
               content="Estimate your Canada PR points based on age, language proficiency, work experience, education, and other factors with the Canada PR Points Calculator from Growmore Global Visa."
             />
     
             {/* ✅ Canonical for Canada PR Points Calculator */}
             <link rel="canonical" href={url} />
     
             {/* ✅ OG */}
             <meta
               property="og:title"
               content="Videos | Growmore Global Visa"
             />
             <meta
               property="og:description"
               content="Explore expert migration advice, step-by-step guides, and success stories from our YouTube channel."
             />
             <meta property="og:url" content={url} />
             <meta property="og:image" content={ogImage} />
             <meta property="og:image:secure_url" content={ogImage} />
             <meta property="og:image:type" content="image/png" />
             <meta property="og:image:alt" content="Canada PR Points Calculator by Growmore Global Visa" />
             <meta name="twitter:card" content="summary_large_image" />
             <meta name="twitter:image" content={ogImage} />
           </Helmet>
      <section
        className="
            relative
            h-[300px]
            w-full
            overflow-hidden
    
            sm:h-[340px]
            md:h-[370px]
            lg:h-[400px]
            xl:h-[420px]
            2xl:h-[490px]
          "
      >
        {/* Banner Image */}
        <img
          src={img}
          alt="Migration"
          className="
              absolute
              inset-0
              h-full
              w-full
              translate-x-0
              md:translate-x-[60px]
              xl:translate-x-[130px]
              xl:object-contain
              2xl:object-cover
              object-cover
            "
        />

        {/* Gradient Overlay */}
                        <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-white via-white/90 to-transparent" />


        {/* Banner Content */}
        <div
          className="
              relative
              z-10
              mx-auto
              flex
              h-full
              w-full
              max-w-[1256px]
              flex-col
              justify-center
    
              px-5
              sm:px-8
              md:px-12
              lg:px-10
              xl:px-0
            "
        >
          {/* Breadcrumb */}
          <p
            className="
                mb-2
                text-[14px]
                mt-[-70px]
                sm:text-[16px]
                md:text-[17px]
                lg:text-[20px]
                2xl:ml-[-285px]
              "
          >
            <span className="text-sky-500">Home &gt; </span>
            <span className="text-sky-500">Migration Assessment &gt; </span>
            <span className="text-cyan-800">Canada PR Calculator</span>
          </p>

          {/* Banner Heading */}
          <h1
            className="
                mt-6
                w-full
                max-w-[450px]
                text-[38px]
                font-semibold
                leading-[1.1]
                text-[#669980]
    
                sm:mt-8
                sm:text-[44px]
    
                md:mt-10
                md:text-[50px]
    
                lg:mt-12
                lg:text-[50px]
                2xl:ml-[-285px]
              "
          >
            Canada PR Points Calculator
          </h1>
        </div>
      </section>
      <div className="h-auto min-h-[360px] w-full bg-cyan-50">
        <div className="mx-auto h-auto min-h-[252px] w-full max-w-[1050px] gap-[30px] px-5 py-[34px] xl:ml-[202px] xl:mr-0 xl:w-[1050px] xl:px-0 xl:py-0 2xl:mx-auto">
          <ul className="list-disc pl-5 text-[16px] text-cyan-900 text-justify pt-[68px] xl:text-[18px]">
            <li>
              This Canada PR Points Calculator is designed to help you assess your potential eligibility for Canadian permanent residence through skilled immigration pathways. The calculator considers key factors such as age, education, work experience, language proficiency, and other relevant factors to estimate your overall points.
            </li>
            <li className="mt-2">
              Understanding the Canada PR points system is important for applicants planning to immigrate to Canada through skilled immigration programs. This assessment helps you understand your current profile, identify areas where you may be able to improve your score, and better understand your potential eligibility.
            </li>
            <li className="mt-2">
             Use our Canada PR Points Calculator today to get a clear estimate of your points and understand your immigration profile. If you need personalized guidance based on your circumstances, contact our expert Canadian Immigration Consultant today!
            </li>
          </ul>
        </div>
      </div>
      
        <div className="calculator-container mx-auto w-full 2xl:max-w-[1440px] 2xl:h-[680px] xl:h-[640px]">
          {/* LEFT FORM */}
          <div className="form-panel w-full max-w-full">
            
            {step === 1 && (
              <Age
                updateScore={updateScore}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {step === 2 && (
              <Exerience
                updateScore={updateScore}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 3 && (
              <Language
                updateScore={updateScore}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
              {step === 4 && (
              <Language2
                updateScore={updateScore}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
              {step === 5 && (
              <Education
                updateScore={updateScore}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
              {step === 6 && (
              <Adaptibility
                updateScore={updateScore}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 7 && (
              <FinalResult
                prevStep={prevStep}
                reset={restartCalculator}
                total={totalScore}
              />
            )}
          </div>

          {/* RIGHT PANEL */}
          <ScorePanel
            scores={scores}
            total={totalScore}
            className="ml-0 h-auto w-full xl:ml-[200px] xl:h-[1000px]"
          />
        </div>
    </>
  );
};

export default PointsCalculatorCanada;
