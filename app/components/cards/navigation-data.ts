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
    subtitle: "Бүтээгдэхүүн",
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
    "w-full relative z-20 py-3 md:py-6 lg:py-8 bg-slate-950 border-t border-white/10",

  grid: "flex flex-col gap-2 max-w-6xl mx-auto md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-5 lg:gap-5",

  link: "group flex min-h-[56px] flex-row items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-3 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/20 active:scale-[0.98] md:min-h-[132px] md:flex-col md:items-start md:justify-between md:rounded-2xl md:p-5 md:hover:-translate-y-1 md:hover:shadow-xl lg:min-h-[152px] lg:rounded-3xl",

  iconWrapper:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 transition-colors group-hover:bg-white/30 md:h-11 md:w-11 md:rounded-xl lg:h-12 lg:w-12",

  icon: "h-5 w-5 text-white md:h-5 md:w-5 lg:h-6 lg:w-6",

  label:
    "flex min-w-0 flex-1 items-center justify-between gap-2 text-sm font-semibold leading-snug text-white md:w-full md:text-sm lg:text-base",

  arrow:
    "h-4 w-4 shrink-0 text-white/70 transition-all group-hover:text-white md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5",
};
