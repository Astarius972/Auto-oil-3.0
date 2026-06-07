export const PRODUCT_CATEGORY_IDS = [
  "auto-care",
  "travel",
  "tires",
  "oils",
  "chemistry",
] as const;

export type ProductCategoryId = (typeof PRODUCT_CATEGORY_IDS)[number];

export interface ProductInput {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  categoryId: ProductCategoryId;
  shortDescription?: string;
  description?: string;
  specifications?: string;
  images?: string[];
}

export interface Product extends Required<
  Pick<
    ProductInput,
    | "id"
    | "name"
    | "brand"
    | "price"
    | "imageUrl"
    | "categoryId"
    | "shortDescription"
    | "description"
    | "specifications"
  >
> {
  images: string[];
}

export interface ProductCategory {
  id: ProductCategoryId;
  label: string;
  count: number;
}

export interface ProductCategoryDefinition {
  id: ProductCategoryId;
  label: string;
}

export interface CategoryCountFilters {
  nameQuery: string;
  selectedBrand: string | null;
  priceValue: number;
}
