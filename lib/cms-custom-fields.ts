export type CmsCustomField = {
  field?: string | null;
  value?: string | null;
};

export type CmsCustomFieldsMap = Record<string, unknown>;

function normalizeCustomFieldsData(
  data: CmsCustomField[] | string | null | undefined,
): CmsCustomField[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data) as unknown;
      return Array.isArray(parsed) ? (parsed as CmsCustomField[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function getCustomField(
  post: {
    customFieldsData?: CmsCustomField[] | string | null;
    customFieldsMap?: CmsCustomFieldsMap | null;
  },
  fieldId: string,
): string {
  const fields = normalizeCustomFieldsData(post.customFieldsData);
  const fromData = fields.find((item) => item.field === fieldId)?.value;

  if (fromData) return String(fromData).trim();

  const fromMap = post.customFieldsMap?.[fieldId];
  if (typeof fromMap === "string") return fromMap.trim();
  if (fromMap && typeof fromMap === "object") {
    const nested = Object.values(fromMap as Record<string, unknown>).find(
      (value) => typeof value === "string" && value.trim(),
    );
    if (typeof nested === "string") return nested.trim();
  }

  return "";
}

export function cleanBranchAddress(value: string): string {
  return value
    .replace(/^\s*Address\s*/i, "")
    .replace(/^\s*Хаяг\s*:?\s*/i, "")
    .trim();
}
