import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const states4List = [
  { id: "To", title: "Toronto, Ontario" },
  { id: "Va", title: "Vancouver, British Columbia" },
  { id: "Mo", title: "Montreal, Quebec" },
  { id: "Ot", title: "Ottawa, Ontario" },
  { id: "Ca", title: "Calgary & Edmonton, Alberta" },
];

const stateData = {
  To: {
    title: "Toronto, Ontario",
    description: "A city full of ambition, diversity, and opportunity.",
    PopularUniversities: [
      "University of Toronto",
      "York University",
      "Toronto Metropolitan University (formerly Ryerson)",
      "Humber College",
      "Seneca Polytechnic",
    ],
    CityHighlights: [
      "Canada’s financial and business heart",
      "Excellent part-time work and internship opportunities",
      "A truly global city where cultures come together",
    ],
  },
  Va: {
    title: "Vancouver, British Columbia",
    description: "Where innovation meets nature.",
    PopularUniversities: [
      "University of British Columbia (UBC)",
      "Simon Fraser University",
      "University of Victoria",
      "Langara College",
      "Douglas College",
    ],
    CityHighlights: [
      "Strong technology, sustainability, and creative industries",
      "Exceptional quality of life with ocean and mountain views",
      "A progressive and student-friendly environment",
    ],
  },
  Mo: {
    title: "Montreal, Quebec",
    description: "A city that inspires creativity and independent thinking.",
    PopularUniversities: [
      "McGill University",
      "Concordia University",
      "Université de Montréal",
      "HEC Montréal",
      "Université du Québec à Montréal (UQAM)",
    ],
    CityHighlights: [
      "World-class education with affordable living costs",
      "Global hub for AI, research, and arts",
      "A unique bilingual and multicultural lifestyle",
    ],
  },
  Ot: {
    title: "Ottawa, Ontario",
    description: "Quiet, focused, and full of opportunity.",
    PopularUniversities: [
      "University of Ottawa",
      "Carleton University",
      "Algonquin College",
      "La Cité Collegiale",
      "Dominican University College",
    ],
    CityHighlights: [
      "Canada’s capital with strong research and public sector links",
      "Safe, peaceful, and ideal for focused study",
      "Growing technology and government job opportunities",
    ],
  },
  Ca: {
    title: "Calgary & Edmonton, Alberta",
    description: "Affordable cities with growing futures.",
    PopularUniversities: [
      "University of Alberta",
      "University of Calgary ",
      "MacEwan University",
      "Mount Royal University",
      "Northern Alberta Institute of Technology (NAIT)",
    ],
    CityHighlights: [
      "Lower cost of living compared to major cities",
      "Expanding job markets in engineering, energy, healthcare, and business",
      "Ideal for students planning long-term settlement",
    ],
  },
};

function scheduleStateChange(delay, timeoutRef, selectedIndexRef, setSelectedStateId) {
  clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(() => {
    selectedIndexRef.current = (selectedIndexRef.current + 1) % states4List.length;
    setSelectedStateId(states4List[selectedIndexRef.current].id);
    scheduleStateChange(5000, timeoutRef, selectedIndexRef, setSelectedStateId);
  }, delay);
}

const States4 = () => {
  const [selectedStateId, setSelectedStateId] = useState(states4List[0].id);

  const sectionRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const selectedIndexRef = useRef(0);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const scheduleNextState = useCallback(
    (delay) => scheduleStateChange(delay, cycleTimeoutRef, selectedIndexRef, setSelectedStateId),
    [],
  );

  useEffect(() => {
    if (!isInView) return;

    scheduleNextState(10000);

    return () => {
      clearTimeout(cycleTimeoutRef.current);
    };
  }, [isInView, scheduleNextState]);

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

  const activeData = stateData[selectedStateId];

  return (
    <div ref={sectionRef} className="w-full h-auto min-h-[720px] lg:h-[650px] pt-8 lg:pt-10 pb-10 bg-[#EBF7F6]">
      {/* Title Header */}
      <div className="flex items-baseline justify-center whitespace-nowrap">
        <p className="text-[32px] sm:text-[40px] leading-none text-[#4298A9]">Canada</p>
        <span className="ml-2 text-[44px] sm:text-[60px] leading-none font-semibold text-[#5B9E7D]">
          States
        </span>
      </div>

      <div className="mt-8 lg:mt-[60px] flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-10 px-4 sm:px-8 lg:px-10">
        {/* Left Side Buttons */}
        <div className="w-full max-w-[420px] lg:min-h-[580px]">
          <AnimatePresence mode="wait">
            <motion.div
              variants={buttonContainerVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              exit="exit"
              className="flex flex-col gap-3 sm:gap-[18px]"
            >
              {states4List.map(({ id, title }) => {
                const isSelected = selectedStateId === id;
                return (
                  <motion.button
                    key={id}
                    variants={buttonItemVariants}
                    onClick={() => {
                      selectedIndexRef.current = states4List.findIndex((state) => state.id === id);
                      setSelectedStateId(id);
                      scheduleNextState(1500);
                    }}
                    animate={{
                      backgroundColor: isSelected ? "#1C5B6C" : "#B8E6FE",
                      color: isSelected ? "#FFFFFF" : "#00609C",
                      borderColor: isSelected ? "#1C5B6C" : "#93D3FB",
                      scale: isSelected ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex min-h-[56px] sm:h-[62px] w-full items-center justify-center rounded-[12px] border px-3 text-center text-base sm:text-[20px] font-medium cursor-pointer shadow-sm"
                  >
                    {title}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Entire Card Animated as a Whole */}
        <div className="relative w-full max-w-[580px] min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStateId}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full min-h-[400px] rounded-[28px] sm:rounded-[36px] bg-white px-5 sm:px-[36px] py-6 sm:py-[30px] shadow-sm flex flex-col gap-[16px]"
            >
              <div className="text-center">
                <p className="text-xl sm:text-[24px] font-bold text-[#20697B]">
                  {activeData.title}
                </p>
                <p className="mt-1 text-sm sm:text-[16px] text-slate-500">
                  {activeData.description}
                </p>
              </div>

              <div className="text-sm sm:text-[16px] leading-[1.35] text-[#20697B] flex flex-col gap-2.5">

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

export default States4;