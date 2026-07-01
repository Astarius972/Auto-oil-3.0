import type { CmsPost } from "@/lib/cms";
import { cleanBranchAddress, getCustomField } from "@/lib/cms-custom-fields";
import { getCmsPostCoverUrl } from "@/lib/cms-image";

export type BranchCardData = {
  id: string;
  title: string;
  imageUrl: string;
  address: string;
  phone: string;
  schedule: string;
  locationUrl: string;
  lat: number | null;
  lng: number | null;
};

/** CMS branch post custom field IDs (erxes content → branch type) */
export const BRANCH_FIELD_IDS = {
  address: "field_1782910054544",
  schedule: "field_1782910016784",
  phone: "field_1782910040699",
  locationUrl: "field_1782911090247",
  latitude: "field_1782911916544",
  longitude: "field_1782911931134",
} as const;

function extractField(html: string, labels: string[]): string {
  for (const label of labels) {
    const patterns = [
      new RegExp(`<strong>${label}:?</strong>\\s*([^<]+)`, "i"),
      new RegExp(`${label}:?\\s*</strong>\\s*([^<]+)`, "i"),
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]?.trim()) return match[1].trim();
    }
  }

  return "";
}

function findCustomFieldByHint(
  post: CmsPost,
  hints: string[],
): string {
  const fields = Array.isArray(post.customFieldsData)
    ? post.customFieldsData
    : [];

  for (const item of fields) {
    const fieldId = item.field?.toLowerCase() ?? "";
    if (hints.some((hint) => fieldId.includes(hint))) {
      const value = item.value?.trim();
      if (value) return value;
    }
  }

  return "";
}

export function mapCmsPostToBranchCard(post: CmsPost): Omit<
  BranchCardData,
  "lat" | "lng"
> {
  const addressFromField = cleanBranchAddress(
    getCustomField(post, BRANCH_FIELD_IDS.address) ||
      findCustomFieldByHint(post, ["address", "хаяг"]),
  );
  const phoneFromField = (
    getCustomField(post, BRANCH_FIELD_IDS.phone) ||
    findCustomFieldByHint(post, ["phone", "утас"])
  ).replace(/^\s+/, "");
  const scheduleFromField =
    getCustomField(post, BRANCH_FIELD_IDS.schedule) ||
    findCustomFieldByHint(post, ["schedule", "цаг"]);
  const locationUrlFromField =
    getCustomField(post, BRANCH_FIELD_IDS.locationUrl) ||
    findCustomFieldByHint(post, ["location", "url", "map", "байршил"]);

  const content = post.content ?? "";

  return {
    id: post._id,
    title: post.title,
    imageUrl: getCmsPostCoverUrl(post),
    address:
      addressFromField ||
      cleanBranchAddress(post.excerpt ?? "") ||
      extractField(content, ["Хаяг", "Address"]),
    phone: phoneFromField || extractField(content, ["Утас", "Phone"]),
    schedule:
      scheduleFromField ||
      extractField(content, ["Цагийн хуваарь", "Schedule"]),
    locationUrl: locationUrlFromField,
  };
}

function parseCoordinate(value: string): number | null {
  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : null;
}

export function mapCmsPostToBranchLocation(post: CmsPost): BranchCardData {
  const branch = mapCmsPostToBranchCard(post);
  const latitude =
    getCustomField(post, BRANCH_FIELD_IDS.latitude) ||
    findCustomFieldByHint(post, ["latitude", "lat"]);
  const longitude =
    getCustomField(post, BRANCH_FIELD_IDS.longitude) ||
    findCustomFieldByHint(post, ["longitude", "lng", "lon"]);

  return {
    ...branch,
    lat: latitude ? parseCoordinate(latitude) : null,
    lng: longitude ? parseCoordinate(longitude) : null,
  };
}

export function mapCmsPostsToBranchLocations(
  posts: CmsPost[],
): BranchCardData[] {
  return posts
    .map((post) => mapCmsPostToBranchLocation(post))
    .filter((branch) => branch.address.trim().length > 0);
}
