import { PRODUCT_ENTRIES } from "../../data/products";
import type {
  CategoryCountFilters,
  Product,
  ProductCategory,
  ProductCategoryDefinition,
  ProductInput,
} from "./product-types";

export type {
  CategoryCountFilters,
  Product,
  ProductCategory,
  ProductCategoryDefinition,
  ProductInput,
} from "./product-types";

export const PRODUCT_CATEGORY_DEFINITIONS: ProductCategoryDefinition[] = [
  { id: "auto-care", label: "Авто арчилгаа" },
  { id: "travel", label: "Аяллын бараа" },
  { id: "tires", label: "Дугуй" },
  { id: "oils", label: "Тос, тосолгоо" },
  { id: "chemistry", label: "Автохими" },
];

const FALLBACK_DESCRIPTION =
  "Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл удахгүй нэмэгдэнэ.";

function normalizeProduct(input: ProductInput): Product {
  const description = input.description ?? input.shortDescription ?? FALLBACK_DESCRIPTION;

  return {
    id: input.id,
    name: input.name,
    brand: input.brand,
    price: input.price,
    imageUrl: input.imageUrl,
    categoryId: input.categoryId,
    shortDescription: input.shortDescription ?? description,
    description,
    specifications: input.specifications ?? `Брэнд: ${input.brand}`,
    images: input.images ?? [input.imageUrl],
  };
}

function getUniqueBrands(products: Product[]): string[] {
  return [...new Set(products.map((product) => product.brand))].sort((a, b) =>
    a.localeCompare(b, "mn"),
  );
}

function getPriceFilterMax(products: Product[]): number {
  if (products.length === 0) {
    return 900_000;
  }

  const highestPrice = Math.max(...products.map((product) => product.price));
  return Math.ceil(highestPrice / 10_000) * 10_000;
}

export const PRODUCTS: Product[] = PRODUCT_ENTRIES.map(normalizeProduct);

export const PRODUCT_BRANDS = getUniqueBrands(PRODUCTS);

export const PRICE_FILTER = {
  min: 0,
  max: getPriceFilterMax(PRODUCTS),
  step: 1_000,
};

function matchesBaseFilters(
  product: Product,
  filters: CategoryCountFilters,
): boolean {
  const query = filters.nameQuery.trim().toLowerCase();
  const matchesName =
    !query || product.name.toLowerCase().includes(query);
  const matchesBrand =
    !filters.selectedBrand || product.brand === filters.selectedBrand;
  const matchesPrice = product.price <= filters.priceValue;

  return matchesName && matchesBrand && matchesPrice;
}

export function buildCategoriesWithCounts(
  products: Product[],
  filters: CategoryCountFilters,
): ProductCategory[] {
  return PRODUCT_CATEGORY_DEFINITIONS.map((category) => ({
    ...category,
    count: products.filter(
      (product) =>
        product.categoryId === category.id &&
        matchesBaseFilters(product, filters),
    ).length,
  }));
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getSimilarProducts(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter(
    (item) =>
      item.id !== product.id && item.categoryId === product.categoryId,
  ).slice(0, limit);
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString("mn-MN")}₮`;
}
