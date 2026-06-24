const DEFAULT_ERXES_URL = "https://autooilnew.next.erxes.io";

function getErxesBaseUrl() {
  return (
    process.env.ERXES_API_URL ||
    process.env.NEXT_PUBLIC_ERXES_API_URL ||
    DEFAULT_ERXES_URL
  ).replace(/\/$/, "");
}

/**
 * Erxes CMS-ийн зураг буцаадаг 3 хэлбэр:
 * 1. Зөвхөн key: "uploads/abc.jpg"
 * 2. read-file URL: "https://domain/gateway/read-file?key=uploads/abc.jpg"
 * 3. Бүтэн CDN URL
 *
 * Бүх тохиолдолд зөв нэг URL болгоно.
 */
export function resolveCmsImageUrl(raw?: string | null): string {
  if (!raw) return "";

  const value = raw.trim();
  if (!value) return "";

  // Лokal static файл
  if (value.startsWith("/")) return value;

  const baseUrl = getErxesBaseUrl();

  // Бүтэн URL
  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      const url = new URL(value);

      if (url.pathname.includes("/gateway/read-file")) {
        return value;
      }

      const key = url.searchParams.get("key");
      if (key) {
        return `${baseUrl}/gateway/read-file?key=${encodeURIComponent(key)}`;
      }

      return value;
    } catch {
      return value;
    }
  }

  // Зөвхөн key
  return `${baseUrl}/gateway/read-file?key=${encodeURIComponent(value)}`;
}

type CmsPostCoverSource = {
  thumbnail?: { url?: string | null } | null;
  images?: Array<{ url?: string | null }> | null;
};

/** CMS post-ийн Cover (thumbnail), байхгүй бол gallery-ийн эхний зураг */
export function getCmsPostCoverUrl(post?: CmsPostCoverSource | null): string {
  if (!post) return "";
  return resolveCmsImageUrl(post.thumbnail?.url ?? post.images?.[0]?.url);
}

type CmsPostGallerySource = {
  title?: string | null;
  thumbnail?: { url?: string | null } | null;
  images?: Array<{
    url?: string | null;
    name?: string | null;
    type?: string | null;
  }> | null;
};

/** Cover + gallery зургуудыг давхардалгүй нэгтгэнэ */
export function getCmsPostGalleryImages(
  post?: CmsPostGallerySource | null,
): Array<{ url: string; alt: string }> {
  if (!post) return [];

  const gallery: Array<{ url: string; alt: string }> = [];
  const seen = new Set<string>();

  const addImage = (raw?: string | null, alt?: string | null) => {
    const url = resolveCmsImageUrl(raw);
    if (!url || seen.has(url)) return;
    seen.add(url);
    gallery.push({
      url,
      alt: alt?.trim() || post.title?.trim() || "Зураг",
    });
  };

  addImage(post.thumbnail?.url, post.title);
  for (const image of post.images ?? []) {
    addImage(image.url, image.name);
  }

  return gallery;
}

/** HTML content доторх img src-ийг засна */
export function resolveCmsHtmlContent(html?: string | null): string {
  if (!html) return "";

  return html.replace(
    /(<img[^>]+src=["'])([^"']+)(["'])/gi,
    (_match, prefix, src, suffix) =>
      `${prefix}${resolveCmsImageUrl(src)}${suffix}`,
  );
}
