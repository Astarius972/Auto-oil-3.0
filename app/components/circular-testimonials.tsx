"use client";
import React, { useState, useMemo, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export const CircularTestimonialsDemo = ({
  testimonials = [
    {
      quote: "I was impressed by the food!",
      name: "Tamar Mendelson",
      designation: "Restaurant Critic",
      src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=2000",
    },
    {
      quote: "This place exceeded all expectations!",
      name: "Joe Charlescraft",
      designation: "Frequent Visitor",
      src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=2000",
    },
  ],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsLength = testimonials.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonialsLength) % testimonialsLength,
    );
  }, [testimonialsLength]);

  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials],
  );

  return (
    <div className="relative w-screen h-[80vh] overflow-hidden ml-[calc(-50vw+50%)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeTestimonial.src}
            className="w-full h-full object-cover"
            alt={activeTestimonial.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />

          <div className="absolute bottom-[10%] left-[10%] z-[2] max-w-[600px] text-white">
            <h3 className="text-5xl font-bold mb-2">
              {activeTestimonial.name}
            </h3>
            <p className="text-xl opacity-90 mb-6">
              {activeTestimonial.designation}
            </p>
            <p className="text-lg italic mb-8 leading-relaxed">
              "{activeTestimonial.quote}"
            </p>
            <button className="px-10 py-4 bg-white text-black rounded-full font-bold cursor-pointer">
              View Details
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/2 w-full flex justify-between px-8 z-[10]">
        <button
          onClick={handlePrev}
          className="p-6 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer hover:bg-white/30 transition-colors"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="p-6 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer hover:bg-white/30 transition-colors"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
