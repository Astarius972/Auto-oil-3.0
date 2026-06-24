import { PRODUCT_ENTRIES } from "../../data/products";
import type {
  CategoryCountFilters,
  Product,
  ProductBrandFilter,
  ProductCategory,
  ProductCategoryDefinition,
  ProductInput,
} from "./product-types";

export type {
  CategoryCountFilters,
  Product,
  ProductBrandFilter,
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
    usageInstructions: input.description ?? description,
  };
}

export function buildProductBrandFiltersFromProducts(
  products: Product[],
  cmsBrandCategories?: Array<{ id: string; label: string }>,
): ProductBrandFilter[] {
  const brandMap = new Map<string, ProductBrandFilter>();

  const seedCategories =
    cmsBrandCategories ??
    products
      .filter((product) => product.brandCategoryId)
      .map((product) => ({
        id: product.brandCategoryId!,
        label: product.brand,
      }));

  for (const category of seedCategories) {
    brandMap.set(category.id, {
      id: category.id,
      label: category.label,
      count: 0,
    });
  }

  for (const product of products) {
    const id = product.brandCategoryId ?? product.brand;
    if (!id) continue;

    const existing = brandMap.get(id);
    if (existing) {
      existing.count += 1;
      continue;
    }

    brandMap.set(id, {
      id,
      label: product.brand,
      count: 1,
    });
  }

  return [...brandMap.values()]
    .filter((brand) => brand.count > 0 || cmsBrandCategories?.some((item) => item.id === brand.id))
    .sort((a, b) => a.label.localeCompare(b.label, "mn"));
}

function getPriceFilterMax(products: Product[]): number {
  if (products.length === 0) {
    return 900_000;
  }

  const highestPrice = Math.max(...products.map((product) => product.price));
  return Math.ceil(highestPrice / 10_000) * 10_000;
}

export function getProductCatalogMeta(
  products: Product[],
  cmsBrandCategories?: Array<{ id: string; label: string }>,
) {
  return {
    brands: buildProductBrandFiltersFromProducts(products, cmsBrandCategories),
    priceFilter: {
      min: 0,
      max: getPriceFilterMax(products),
      step: 1_000,
    },
  };
}

export const PRODUCTS: Product[] = PRODUCT_ENTRIES.map(normalizeProduct);

function getStaticCategoryLabel(categoryId: string): string {
  return (
    PRODUCT_CATEGORY_DEFINITIONS.find((category) => category.id === categoryId)
      ?.label ?? categoryId
  );
}

function getProductCategoryKey(product: Product): string {
  return product.typeCategoryId ?? product.categoryId;
}

function matchesBaseFilters(
  product: Product,
  filters: CategoryCountFilters,
): boolean {
  const query = filters.nameQuery.trim().toLowerCase();
  const matchesName =
    !query || product.name.toLowerCase().includes(query);
  const matchesBrand =
    !filters.selectedBrandId ||
    product.brandCategoryId === filters.selectedBrandId ||
    product.brand === filters.selectedBrandId;
  const matchesPrice = product.price <= filters.priceValue;

  return matchesName && matchesBrand && matchesPrice;
}

export function buildCategoriesWithCounts(
  products: Product[],
  filters: CategoryCountFilters,
  cmsTypeCategories?: Array<{ id: string; label: string }>,
): ProductCategory[] {
  const categories =
    cmsTypeCategories ??
    [...new Map(
      products.map((product) => {
        const id = getProductCategoryKey(product);
        return [
          id,
          {
            id,
            label:
              product.categoryLabel ?? getStaticCategoryLabel(product.categoryId),
          },
        ] as const;
      }),
    ).values()];

  return categories
    .map(({ id, label }) => ({
      id,
      label,
      count: products.filter(
        (product) =>
          getProductCategoryKey(product) === id &&
          matchesBaseFilters(product, filters),
      ).length,
    }))
    .filter((category) =>
      cmsTypeCategories ? true : category.count > 0,
    )
    .sort((a, b) => a.label.localeCompare(b.label, "mn"));
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getOilRelatedProducts(
  product: Product,
  products: Product[],
  limit = 6,
): Product[] {
  return products
    .filter((item) => item.id !== product.id && isOilProduct(item))
    .slice(0, limit);
}

const OIL_CATEGORY_SLUGS = new Set(["tos-tosolgoo", "oils"]);

export function isOilProduct(product: Product): boolean {
  if (OIL_CATEGORY_SLUGS.has(product.categoryId)) return true;

  const label = product.categoryLabel?.toLowerCase() ?? "";
  return label.includes("тос");
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString("mn-MN")}₮`;
}
