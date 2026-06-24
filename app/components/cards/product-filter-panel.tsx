"use client";

import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "./product-data";

import type { ProductBrandFilter } from "./product-types";

export interface ProductFilterPanelProps {
  brands: ProductBrandFilter[];
  selectedBrandId: string | null;
  priceValue: number;
  priceMin: number;
  priceMax: number;
  priceStep: number;
  onBrandChange: (brand: string | null) => void;
  onPriceChange: (price: number) => void;
}

export function ProductFilterPanel({
  brands,
  selectedBrandId,
  priceValue,
  priceMin,
  priceMax,
  priceStep,
  onBrandChange,
  onPriceChange,
}: ProductFilterPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="app-card mt-5">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-t-2xl bg-brand-dark px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark/95"
      >
        <span className="flex items-center gap-2">
          <Menu size={16} />
          BRAND
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="px-1.5 pb-2 pt-1">
            {brands.map((brand) => {
              const isActive = selectedBrandId === brand.id;
              return (
                <li key={brand.id}>
                  <button
                    type="button"
                    onClick={() => onBrandChange(isActive ? null : brand.id)}
                    aria-pressed={isActive}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-brand-dark/10 font-semibold text-brand-dark"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{brand.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isActive
                          ? "bg-brand-dark text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {brand.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-slate-100 px-4 pt-4 pb-2">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Үнэ</span>
              <span className="normal-case tracking-normal text-brand-dark">
                {formatPrice(priceValue)}
              </span>
            </div>
          </div>

          <div className="px-4 pb-5 pt-2">
            <input
              type="range"
              min={priceMin}
              max={priceMax}
              step={priceStep}
              value={priceValue}
              onChange={(event) => onPriceChange(Number(event.target.value))}
              aria-label="Дээд үнэ"
              aria-valuemin={priceMin}
              aria-valuemax={priceMax}
              aria-valuenow={priceValue}
              className="product-price-slider h-2 w-full cursor-pointer rounded-full bg-slate-200"
            />
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>{formatPrice(priceMin)}</span>
              <span>{formatPrice(priceMax)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
