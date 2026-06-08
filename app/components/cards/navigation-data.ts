import { Wrench, ShoppingBag, Layers, Utensils, Hotel } from "lucide-react";
import React from "react";

export interface NavCard {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export const NAVIGATION_CARDS: NavCard[] = [
  {
    title: "LUX OIL",
    subtitle: "Auto Center",
    icon: Wrench,
    href: "/products",
  },
  {
    title: "PRODUCTS",
    subtitle: "Бараа Бүтээгдэхүүн",
    icon: ShoppingBag,
    href: "/products",
  },
  { title: "BRANDS", subtitle: "Брэндүүд", icon: Layers, href: "/brand" },
  {
    title: "RESTAURANT",
    subtitle: "Дөлгөөн ресторан",
    icon: Utensils,
    href: "/dulguun-restaurant",
  },
  { title: "HOTEL", subtitle: "Aurora Hotel", icon: Hotel, href: "/aurora" },
];

export const navigationStyles = {
  section:
    "w-full relative z-20 py-5 sm:py-7 md:py-9 bg-gradient-to-t from-black/80 via-black/40 to-transparent",

  grid: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 max-w-6xl mx-auto px-3 sm:px-4 md:px-6",

  link: "group min-h-[112px] sm:min-h-[132px] md:min-h-[152px] p-4 sm:p-5 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/20 hover:bg-white/20 hover:border-white/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-start",

  iconWrapper:
    "w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-white/20 flex items-center justify-center transition-colors group-hover:bg-white/30",

  icon: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white",

  label:
    "flex items-center justify-between w-full gap-2 text-xs sm:text-sm md:text-base font-semibold text-white leading-snug",

  arrow:
    "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all",
};
