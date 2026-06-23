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
};

/** CMS branch post custom field IDs */
export const BRANCH_FIELD_IDS = {
  address: "field_1782103005140",
  phone: "field_1782104164829",
  schedule: "field_1782104182935",
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

export function mapCmsPostToBranchCard(post: CmsPost): BranchCardData {
  const addressFromField = cleanBranchAddress(
    getCustomField(post, BRANCH_FIELD_IDS.address),
  );
  const phoneFromField = getCustomField(post, BRANCH_FIELD_IDS.phone);
  const scheduleFromField = getCustomField(post, BRANCH_FIELD_IDS.schedule);

  const content = post.content ?? "";

  const imageUrl = getCmsPostCoverUrl(post);

  return {
    id: post._id,
    title: post.title,
    imageUrl,
    address:
      addressFromField ||
      cleanBranchAddress(post.excerpt ?? "") ||
      extractField(content, ["Хаяг", "Address"]),
    phone: phoneFromField || extractField(content, ["Утас", "Phone"]),
    schedule:
      scheduleFromField ||
      extractField(content, ["Цагийн хуваарь", "Schedule"]),
  };
}
