import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const States2List = [
  { id: "Ba", title: "Berlin" },
  { id: "Mu", title: "Munich" },
  { id: "Fr", title: "Frankfurt" },
  { id: "Ha", title: "Hamburg" },
  { id: "St", title: "Stuttgart" },
];

const States2 = () => {

  const stateData = {
    Ba: {
      title: "Berlin",
      description: "Germany’s capital and innovation hub.",
      PopularUniversities: [
        "Humboldt University of Berlin",
        "Freie Universität Berlin",
        "Technische Universität Berlin"
      ],
      CityHighlights: [
        "Startup and tech ecosystem",
        "Affordable student lifestyle",
        "Multicultural environment",
    ],
    },
    Mu: {
      title: "Munich",
      description: "Germany’s economic and technology powerhouse.",
      PopularUniversities: [
        "Technische Universität München",
        "Ludwig-Maximilians-Universität München",
        "Hochschule für Technik und Wirtschaft München",
      ],
      CityHighlights: [
        "Strong engineering and automotive industries",
        "High employability",
        "Premium quality of life",
          ],
    },
    Fr: {
      title: "Frankfurt",
      description: "Germany’s financial and economic center.",
      PopularUniversities: [
        "Goethe University Frankfurt",
        "Frankfurt University of Applied Sciences",
      ],
      CityHighlights: [
        "Major financial hub",
        "Diverse international community",
      ],
    },
    Ha: {
      title: "Hamburg",
      description: "Northern Germany’s cultural and economic center.",
      PopularUniversities: [
        "University of Hamburg",
        "Hamburg University of Applied Sciences",
      ],
      CityHighlights: [
        "Vibrant cultural scene",
        "Strong maritime tradition",
      ],
    },
    St: {
      title: "Stuttgart",
      description: "Center of the German automotive industry.",
      PopularUniversities: [
        "University of Stuttgart",
        "Stuttgart University of Applied Sciences",
      ],
      CityHighlights: [
        "Automotive engineering excellence",
        "Innovation-driven economy",
      ],
    },
  };

  const [selectedStateId, setSelectedStateId] = useState(States2List[0].id);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const advanceRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  // Automatically advance through the states every five seconds.
  useEffect(() => {
    if (!isInView) return;

    const advance = () => {
      setSelectedStateId((currentId) => {
        const currentIndex = States2List.findIndex(({ id }) => id === currentId);
        return States2List[(currentIndex + 1) % States2List.length].id;
      });
      timerRef.current = setTimeout(advance, 10000);
    };

    advanceRef.current = advance;
    timerRef.current = setTimeout(advance, 10000);

    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      advanceRef.current = null;
    };
  }, [isInView]);

  const handleStateClick = (id) => {
    setSelectedStateId(id);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => advanceRef.current?.(), 1500);
    }
  };

  // Button drop-in animation variants
  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const buttonItemVariants = {
    hidden: { opacity: 0, y: -25, backgroundColor: "#B8E6FE" },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  const activeData = stateData[selectedStateId] ?? stateData[States2List[0].id];

  return (
    <div ref={sectionRef} className="w-full min-h-[720px] h-auto lg:min-h-[650px] pt-10 pb-10 bg-[#EBF7F6]">
      {/* Title Header */}
      <div className="flex items-baseline justify-center whitespace-nowrap">
        <p className="text-[28px] leading-none text-[#4298A9] sm:text-[32px] xl:text-[40px]">
          Germany
        </p>
        <span className="ml-2 text-[38px] leading-none font-semibold text-[#5B9E7D] sm:text-[46px] xl:text-[60px]">
          States
        </span>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 px-4 sm:px-6 lg:mt-[60px] lg:flex-row lg:items-start lg:justify-center lg:gap-8 lg:px-8 xl:gap-10 xl:px-10">
        {/* Left Side Buttons */}
        <div className="w-full max-w-[420px] lg:w-[40%] lg:shrink-0 xl:w-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              variants={buttonContainerVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              exit="exit"
              className="flex flex-col gap-[14px] lg:gap-[18px]"
            >
              {States2List.map(({ id, title }) => {
                const isSelected = selectedStateId === id;
                return (
                  <motion.button
                    key={id}
                    type="button"
                    variants={buttonItemVariants}
                    onClick={() => handleStateClick(id)}
                    aria-pressed={isSelected}
                    animate={{
                      backgroundColor: isSelected ? "#1C5B6C" : "#B8E6FE",
                      color: isSelected ? "#FFFFFF" : "#00609C",
                      borderColor: isSelected ? "#1C5B6C" : "#93D3FB",
                      scale: isSelected ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex h-[54px] w-full items-center justify-center rounded-[12px] border text-center text-[18px] font-medium cursor-pointer shadow-sm sm:h-[58px] lg:h-[62px] lg:text-[20px]"
                  >
                    {title}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Entire Card Animated as a Whole */}
        <div className="relative w-full max-w-[580px] lg:min-w-0 lg:flex-1 lg:h-[400px] xl:w-[580px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStateId}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full rounded-[28px] bg-white px-[22px] py-[24px] shadow-sm flex flex-col gap-[14px] sm:px-[28px] sm:py-[28px] lg:h-full lg:rounded-[36px] lg:px-[30px] lg:py-[30px] lg:gap-[16px] xl:px-[36px]"
            >
              <div className="text-center">
                <p className="text-[22px] font-bold text-[#20697B] lg:text-[24px]">
                  {activeData.title}
                </p>
                <p className="mt-1 text-[14px] text-slate-500 sm:text-[15px] lg:text-[16px]">
                  {activeData.description}
                </p>
              </div>

              <div className="text-[14px] leading-[1.35] text-[#20697B] flex flex-col gap-2.5 sm:text-[15px] lg:text-[16px]">
                <div>
                  <p className="font-bold">Popular Universities</p>
                  <ul className="list-disc pl-5 mt-1 text-[#00609C] space-y-0.5">
                    {(activeData.PopularUniversities ?? []).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-bold">City Highlights</p>
                  <ul className="list-disc pl-5 mt-1 text-[#00609C] space-y-0.5">
                    {activeData.CityHighlights.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default States2;