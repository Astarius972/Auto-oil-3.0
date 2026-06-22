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

/** HTML content доторх img src-ийг засна */
export function resolveCmsHtmlContent(html?: string | null): string {
  if (!html) return "";

  return html.replace(
    /(<img[^>]+src=["'])([^"']+)(["'])/gi,
    (_match, prefix, src, suffix) =>
      `${prefix}${resolveCmsImageUrl(src)}${suffix}`,
  );
}
