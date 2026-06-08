"use client";

import { Search } from "lucide-react";

export interface ProductSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearchBar({ value, onChange }: ProductSearchBarProps) {
  return (
    <div className="app-card p-4 sm:p-5">
      <label className="relative block">
        <span className="sr-only">Бүтээгдэхүүн хайх</span>
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Бүтээгдэхүүний нэрээр хайх..."
          className="field py-3 pl-11"
        />
      </label>
    </div>
  );
}
