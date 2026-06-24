import type { Product } from "@/app/components/cards/product-types";
import type { CmsPost } from "@/lib/cms";
import { fetchCmsPostsRaw, fetchCmsPost } from "@/lib/cms";
import { getCustomField } from "@/lib/cms-custom-fields";
import { cmsCategories } from "@/graphql/queries";
import { apolloClient } from "@/lib/apollo-client";
import {
  getCmsPostCoverUrl,
  resolveCmsHtmlContent,
  resolveCmsImageUrl,
} from "@/lib/cms-image";

export const CMS_PRODUCT_TYPE = "product";

export type CmsCategoryNode = {
  _id: string;
  name: string;
  slug: string;
  parentId?: string | null;
};

export type CmsFilterCategory = {
  id: string;
  label: string;
  slug: string;
};

type CategoryGroupMaps = {
  angilalParentId: string | null;
  brendParentId: string | null;
  typeCategoryIds: Set<string>;
  brandCategoryIds: Set<string>;
  byId: Map<string, CmsCategoryNode>;
};

export const PRODUCT_FIELD_IDS = {
  brand: "field_product_brand",
  price: "field_1782270417757",
  categoryId: "field_product_category",
  specifications: "field_1782276039924",
  usageInstructions: "field_1782275975825",
} as const;

const USAGE_INSTRUCTION_FIELD_IDS = [
  PRODUCT_FIELD_IDS.usageInstructions,
  "field_product_usage_instructions",
  "field_product_heregleh_zaavar",
] as const;

const SPECIFICATION_FIELD_IDS = [
  PRODUCT_FIELD_IDS.specifications,
  "field_product_specifications",
  "field_product_technical_specifications",
] as const;

const LEGACY_PRICE_FIELD_IDS = [
  PRODUCT_FIELD_IDS.price,
  "field_product_price",
] as const;

const FALLBACK_DESCRIPTION =
  "Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл удахгүй нэмэгдэнэ.";

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+\n/g, "\n")
    .trim();
}

function extractField(html: string, labels: string[]): string {
  for (const label of labels) {
    const patterns = [
      new RegExp(`<strong>${label}:?</strong>\\s*([^<]+)`, "i"),
      new RegExp(`${label}:?\\s*</strong>\\s*([^<]+)`, "i"),
      new RegExp(`${label}:?\\s*([^<\\n]+)`, "i"),
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]?.trim()) return match[1].trim();
    }
  }

  return "";
}

function parsePrice(value: string): number {
  const digits = value.replace(/[^\d]/g, "");
  const parsed = Number(digits);
  return Number.isFinite(parsed) ? parsed : 0;
}

type CmsPostCategory = NonNullable<CmsPost["categories"]>[number];

type CmsCategoriesData = {
  cpCategories?: {
    list?: CmsCategoryNode[];
  };
};

export async function fetchCmsCategoryTree(): Promise<CmsCategoryNode[]> {
  try {
    const { data } = await apolloClient.query<CmsCategoriesData>({
      query: cmsCategories,
      fetchPolicy: "no-cache",
    });
    return data?.cpCategories?.list ?? [];
  } catch (error) {
    console.error("Failed to fetch CMS categories:", error);
    return [];
  }
}

function buildCategoryGroupMaps(tree: CmsCategoryNode[]): CategoryGroupMaps {
  const byId = new Map(tree.map((category) => [category._id, category]));
  const angilalParent =
    tree.find((category) => category.slug === "angilal") ??
    tree.find((category) => category.name.toLowerCase() === "ангилал") ??
    null;
  const brendParent =
    tree.find((category) => category.slug === "brend") ??
    tree.find((category) => category.name.toLowerCase() === "брэнд") ??
    null;

  const typeCategoryIds = new Set(
    tree
      .filter((category) => category.parentId === angilalParent?._id)
      .map((category) => category._id),
  );
  const brandCategoryIds = new Set(
    tree
      .filter((category) => category.parentId === brendParent?._id)
      .map((category) => category._id),
  );

  return {
    angilalParentId: angilalParent?._id ?? null,
    brendParentId: brendParent?._id ?? null,
    typeCategoryIds,
    brandCategoryIds,
    byId,
  };
}

export async function fetchCmsAngilalCategories(): Promise<CmsFilterCategory[]> {
  const tree = await fetchCmsCategoryTree();
  const { typeCategoryIds, byId } = buildCategoryGroupMaps(tree);

  return [...typeCategoryIds]
    .map((id) => {
      const category = byId.get(id);
      if (!category) return null;
      return {
        id: category._id,
        label: category.name,
        slug: category.slug,
      };
    })
    .filter((category): category is CmsFilterCategory => category !== null)
    .sort((a, b) => a.label.localeCompare(b.label, "mn"));
}

export async function fetchCmsBrandCategories(): Promise<CmsFilterCategory[]> {
  const tree = await fetchCmsCategoryTree();
  const { brandCategoryIds, byId } = buildCategoryGroupMaps(tree);

  return [...brandCategoryIds]
    .map((id) => {
      const category = byId.get(id);
      if (!category) return null;
      return {
        id: category._id,
        label: category.name,
        slug: category.slug,
      };
    })
    .filter((category): category is CmsFilterCategory => category !== null)
    .sort((a, b) => a.label.localeCompare(b.label, "mn"));
}

function getBrandCategory(
  categories: CmsPostCategory[] | null | undefined,
  groups: CategoryGroupMaps,
): CmsPostCategory | null {
  if (!categories?.length) return null;
  return categories.find((category) => groups.brandCategoryIds.has(category._id)) ?? null;
}

