export interface ProductCategory {
  id: string;
  label: string;
  count: number;
}

export interface ProductCategoryDefinition {
  id: string;
  label: string;
}

export interface CategoryCountFilters {
  nameQuery: string;
  selectedBrand: string | null;
  priceValue: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export const PRODUCT_CATEGORY_DEFINITIONS: ProductCategoryDefinition[] = [
  { id: "auto-care", label: "Авто арчилгаа" },
  { id: "travel", label: "Аяллын бараа" },
  { id: "tires", label: "Дугуй" },
  { id: "oils", label: "Тос, тосолгоо" },
  { id: "chemistry", label: "Автохими" },
];

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

export const PRODUCT_BRANDS = [
  "3ton",
  "Brilltex",
  "Deluxe",
  "Europower",
  "Jaytec",
  "Luxe",
  "Mannol",
  "Shell",
  "АЛЯСКА",
];

export const PRICE_FILTER = {
  min: 0,
  max: 900_000,
  step: 1_000,
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "3ton АВТОГЕРМЕТИК-ПРОКЛАДКА СЕРЫЙ",
    brand: "3ton",
    price: 18_500,
    imageUrl: "/shell.png",
    categoryId: "chemistry",
  },
  {
    id: "2",
    name: "3ton АВТОГЕРМЕТИК-ПРОКЛАДКА КРАСНЫЙ",
    brand: "3ton",
    price: 18_500,
    imageUrl: "/luxe.png",
    categoryId: "chemistry",
  },
  {
    id: "3",
    name: "3ton АВТОГЕРМЕТИК-ПРОКЛАДКА ЧЕРНЫЙ",
    brand: "3ton",
    price: 18_500,
    imageUrl: "/mannol.png",
    categoryId: "chemistry",
  },
  {
    id: "4",
    name: "Shell Helix Ultra 5W-40",
    brand: "Shell",
    price: 125_000,
    imageUrl: "/shell.png",
    categoryId: "oils",
  },
  {
    id: "5",
    name: "LUXE Моторын тос 10W-40",
    brand: "Luxe",
    price: 45_000,
    imageUrl: "/luxe.png",
    categoryId: "oils",
  },
  {
    id: "6",
    name: "Mannol Filter Element",
    brand: "Mannol",
    price: 32_000,
    imageUrl: "/mannol.png",
    categoryId: "auto-care",
  },
  {
    id: "7",
    name: "Deluxe Brake Fluid DOT-4",
    brand: "Deluxe",
    price: 22_000,
    imageUrl: "/deluxe.png",
    categoryId: "chemistry",
  },
  {
    id: "8",
    name: "АЛЯСКА Антифриз -40°C",
    brand: "АЛЯСКА",
    price: 38_000,
    imageUrl: "/alyaska.png",
    categoryId: "chemistry",
  },
  {
    id: "9",
    name: "Brilltex Car Shampoo 1L",
    brand: "Brilltex",
    price: 12_500,
    imageUrl: "/deluxe.png",
    categoryId: "auto-care",
  },
];

export function formatPrice(price: number): string {
  return `${price.toLocaleString("mn-MN")}₮`;
}
