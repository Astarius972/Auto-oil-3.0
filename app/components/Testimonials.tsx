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
    <section className="col-span-12 w-full h-full min-h-[calc(100vh-140px)] relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeItem.src}
            className="w-full h-full object-cover"
            alt={activeItem.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          <div className="absolute bottom-[28%] left-6 sm:left-10 z-10 max-w-lg drop-shadow-lg">
            <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-white/60 mb-2">
              {activeItem.designation}
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight">
              {activeItem.name}
            </h3>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/2 w-full flex justify-between px-8 z-20">
        <button
          onClick={() => paginate(-1)}
          className="p-6 bg-[#0582CA] rounded-full text-[#f7f7ff]"
          aria-label="Previous"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-6 bg-[#0582CA] rounded-full text-[#f7f7ff]"
          aria-label="Next"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};
