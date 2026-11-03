import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

import bg18 from "../assets/bg18.svg";
import icef from "../assets/icef.png";
import qeac from "../assets/qeac.svg";
import isana from "../assets/isana.svg";

const certifications = [

  {
    id: 1,
    image: bg18,
    alt: "Certification",
  },
  {
    id: 2,
    image: icef,
    alt: "ICEF Certification",
  },
  {
    id: 3,
    image: qeac,
    alt: "QEAC Certification",
  },
  {
    id: 4,
    image: isana,
    alt: "ISANA Certification",
  },
];

export default function Certification() {
  return (
    <section className="mx-auto max-w-[1400px] rounded-[24px] bg-sky-100 px-4 py-6 sm:rounded-[40px] sm:px-6 sm:py-8 md:px-12">
      {/* Heading */}
        <div className="mb-1 mt-2 flex items-center gap-[10px] sm:mt-0 xl:ml-12">
            <span
              className="
                text-[24px]
                sm:text-[36px]
                md:text-[40px]
                lg:text-[40px]
                leading-tight
                text-[#338292]
              "
            >
              Certification And
            </span>
          </div>

          {/* Testimonials */}
          <div className="mb-4 mt-0 xl:ml-12">
            <span
              className="
                text-[32px]
                sm:text-[40px]
                md:text-[45px]
                xl:text-[60px]
                leading-tight
                font-bold
                text-[#5B9E7D]
              "
            >
              Accreditation
            </span>
          </div>

      {/* Carousel */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {certifications.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex h-[200px] items-center justify-center sm:h-[280px]">
              <img
                src={item.image}
                alt="certification"
                className="max-h-[200px] object-contain transition duration-300 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
