import type { Brand } from "@/app/components/cards/brand-data";
import type { CmsPost } from "@/lib/cms";
import { fetchCmsPostsRaw, fetchCmsPost } from "@/lib/cms";
import { getCustomField } from "@/lib/cms-custom-fields";
import {
  resolveCmsHtmlContent,
  resolveCmsImageUrl,
} from "@/lib/cms-image";
import { extractCmsPostPdfUrl, isCmsPdfAsset } from "@/lib/cms-pdf";

export const CMS_BRAND_TYPE = "brand";

/** CMS brand post custom field IDs (optional) */
export const BRAND_FIELD_IDS = {
  scribdDocumentId: "field_scribd_document_id",
  scribdSecretPassword: "field_scribd_secret_password",
} as const;

/** LUXE хуучин Scribd каталог — CMS PDF байхгүй үед fallback */
const LUXE_SCRIBD_FALLBACK = {
  documentId: "350802711",
  secretPassword: "Kgq86RcgHDlXk6HjFFgP",
} as const;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getGalleryImages(post: CmsPost, coverUrl: string): string[] {
  const images = (post.images ?? [])
    .filter((image) => !isCmsPdfAsset(image.url, image.name, image.type))
    .map((image) => resolveCmsImageUrl(image.url))
    .filter((url) => url.length > 0);

  if (images.length === 0) return [];

  const unique = [...new Set(images)];
  if (coverUrl && unique.length > 1) {
    return unique.filter((url) => url !== coverUrl);
  }

  return unique;
}

function getBrandCoverUrl(post: CmsPost): string {
  const thumbnail = resolveCmsImageUrl(post.thumbnail?.url);
  if (thumbnail) return thumbnail;

  for (const image of post.images ?? []) {
    if (isCmsPdfAsset(image.url, image.name, image.type)) continue;
    const url = resolveCmsImageUrl(image.url);
    if (url) return url;
  }

  return "";
}

export function mapCmsPostToBrand(post: CmsPost): Brand | null {
  const slug = post.slug?.trim();
  if (!slug) return null;

  const imageUrl = getBrandCoverUrl(post);
  if (!imageUrl) return null;

  const pdfUrl = extractCmsPostPdfUrl(post);
  const galleryImages = getGalleryImages(post, imageUrl);
  const content = post.content?.trim() ?? "";
  const hasHtmlContent = /<[a-z][\s\S]*>/i.test(content);

  let scribdDocumentId =
    getCustomField(post, BRAND_FIELD_IDS.scribdDocumentId) || undefined;
  let scribdSecretPassword =
    getCustomField(post, BRAND_FIELD_IDS.scribdSecretPassword) || undefined;

  if (
    !pdfUrl &&
    !scribdDocumentId &&
    slug.toLowerCase() === "luxe"
  ) {
    scribdDocumentId = LUXE_SCRIBD_FALLBACK.documentId;
    scribdSecretPassword = LUXE_SCRIBD_FALLBACK.secretPassword;
  }

  return {
    slug,
    name: post.title,
    imageUrl,
    description:
      post.excerpt?.trim() ||
      (hasHtmlContent ? stripHtml(content) : content) ||
      "",
    contentHtml: hasHtmlContent ? resolveCmsHtmlContent(content) : undefined,
    galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
    pdfUrl: pdfUrl || undefined,
    scribdDocumentId,
    scribdSecretPassword,
  };
}

export async function fetchCmsBrands(): Promise<Brand[]> {
  const posts = await fetchCmsPostsRaw({ type: CMS_BRAND_TYPE });
  return posts
    .map((post) => mapCmsPostToBrand(post))
    .filter((brand): brand is Brand => brand !== null);
}

export async function fetchCmsBrandBySlug(
  slug: string,
): Promise<Brand | null> {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  const posts = await fetchCmsPostsRaw({ type: CMS_BRAND_TYPE });
  const post =
    posts.find(
      (item) => item.slug?.trim().toLowerCase() === normalizedSlug,
    ) ?? null;

  if (post) return mapCmsPostToBrand(post);

  const fallback = await fetchCmsPost({ type: CMS_BRAND_TYPE, slug });
  if (!fallback) return null;
  return mapCmsPostToBrand(fallback);
}
