import { Globe, Mail, Phone } from "lucide-react";
import React from "react";

export interface TopBarContact {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const TOP_BAR_CONTACTS: TopBarContact[] = [
  { href: "tel:70070088", label: "70070088", icon: Phone },
  { href: "mailto:info@auto-oil.mn", label: "info@auto-oil.mn", icon: Mail },
];

export const topBarStyles = {
  bar: "border-b border-slate-800 bg-[#070b14]/80 backdrop-blur-md text-xs text-slate-400 sticky top-0 z-50 transition-all",
  container: "max-w-7xl mx-auto px-6 h-10 flex items-center justify-between",
  contacts: "flex items-center gap-6",
  contactLink: "flex items-center gap-2 hover:text-blue-400 transition-colors",
  langButton:
    "flex items-center gap-1.5 font-medium hover:text-white transition-colors",
  icon: "w-3.5 h-3.5",
};
