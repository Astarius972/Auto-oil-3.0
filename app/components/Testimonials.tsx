"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "ROCKET battery МОНГОЛД",
    designation: "албан ёсны эрхтэйгээр",
    src: "/rocket.jpg",
  },
  {
    name: "LUXOIL Салбар 2",
    designation: "шинэчлэгдлээ",
    src: "/654.jpg",
  },
  {
    name: "Aurora хөргөлтийн шингэн Монголд",
    designation: "албан ёсны эрхтэйгээр",
    src: "/Slide.png",
  },
  {
    name: "АВТО ОЙЛ",
    designation: "Royal dutch shell албан ёсны дистрибьютер",
    src: "/972.jpg",
  },
];

export const CircularTestimonialsDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const paginate = (direction: number) => {
    setActiveIndex(
      (prev) => (prev + direction + testimonials.length) % testimonials.length,
    );
  };

  const activeItem = testimonials[activeIndex];

  return (
    <section className="relative w-full shrink-0 bg-slate-950">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 md:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeItem.src}
              alt={activeItem.name}
              className="h-full w-full object-contain object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-10 md:px-10 md:pb-8 md:pt-16">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80 md:text-sm md:tracking-[0.18em]">
                {activeItem.designation}
              </p>
              <h3 className="text-lg font-bold leading-snug tracking-tight text-white drop-shadow-md md:text-3xl lg:text-4xl">
                {activeItem.name}
              </h3>

              <div className="mt-3 flex items-center gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`${index + 1}-р зураг`}
                    aria-current={index === activeIndex}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-white"
                        : "w-3 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 md:px-6">
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-sm text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/55 md:h-11 md:w-11"
            aria-label="Өмнөх зураг"
          >
            <FaArrowLeft />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-sm text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/55 md:h-11 md:w-11"
            aria-label="Дараагийн зураг"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};
