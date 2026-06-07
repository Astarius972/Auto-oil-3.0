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
    <div className="mt-6 border border-slate-200 bg-white">
      <div className="flex items-center justify-between bg-[#0d4a8f] px-4 py-3 text-sm font-bold text-white">
        <span className="flex items-center gap-2">
          <Menu size={16} />
          ШҮҮЛТ
        </span>
        <ChevronDown size={18} />
      </div>

      <div className="border-b border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
        БРЭНД
      </div>
      <ul className="border-b border-slate-200">
        {brands.map((brand) => {
          const isActive = selectedBrand === brand;
          return (
            <li key={brand}>
              <button
                type="button"
                onClick={() => onBrandChange(isActive ? null : brand)}
                className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-slate-100 font-medium text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {brand}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
        ҮНЭ
      </div>
      <div className="px-4 py-5">
        <div className="relative mb-2">
          <div
            className="pointer-events-none absolute -top-9 rounded bg-black px-2 py-1 text-xs text-white"
            style={{
              left: `calc(${((priceValue - priceMin) / (priceMax - priceMin)) * 100}% - 28px)`,
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
          className="product-price-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200"
        />
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>{formatPrice(priceMin)}</span>
          <span>{formatPrice(priceMax)}</span>
        </div>
      </div>
    </div>
  );
}
