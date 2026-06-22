export type CmsSectionKey =
  | "about"
  | "auto-news"
  | "lux-news"
  | "legal-advice"
  | "auto-advice"
  | "branch"
  | "contact"
  | "jobs"
  | "procurement"
  | "aurora"
  | "dulguun-restaurant";

export type CmsLayout = "single" | "list" | "grid";

export type CmsSectionConfig = {
  type: string;
  layout: CmsLayout;
  eyebrow: string;
  title: string;
  description?: string;
  metadataTitle: string;
  /** Тодорхой нэг CMS post ID-аар татах (optional) */
  postId?: string;
};

/**
 * CMS Posts type бүр сайтын хуудстай таарна.
 * Post үүсгэх: /content/cms/.../posts/add?type={type}
 */
export const CMS_SECTIONS: Record<CmsSectionKey, CmsSectionConfig> = {
  about: {
    type: "about",
    layout: "single",
    eyebrow: "Бидний тухай",
    title: "Компаний танилцуулга",
    description:
      "2001 оноос хойшхи аяллаа, үнэт зүйлс, алсын хараагаа танд хүргэж байна.",
    metadataTitle: "Бидний тухай",
  },
  "auto-news": {
    type: "auto-news",
    layout: "list",
    eyebrow: "Мэдээ мэдээлэл",
    title: "Авто Мэдлэг",
    metadataTitle: "Авто мэдлэг",
  },
  "lux-news": {
    type: "lux-news",
    layout: "list",
    eyebrow: "Мэдээ мэдээлэл",
    title: "Lux News",
    metadataTitle: "Lux News",
  },
  "legal-advice": {
    type: "legal-advice",
    layout: "list",
    eyebrow: "Зөвлөгөө",
    title: "Хууль Зүйн Зөвлөгөө",
    metadataTitle: "Хууль зүйн зөвлөгөө",
  },
  "auto-advice": {
    type: "auto-advice",
    layout: "list",
    eyebrow: "Зөвлөгөө",
    title: "Авто Зөвлөгөө",
    metadataTitle: "Авто зөвлөгөө",
  },
  branch: {
    type: "branch",
    layout: "grid",
    postId: "5HTxvJFvSq3CWxV5BDEqb",
    eyebrow: "Бидэнтэй уулзах",
    title: "Салбарын байршил",
    description:
      "Манай салбар, агуулахын хаяг, утас болон ажиллах цагийн мэдээлэл.",
    metadataTitle: "Салбарын байршил",
  },
  contact: {
    type: "contact",
    layout: "single",
    eyebrow: "Холбоо барих",
    title: "Бидэнтэй холбогдох",
    description:
      "Асуулт, санал хүсэлт байвал доорх мэдээллээр бидэнтэй холбогдоно уу.",
    metadataTitle: "Холбоо барих",
  },
  jobs: {
    type: "jobs",
    layout: "single",
    postId: "7gfW-J65jwT4hxwolEGgR",
    eyebrow: "Карьер",
    title: "Ажлын байр",
    description: "Манай багт нэгдэх боломжуудын тухай мэдээлэл.",
    metadataTitle: "Ажлын байр",
  },
  procurement: {
    type: "procurement",
    layout: "single",
    eyebrow: "Үйлчилгээ",
    title: "Худалдан авалт",
    description:
      "Бөөний болон жижиглэн худалдааны нөхцөл, бүтээгдэхүүний мэдээлэл.",
    metadataTitle: "Худалдан авалт",
  },
  aurora: {
    type: "aurora",
    layout: "single",
    eyebrow: "Зочид буудал",
    title: "AURORA HOTEL",
    metadataTitle: "Aurora Hotel",
  },
  "dulguun-restaurant": {
    type: "dulguun-restaurant",
    layout: "list",
    eyebrow: "Зоог, үйлчилгээ",
    title: "Дөлгөөн Ресторан",
    metadataTitle: "Дөлгөөн ресторан",
  },
};

// Backward-compatible filter helper
export type CmsSectionFilter = {
  type?: string;
  categoryIds?: string[];
  slug?: string;
  postId?: string;
};

export const CMS_SECTION_FILTERS: Record<CmsSectionKey, CmsSectionFilter> =
  Object.fromEntries(
    Object.entries(CMS_SECTIONS).map(([key, section]) => [
      key,
      { type: section.type, postId: section.postId },
    ]),
  ) as Record<CmsSectionKey, CmsSectionFilter>;
