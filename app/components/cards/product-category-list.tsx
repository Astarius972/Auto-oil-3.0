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
    <div className="app-card overflow-hidden">
      <div className="flex items-center justify-between bg-brand-dark px-4 py-3 text-sm font-bold text-white">
        <span className="flex items-center gap-2">
          <Menu size={16} />
          АНГИЛАЛ
        </span>
        <ChevronDown size={18} />
      </div>
      <ul className="p-1.5">
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onCategorySelect(isActive ? null : category.id)}
                aria-pressed={isActive}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-brand-dark/10 font-semibold text-brand-dark"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{category.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    isActive
                      ? "bg-brand-dark text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
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
