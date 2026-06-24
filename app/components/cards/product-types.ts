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
    | "shortDescription"
    | "description"
    | "specifications"
  >
> {
  images: string[];
  /** Ангилалын ID (CMS slug эсвэл static id) */
  categoryId: string;
  /** CMS categories → Ангилал бүлгийн category ID */
  typeCategoryId?: string;
  /** CMS categories → Ангилалын нэр */
  categoryLabel?: string;
  /** CMS categories → Брэнд бүлгийн category ID */
  brandCategoryId?: string;
  /** CMS custom field → Хэрэглэх заавар */
  usageInstructions?: string;
  usageInstructionsHtml?: string;
  /** CMS custom field → Техник үзүүлэлт */
  specificationsHtml?: string;
}

export interface ProductBrandFilter {
  id: string;
  label: string;
  count: number;
}

export interface ProductCategory {
  id: string;
  label: string;
  count: number;
}

export interface ProductCategoryDefinition {
  id: ProductCategoryId;
  label: string;
}

export interface CategoryCountFilters {
  nameQuery: string;
  selectedBrandId: string | null;
  priceValue: number;
}
