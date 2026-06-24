import type { CmsSectionKey } from "@/lib/cms-config";

export const CMS_NEWS_SECTIONS = [
  "lux-news",
  "auto-news",
  "auto-advice",
  "legal-advice",
] as const;

export type CmsNewsSectionKey = (typeof CMS_NEWS_SECTIONS)[number];

export function isCmsNewsSection(
  section: CmsSectionKey,
): section is CmsNewsSectionKey {
  return CMS_NEWS_SECTIONS.includes(section as CmsNewsSectionKey);
}

export function getCmsNewsBasePath(section: CmsNewsSectionKey): string {
  return `/${section}`;
}
