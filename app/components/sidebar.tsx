"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Брэндүүд", href: "/brand" },
  { label: "Салбар дэлгүүрийн байршил", href: "/branch" },
  { label: "Худалдан авалт", href: "/procurement" },
  { label: "Холбоо барих", href: "/contact" },
  { label: "Бидний тухай", href: "/about" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-1/4">
      <div className="bg-blue-800 text-white p-4 flex justify-between items-center font-bold">
        <span>Ангилал</span>
        <ChevronDown size={20} />
      </div>
      <ul className="border border-slate-200">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block p-4 border-b last:border-b-0
                    ${isActive ? "bg-blue-800 text-white" : "text-gray-500 hover:bg-slate-50"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 border p-4 text-center hover:bg-slate-50 cursor-pointer text-slate-400">
        <a
          href="https://www.facebook.com/Luxoilautocenter/?ref=embed_page#"
          target="_blank"
          className="text-slate-400"
        >
          Auto Oil Facebook
        </a>
      </div>
    </aside>
  );
}
