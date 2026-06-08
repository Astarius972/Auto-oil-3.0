"use client";

import { ChevronDown, Menu } from "lucide-react";
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
  return (
    <div className="app-card mt-5 overflow-hidden">
      <div className="flex items-center justify-between bg-brand-dark px-4 py-3 text-sm font-bold text-white">
        <span className="flex items-center gap-2">
          <Menu size={16} />
          ШҮҮЛТ
        </span>
        <ChevronDown size={18} />
      </div>

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

      <div className="border-t border-slate-100 px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Үнэ
      </div>
      <div className="px-4 pb-5 pt-6">
        <div className="relative mb-3">
          <div
            className="pointer-events-none absolute -top-8 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-xs font-semibold text-white shadow-sm"
            style={{
              left: `${((priceValue - priceMin) / (priceMax - priceMin)) * 100}%`,
            }}
          >
            {formatPrice(priceValue)}
          </div>
        </div>
        <input
          type="range"
          min={priceMin}
          max={priceMax}
          step={priceStep}
          value={priceValue}
          onChange={(event) => onPriceChange(Number(event.target.value))}
          aria-label="Дээд үнэ"
          className="product-price-slider h-2 w-full cursor-pointer rounded-full bg-slate-200"
        />
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>{formatPrice(priceMin)}</span>
          <span>{formatPrice(priceMax)}</span>
        </div>
      </div>
    </div>
  );
}
