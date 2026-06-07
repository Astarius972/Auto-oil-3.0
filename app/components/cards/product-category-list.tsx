"use client";

import { ChevronDown, Menu } from "lucide-react";
import type { ProductCategory } from "./product-data";

export interface ProductCategoryListProps {
  categories: ProductCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function ProductCategoryList({
  categories,
  selectedCategory,
  onCategorySelect,
}: ProductCategoryListProps) {
  return (
    <div className="border border-slate-200 bg-white">
      <div className="flex items-center justify-between bg-[#0d4a8f] px-4 py-3 text-sm font-bold text-white">
        <span className="flex items-center gap-2">
          <Menu size={16} />
          АНГИЛАЛ
        </span>
        <ChevronDown size={18} />
      </div>
      <ul>
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <li key={category.id} className="border-b border-slate-200 last:border-b-0">
              <button
                type="button"
                onClick={() =>
                  onCategorySelect(isActive ? null : category.id)
                }
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-slate-100 font-medium text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{category.label}</span>
                <span className="rounded-full bg-slate-500 px-2 py-0.5 text-xs text-white">
                  {category.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
