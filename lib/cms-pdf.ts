import type { CmsPost } from "@/lib/cms";
import { resolveCmsImageUrl } from "@/lib/cms-image";

function isPdfAsset(
  url?: string | null,
  name?: string | null,
  type?: string | null,
): boolean {
  if (/pdf/i.test(type ?? "")) return true;
  if (/\.pdf$/i.test(name ?? "")) return true;
  if (/\.pdf($|[?#])/i.test(url ?? "")) return true;
  return false;
}

function extractPdfFromHtml(html?: string | null): string {
  if (!html) return "";

  const patterns = [
    /href=["']([^"']+\.pdf[^"']*)["']/i,
    /src=["']([^"']+\.pdf[^"']*)["']/i,
    /(erxes-saas\/[^\s"'<>]+\.pdf)/i,
    /(uploads\/[^\s"'<>]+\.pdf)/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return resolveCmsImageUrl(match[1]);
  }

  return "";
}

function extractPdfFromCustomFields(post: CmsPost): string {
  const values: string[] = [];

  if (Array.isArray(post.customFieldsData)) {
    for (const field of post.customFieldsData) {
      if (field.value) values.push(String(field.value));
    }
  } else if (typeof post.customFieldsData === "string") {
    values.push(post.customFieldsData);
  }

  if (post.customFieldsMap) {
    for (const value of Object.values(post.customFieldsMap)) {
      if (typeof value === "string") values.push(value);
      else if (value && typeof value === "object") {
        values.push(JSON.stringify(value));
      }
    }
  }

  for (const value of values) {
    const match = value.match(
      /(https?:\/\/[^\s"'<>]+\.pdf[^\s"'<>]*|erxes-saas\/[^\s"'<>]+\.pdf|uploads\/[^\s"'<>]+\.pdf)/i,
    );
    if (match?.[1]) return resolveCmsImageUrl(match[1]);
  }

  return "";
}

/** CMS post-ийн PDF хавсралт (images, content, custom field) */
export function extractCmsPostPdfUrl(post: CmsPost): string {
  for (const image of post.images ?? []) {
    if (isPdfAsset(image.url, image.name, image.type)) {
      const url = resolveCmsImageUrl(image.url);
      if (url) return url;
    }
  }

  const fromContent = extractPdfFromHtml(post.content);
  if (fromContent) return fromContent;

  const fromFields = extractPdfFromCustomFields(post);
  if (fromFields) return fromFields;

  return "";
}

export function isCmsPdfAsset(
  url?: string | null,
  name?: string | null,
  type?: string | null,
): boolean {
  return isPdfAsset(url, name, type);
}