function getProductTypeCategory(
  categories: CmsPostCategory[] | null | undefined,
  groups: CategoryGroupMaps,
): CmsPostCategory | null {
  if (!categories?.length) return null;
  return categories.find((category) => groups.typeCategoryIds.has(category._id)) ?? null;
}

function getGalleryImages(post: CmsPost, coverUrl: string): string[] {
  const images = (post.images ?? [])
    .map((image) => resolveCmsImageUrl(image.url))
    .filter((url) => url.length > 0);

  if (images.length === 0) {
    return coverUrl ? [coverUrl] : [];
  }

  const unique = [...new Set(images)];
  if (coverUrl && !unique.includes(coverUrl)) {
    return [coverUrl, ...unique];
  }

  return unique;
}

function getProductPriceValue(post: CmsPost, content: string): string {
  for (const fieldId of LEGACY_PRICE_FIELD_IDS) {
    const value = getCustomField(post, fieldId);
    if (value) return value;
  }

  const fields = post.customFieldsData;
  if (Array.isArray(fields)) {
    for (const item of fields) {
      const value = item.value?.trim();
      if (value && /\d/.test(value)) return value;
    }
  }

  return extractField(content, ["Үнэ", "Price"]);
}

function getUsageInstructionsValue(post: CmsPost): string {
  for (const fieldId of USAGE_INSTRUCTION_FIELD_IDS) {
    const value = getCustomField(post, fieldId);
    if (value) return value;
  }
  return "";
}

function getSpecificationsValue(post: CmsPost, brand: string, content: string): string {
  for (const fieldId of SPECIFICATION_FIELD_IDS) {
    const value = getCustomField(post, fieldId);
    if (value) return value;
  }

  return (
    extractField(content, ["Техник үзүүлэлт", "Specifications"]) ||
    `Брэнд: ${brand}`
  );
}

export function mapCmsPostToProduct(
  post: CmsPost,
  groups: CategoryGroupMaps,
): Product | null {
  const id = post.slug?.trim() || post._id;
  if (!id) return null;

  const imageUrl = getCmsPostCoverUrl(post);
  if (!imageUrl) return null;

  const content = post.content?.trim() ?? "";
  const plainContent = stripHtml(content);

  const brandCategory = getBrandCategory(post.categories, groups);
  const typeCategory = getProductTypeCategory(post.categories, groups);

  const brand =
    brandCategory?.name?.trim() ||
    getCustomField(post, PRODUCT_FIELD_IDS.brand) ||
    extractField(content, ["Брэнд", "Brand"]) ||
    "Бусад";

  const price = parsePrice(getProductPriceValue(post, content));

  const categorySlug =
    typeCategory?.slug?.trim() ||
    getCustomField(post, PRODUCT_FIELD_IDS.categoryId) ||
    extractField(content, ["Ангилал", "Category"]) ||
    "oils";

  const specificationsRaw = getSpecificationsValue(post, brand, content);
  const specificationsHasHtml = /<[a-z][\s\S]*>/i.test(specificationsRaw);

  const shortDescription =
    post.excerpt?.trim() || plainContent.split("\n")[0] || FALLBACK_DESCRIPTION;

  const description = plainContent || shortDescription;

  const usageInstructionsRaw =
    getUsageInstructionsValue(post) || description;
  const usageInstructionsHasHtml = /<[a-z][\s\S]*>/i.test(usageInstructionsRaw);

  const images = getGalleryImages(post, imageUrl);

  return {
    id,
    name: post.title,
    brand,
    brandCategoryId: brandCategory?._id,
    price,
    imageUrl,
    categoryId: categorySlug,
    typeCategoryId: typeCategory?._id,
    categoryLabel: typeCategory?.name?.trim(),
    shortDescription,
    description,
    specifications: specificationsHasHtml
      ? stripHtml(specificationsRaw)
      : specificationsRaw,
    specificationsHtml: specificationsHasHtml
      ? resolveCmsHtmlContent(specificationsRaw)
      : undefined,
    usageInstructions: usageInstructionsHasHtml
      ? stripHtml(usageInstructionsRaw)
      : usageInstructionsRaw,
    usageInstructionsHtml: usageInstructionsHasHtml
      ? resolveCmsHtmlContent(usageInstructionsRaw)
      : undefined,
    images,
  };
}

export async function fetchCmsProducts(): Promise<Product[]> {
  const [posts, tree] = await Promise.all([
    fetchCmsPostsRaw({ type: CMS_PRODUCT_TYPE }),
    fetchCmsCategoryTree(),
  ]);
  const groups = buildCategoryGroupMaps(tree);
  return posts
    .map((post) => mapCmsPostToProduct(post, groups))
    .filter((product): product is Product => product !== null);
}

async function getCategoryGroupsForPosts(): Promise<CategoryGroupMaps> {
  const tree = await fetchCmsCategoryTree();
  return buildCategoryGroupMaps(tree);
}

export async function fetchCmsProductById(id: string): Promise<Product | null> {
  const normalizedId = decodeURIComponent(id).trim();

  const [posts, groups] = await Promise.all([
    fetchCmsPostsRaw({ type: CMS_PRODUCT_TYPE }),
    getCategoryGroupsForPosts(),
  ]);
  const bySlug = posts.find(
    (post) =>
      post.slug?.trim() === normalizedId || post._id === normalizedId,
  );
  if (bySlug) return mapCmsPostToProduct(bySlug, groups);

  const byDetail = await fetchCmsPost({
    type: CMS_PRODUCT_TYPE,
    slug: normalizedId,
  });
  if (byDetail) return mapCmsPostToProduct(byDetail, groups);

  const byPostId = await fetchCmsPost({
    type: CMS_PRODUCT_TYPE,
    postId: normalizedId,
  });
  if (byPostId) return mapCmsPostToProduct(byPostId, groups);

  return null;
}
