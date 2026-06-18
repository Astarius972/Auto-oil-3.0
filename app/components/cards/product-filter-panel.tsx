"use client";

import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "./product-data";

export interface ProductFilterPanelProps {
  brands: string[];
  selectedBrand: string | null;
  priceValue: number;
  priceMin: number;
  priceMax: number;
  priceStep: number;
  onBrandChange: (brand: string | null) => void;
  onPriceChange: (price: number) => void;
}

export function ProductFilterPanel({
  brands,
  selectedBrand,
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
          ШҮҮЛТ
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
          <div className="px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Брэнд
          </div>
          <ul className="px-1.5 pb-2">
            {brands.map((brand) => {
              const isActive = selectedBrand === brand;
              return (
                <li key={brand}>
                  <button
                    type="button"
                    onClick={() => onBrandChange(isActive ? null : brand)}
                    aria-pressed={isActive}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-brand-dark/10 font-semibold text-brand-dark"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {brand}
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
