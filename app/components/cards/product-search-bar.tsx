"use client";

import { Search } from "lucide-react";

export interface ProductSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearchBar({ value, onChange }: ProductSearchBarProps) {
  return (
    <div className="border border-slate-200 bg-white">
      <div className="flex items-center justify-between bg-[#0d4a8f] px-4 py-3 text-sm font-bold text-white">
        <span className="flex items-center gap-2">
          <Search size={16} />
          ХАЙЛТ
        </span>
      </div>
      <div className="px-4 py-3">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Бүтээгдэхүүний нэрээр хайх..."
          className="w-full rounded border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#0d4a8f]"
        />
      </div>
    </div>
  );
}
