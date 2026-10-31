import { useEffect, useRef, useState } from "react";
import e1 from "../assets/e1.png";
import e2 from "../assets/e2.png";
import e3 from "../assets/e3.png";
import e4 from "../assets/e4.png";
import e5 from "../assets/e5.png";
import e6 from "../assets/e6.png";
import e7 from "../assets/e7.png";
import e8 from "../assets/e8.png";
import e9 from "../assets/e9.png";
import e10 from "../assets/e10.png";
import e11 from "../assets/e11.png";
import e12 from "../assets/e12.png";

const countries = [
  ["Australia", e1, "/services/student-visa/australia"],
  ["Canada", e2, "/services/student-visa/canada"],
  ["United Kingdom", e3, "/services/student-visa/united-kingdom"],
  ["Dubai", e4, "/services/student-visa/dubai"],
  ["France", e5, "/services/student-visa/france"],
  ["USA", e6, "/services/student-visa/usa"],
  ["Germany", e7, "/services/student-visa/germany"],
  ["New Zealand", e8, "/services/student-visa/new-zealand"],
  ["Europe", e9, "/services/student-visa/europe"],
  ["Georgia", e10, "/services/student-visa/georgia"],
  ["Singapore", e11, "/services/student-visa/singapore"],
  ["Russia", e12, "/services/student-visa/russia"],
];

const Country = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isDragging) return;
      setIsAnimating(true);
      setActiveSlide((slide) => slide + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleTransitionEnd = (event) => {
    if (
      event.propertyName === "transform" &&
      activeSlide >= countries.length
    ) {
      setIsAnimating(false);
      setActiveSlide(0);
    }
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    dragStartX.current = event.clientX;
    hasDragged.current = false;
    setIsDragging(true);
    setIsAnimating(false);
    event.target.closest("a")?.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    const offset = event.clientX - dragStartX.current;
    if (Math.abs(offset) > 5) hasDragged.current = true;
    setDragOffset(offset);
  };

  const handlePointerUp = (event) => {
    if (!isDragging) return;
    const offset = event.clientX - dragStartX.current;
    const firstCard = event.currentTarget.firstElementChild;
    const step = firstCard
      ? firstCard.getBoundingClientRect().width + 48
      : 200;
    const steps = Math.max(1, Math.round(Math.abs(offset) / step));

    setIsDragging(false);
    setDragOffset(0);
    setIsAnimating(true);
    if (Math.abs(offset) > 30) {
      setActiveSlide((slide) =>
        Math.max(
          0,
          Math.min(countries.length, slide + (offset < 0 ? steps : -steps)),
        ),
      );
    }
  };

  return (
    <section className="w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="overflow-visible">
          <div
            onTransitionEnd={handleTransitionEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClickCapture={(event) => {
              if (hasDragged.current) {
                event.preventDefault();
                event.stopPropagation();
                hasDragged.current = false;
              }
            }}
            className={`flex gap-12 [--slide-width:calc(50%_-_6px)] sm:[--slide-width:calc(25%_-_9px)] ${
              isAnimating
                ? "transition-transform duration-500 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(calc(-${activeSlide} * (var(--slide-width) + 3rem) + ${dragOffset}px))`,
              cursor: isDragging ? "grabbing" : "grab",
              touchAction: "pan-y",
            }}
          >
            {[...countries, ...countries].map(([name, image, path], index) => (
              <a
                key={`${name}-${index}`}
                href={path}
                draggable={false}
                className="flex h-[153px] min-w-[calc(50%_-_6px)] shrink-0 flex-col items-center justify-center rounded-[20px] bg-gradient-to-r from-[#E4FFED] to-[#E8F7FF] py-3 sm:min-w-[calc(25%_-_9px)]"
              >
                <div className="mt-[-65px] mb-2 flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                  <img
                    src={image}
                    alt={`${name} landmark`}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-6 flex items-center gap-2 text-[20px] font-bold text-[#26839A]">
                  {name}
                  <span aria-hidden="true"> → </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Country;