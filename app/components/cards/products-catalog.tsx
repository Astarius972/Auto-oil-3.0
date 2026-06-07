"use client";

import { useMemo, useState } from "react";
import ProductCard from "./product-box";
import { ProductCategoryList } from "./product-category-list";
import { ProductFilterPanel } from "./product-filter-panel";
import { ProductSearchBar } from "./product-search-bar";
import { useCart } from "../../context/cart-context";
import {
  buildCategoriesWithCounts,
  PRICE_FILTER,
  PRODUCT_BRANDS,
  PRODUCTS,
  type Product,
} from "./product-data";

export function ProductsCatalog() {
  const { addToCart, items } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [nameQuery, setNameQuery] = useState("");
  const [priceValue, setPriceValue] = useState(PRICE_FILTER.max);

  const categoryFilters = useMemo(
    () => ({
      nameQuery,
      selectedBrand,
      priceValue,
    }),
    [nameQuery, selectedBrand, priceValue],
  );

  const categoriesWithCounts = useMemo(
    () => buildCategoriesWithCounts(PRODUCTS, categoryFilters),
    [categoryFilters],
  );

  const filteredProducts = useMemo(() => {
    const query = nameQuery.trim().toLowerCase();

    return PRODUCTS.filter((product: Product) => {
      const matchesCategory =
        !selectedCategory || product.categoryId === selectedCategory;
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      const matchesName =
        !query || product.name.toLowerCase().includes(query);
      const matchesPrice = product.price <= priceValue;

      return matchesCategory && matchesBrand && matchesName && matchesPrice;
    });
  }, [nameQuery, priceValue, selectedBrand, selectedCategory]);

  return (
    <div className="flex flex-col gap-6">
      <ProductSearchBar value={nameQuery} onChange={setNameQuery} />

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full shrink-0 md:w-72">
          <ProductCategoryList
            categories={categoriesWithCounts}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          <ProductFilterPanel
            brands={PRODUCT_BRANDS}
            selectedBrand={selectedBrand}
            priceValue={priceValue}
            priceMin={PRICE_FILTER.min}
            priceMax={PRICE_FILTER.max}
            priceStep={PRICE_FILTER.step}
            onBrandChange={setSelectedBrand}
            onPriceChange={setPriceValue}
          />
        </aside>

        <main className="w-full border border-slate-200 bg-white p-6">
          <h1 className="mb-6 border-b border-slate-300 pb-4 text-xl font-bold text-black">
            Бараа бүтээгдэхүүн
          </h1>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => {
                const cartQuantity =
                  items.find((item) => item.productId === product.id)?.quantity ??
                  0;

                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    price={product.price}
                    brand={product.brand}
                    cartQuantity={cartQuantity}
                    onAddToCart={() => addToCart(product)}
                  />
                );
              })}
            </div>
          ) : (
            <p className="py-12 text-center text-slate-500">
              Таны хайлтаар бүтээгдэхүүн олдсонгүй.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
