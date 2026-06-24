"use client";

import { useMemo, useState } from "react";
import ProductCard from "./product-box";
import { ProductCategoryList } from "./product-category-list";
import { ProductFilterPanel } from "./product-filter-panel";
import { ProductSearchBar } from "./product-search-bar";
import {
  buildCategoriesWithCounts,
  getProductCatalogMeta,
  type Product,
} from "./product-data";

import type { CmsFilterCategory } from "@/lib/cms-product";

type ProductsCatalogProps = {
  products: Product[];
  angilalCategories?: CmsFilterCategory[];
  brandCategories?: CmsFilterCategory[];
};

export function ProductsCatalog({
  products,
  angilalCategories,
  brandCategories,
}: ProductsCatalogProps) {
  const { brands, priceFilter } = useMemo(
    () => getProductCatalogMeta(products, brandCategories),
    [products, brandCategories],
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [nameQuery, setNameQuery] = useState("");
  const [priceValue, setPriceValue] = useState(priceFilter.max);

  const categoryFilters = useMemo(
    () => ({
      nameQuery,
      selectedBrandId,
      priceValue,
    }),
    [nameQuery, selectedBrandId, priceValue],
  );

  const categoriesWithCounts = useMemo(
    () => buildCategoriesWithCounts(products, categoryFilters, angilalCategories),
    [products, categoryFilters, angilalCategories],
  );

  const filteredProducts = useMemo(() => {
    const query = nameQuery.trim().toLowerCase();

    return products.filter((product: Product) => {
      const matchesCategory =
        !selectedCategory ||
        product.typeCategoryId === selectedCategory ||
        product.categoryId === selectedCategory;
      const matchesBrand =
        !selectedBrandId ||
        product.brandCategoryId === selectedBrandId ||
        product.brand === selectedBrandId;
      const matchesName =
        !query || product.name.toLowerCase().includes(query);
      const matchesPrice = product.price <= priceValue;

      return matchesCategory && matchesBrand && matchesName && matchesPrice;
    });
  }, [products, nameQuery, priceValue, selectedBrandId, selectedCategory]);

  return (
    <div className="flex flex-col gap-6">
      <ProductSearchBar value={nameQuery} onChange={setNameQuery} />

      <div className="flex flex-col gap-6 md:flex-row lg:gap-8">
        <aside className="w-full shrink-0 md:w-72 md:self-start lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]">
          <ProductCategoryList
            categories={categoriesWithCounts}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          <ProductFilterPanel
            brands={brands}
            selectedBrandId={selectedBrandId}
            priceValue={priceValue}
            priceMin={priceFilter.min}
            priceMax={priceFilter.max}
            priceStep={priceFilter.step}
            onBrandChange={setSelectedBrandId}
            onPriceChange={setPriceValue}
          />
        </aside>

        <main className="app-card w-full p-5 sm:p-6">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Бараа бүтээгдэхүүн
            </h2>
            <span className="text-sm text-slate-500">
              {filteredProducts.length} илэрц
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  brand={product.brand}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <p className="text-base font-medium text-slate-600">
                Таны хайлтаар бүтээгдэхүүн олдсонгүй.
              </p>
              <p className="text-sm text-slate-400">
                Шүүлтүүрээ өөрчилж дахин оролдоно уу.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
