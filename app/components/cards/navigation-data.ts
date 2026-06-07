import { Wrench, ShoppingBag, Layers, Utensils, Hotel } from "lucide-react";
import React from "react";

export interface NavCard {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export const NAVIGATION_CARDS: NavCard[] = [
  { title: "LUX OIL", subtitle: "Auto Center", icon: Wrench, href: "#" },
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
    href: "#",
  },
  { title: "HOTEL", subtitle: "Aurora Hotel", icon: Hotel, href: "#" },
];

export const navigationStyles = {
  section:
    "w-full relative z-20 py-4 sm:py-6 md:py-8 bg-gradient-to-t from-black/70 to-transparent",

  grid: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 max-w-6xl mx-auto px-3 sm:px-4 md:px-6",

  link: "group min-h-[110px] sm:min-h-[130px] md:min-h-[150px] p-3 sm:p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white/15 backdrop-blur-xl border border-white/30 hover:bg-white/25 hover:border-white/40 hover:scale-105 transition-all duration-300 flex flex-col justify-between items-start",

  iconWrapper:
    "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center",

  icon: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white",

  label: "text-xs sm:text-sm md:text-base font-medium text-white leading-snug",

  arrow:
    "w-3 h-3 sm:w-4 sm:h-4 text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform",
};
