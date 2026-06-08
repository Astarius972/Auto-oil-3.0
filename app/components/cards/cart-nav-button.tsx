"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/cart-context";

export function CartNavButton() {
  const { totalCount, isHydrated } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#2248b3]"
      aria-label={`Сагс${isHydrated && totalCount > 0 ? `, ${totalCount} бүтээгдэхүүн` : ""}`}
    >
      <ShoppingCart size={18} />
      <span className="hidden sm:inline">Сагс</span>
      {isHydrated && totalCount > 0 ? (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white shadow-sm ring-2 ring-[#2248b3]">
          {totalCount > 99 ? "99+" : totalCount}
        </span>
      ) : null}
    </Link>
  );
}
