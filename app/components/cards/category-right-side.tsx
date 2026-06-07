"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Авто арчилгаа", href: "#" },
  { label: "Дугуй", href: "#" },
  { label: "Тос,тосолгоо", href: "#" },
];

export default function CategoryRightSide() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-1/4">
      <div className="bg-blue-800 text-white p-4 flex justify-between items-center font-bold">
        <span>Категори</span>
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
    </aside>
  );
}
