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
    <section className="relative col-span-12 h-full min-h-full w-full overflow-hidden bg-slate-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full bg-slate-950"
        >
          <img
            src={activeItem.src}
            className="h-full w-full object-cover"
            alt={activeItem.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

          <div className="absolute bottom-[26%] left-6 z-10 max-w-xl drop-shadow-lg sm:left-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-sm">
              {activeItem.designation}
            </p>
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-5xl">
              {activeItem.name}
            </h3>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next controls */}
      <div className="absolute top-1/2 z-20 flex w-full -translate-y-1/2 justify-between px-4 sm:px-8">
        <button
          onClick={() => paginate(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 sm:h-12 sm:w-12"
          aria-label="Өмнөх зураг"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => paginate(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 sm:h-12 sm:w-12"
          aria-label="Дараагийн зураг"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-[18%] left-6 z-20 flex items-center gap-2 sm:left-10">
        {testimonials.map((item, index) => (
          <button
            key={item.src}
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
    </section>
  );
};
