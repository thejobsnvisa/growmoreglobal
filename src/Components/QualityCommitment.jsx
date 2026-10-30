import { useEffect, useState } from "react";
import image2 from "../assets/image2.png";
import image1 from "../assets/image1.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/icon6.png";
import i1 from "../assets/icon.png";

const commitmentItems = [
  {
    type: "image",
    icon: image4,
    title: "Ongoing Commitment",
    description:
      "We remain committed to helping you move forward with clarity, confidence, and the right direction.",
  },
  {
    type: "image",
    icon: image3,
    title: "Expert Support",
    description:
      "We assist with eligibility assessment, documentation, application preparation, and ongoing support.",
  },
  {
    type: "image",
    icon: image2,
    title: "Honest Advice",
    description:
      "We provide clear, transparent and honest advice to help you make confident decisions.",
  },
  {
    type: "image",
    icon: image1,
    title: "Tailored Guidance",
    description:
      "We provide personalised guidance because every client and every immigration journey is different.",
  },
  {
    type: "image",
    icon: image5,
    title: "Clear Process",
    description:
      "We simplify complex visa requirements and explain each stage in clear, practical language.",
  },
  {
    type: "image",
    icon: image6,
    title: "Client Focus",
    description:
      "We understand your background, goals, and concerns before recommending a suitable pathway.",
  },
];

const QualityCommitment = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % commitmentItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getItem = (position) => {
    const index = (activeIndex + position) % commitmentItems.length;

    return commitmentItems[index];
  };

  const leftItem = getItem(0);
  const centerItem = getItem(1);
  const rightItem = getItem(2);

  const renderIcon = (item, size = 75) => {
    if (item.type === "image") {
      return (
        <img
          src={item.icon}
          alt={item.title}
          className="h-[125px] w-[125px] object-contain"
        />
      );
    }

    const Icon = item.icon;

    return <Icon size={size} strokeWidth={1.4} className="text-[#8BCFE2]" />;
  };

  return (
    <>
      {/* =====================================================
          SLIDE ANIMATION
      ====================================================== */}

      <style>{`
        @keyframes slideRightToLeft {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-right-to-left {
          animation: slideRightToLeft 0.8s ease-out;
        }

      `}</style>

      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-[linear-gradient(90deg,#EEF7FC_0%,#FBF6E9_100%)]

          px-[clamp(1rem,4vw,3rem)]
          py-[clamp(2rem,5vw,3.5rem)]
        "
      >
        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[1240px]
          "
        >
          {/* =====================================================
              HEADING
          ====================================================== */}

          <div
            className="
              relative
              z-40
            "
          >
            <p
              className="
                m-0
                text-[clamp(1.25rem,3vw,2.375rem)]
                font-normal
                leading-[1.15]
                text-[#26839A]
              "
            >
              Quality and Environmental
            </p>

            <h2
              className="
                m-0
                mt-[4px]
                text-[clamp(2rem,5vw,3.75rem)]
                font-bold
                leading-[1.05]
                text-[#5B9E7D]
              "
            >
              Commitment
            </h2>
          </div>

          {/* =====================================================
              LEFT CARD
          ====================================================== */}

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] items-center gap-[clamp(1rem,2vw,1.5rem)] mt-[clamp(2rem,5vw,3.5rem)]">
          <div className="relative mx-auto h-[clamp(190px,22vw,240px)] w-full max-w-[300px] overflow-hidden rounded-[26px] bg-white shadow-[0px_4px_20px_0px_#CFCFCFB0]">
            <div
              key={`left-${activeIndex}`}
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                slide-right-to-left
              "
            >
              {renderIcon(leftItem, 68)}

              <h3
                className="
                  mt-4
                  px-4
                  text-center
                  text-[clamp(1.125rem,1.7vw,1.4375rem)]
                  font-semibold
                  text-[#159B89]
                "
              >
                {leftItem.title}
              </h3>
            </div>
          </div>

          {/* =====================================================
              CENTER CARD
          ====================================================== */}

          <div className="relative mx-auto h-[clamp(270px,27vw,330px)] w-full max-w-[500px] overflow-hidden rounded-[30px] bg-white shadow-[0px_4px_20px_0px_#00000033]">
            {/* Fixed Header */}

            <div
              className="
                flex
                h-[45px]
                w-full
                items-center
                justify-center
                rounded-tl-[30px]
                rounded-tr-[30px]
                bg-[#185C6B]
              "
            >
              <div className="flex items-center gap-2 text-white">
                <img
                  src={i1}
                  alt="Visa"
                  className="
                    h-[21px]
                    w-[21px]
                    object-contain
                  "
                />

                <span
                  className="
                    text-[clamp(1.125rem,1.7vw,1.375rem)]
                    font-semibold
                  "
                >
                  Visa
                </span>
              </div>
            </div>

            {/* Center Content */}

            <div
              key={`center-${activeIndex}`}
              className="
                flex
                h-[calc(100%-45px)]
                w-full
                items-center
                px-[clamp(0.75rem,2vw,2rem)]
                slide-right-to-left
              "
            >
              {/* Icon */}

              <div
                className="
                  flex
                  w-[clamp(80px,13vw,185px)]
                  shrink-0
                  items-center
                  justify-center
                "
              >
                {renderIcon(centerItem, 82)}
              </div>

              {/* Content */}

              <div
                className="
                  min-w-0
                  pl-1

                  xl:pl-2
                "
              >
                <h3
                  className="
                    text-[clamp(1.125rem,1.8vw,1.5625rem)]
                    font-semibold
                    leading-tight
                    text-[#83BEE5]
                  "
                >
                  {centerItem.title}
                </h3>

                <p
                  className="
                    mt-2
                    max-w-[260px]
                    text-[clamp(0.8125rem,1.25vw,1.0625rem)]
                    leading-[1.45]
                    text-[#159B89]
                    
                  "
                >
                  {centerItem.description}
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT CARD
          ====================================================== */}

          <div className="relative mx-auto h-[clamp(190px,22vw,240px)] w-full max-w-[300px] overflow-hidden rounded-[26px] bg-white shadow-[0px_4px_20px_0px_#CFCFCFB0]">
            <div
              key={`right-${activeIndex}`}
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                slide-right-to-left
              "
            >
              {renderIcon(rightItem, 68)}

              <h3
                className="
                  mt-4
                  px-4
                  text-center
                  text-[clamp(1.125rem,1.7vw,1.4375rem)]
                  font-semibold
                  text-[#159B89]
                "
              >
                {rightItem.title}
              </h3>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QualityCommitment;
