export type CmsSectionKey =
  | "about"
  | "auto-news"
  | "lux-news"
  | "legal-advice"
  | "auto-advice"
  | "branch"
  | "brand"
  | "jobs"
  | "procurement"
  | "aurora"
  | "dulguun-restaurant";

export type CmsLayout = "single" | "list" | "grid";

export type CmsSectionConfig = {
  type: string;
  layout: CmsLayout;
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
    title: "Компаний танилцуулга",
    description:
      "2001 оноос хойшхи аяллаа, үнэт зүйлс, алсын хараагаа танд хүргэж байна.",
    metadataTitle: "Бидний тухай",
  },
  "auto-news": {
    type: "auto_news",
    layout: "list",
    postId: "suiqnne9jBihvp3W9rB6q",
    title: "Авто Мэдлэг",
    metadataTitle: "Авто мэдлэг",
  },
  "lux-news": {
    type: "lux_news",
    layout: "grid",
    title: "Lux News",
    metadataTitle: "Lux News",
  },
  "legal-advice": {
    type: "legal_advice",
    layout: "list",
    postId: "1_D4aptOf2X60Q8hOCQDj",
    title: "Хууль Зүйн Зөвлөгөө",
    metadataTitle: "Хууль зүйн зөвлөгөө",
  },
  "auto-advice": {
    type: "auto_advice",
    layout: "list",
    postId: "nfmvrZRl64bi4os5qlxEK",
    title: "Авто Зөвлөгөө",
    metadataTitle: "Авто зөвлөгөө",
  },
  branch: {
    type: "branch",
    layout: "grid",
    postId: "5HTxvJFvSq3CWxV5BDEqb",
    title: "Салбарын байршил",
    description:
      "Манай салбар, агуулахын хаяг, утас болон ажиллах цагийн мэдээлэл.",
    metadataTitle: "Салбарын байршил",
  },
  brand: {
    type: "brand",
    layout: "grid",
    title: "Брэндүүд",
    description:
      "Бидний албан ёсоор төлөөлдөг дэлхийн тэргүүлэгч үйлдвэрлэгчид.",
    metadataTitle: "Брэндүүд",
  },
  jobs: {
    type: "jobs",
    layout: "single",
    postId: "7gfW-J65jwT4hxwolEGgR",
    title: "Ажлын байр",
    description: "Манай багт нэгдэх боломжуудын тухай мэдээлэл.",
    metadataTitle: "Ажлын байр",
  },
  procurement: {
    type: "procurement",
    layout: "single",
    title: "Худалдан авалт",
    description:
      "Бөөний болон жижиглэн худалдааны нөхцөл, бүтээгдэхүүний мэдээлэл.",
    metadataTitle: "Худалдан авалт",
  },
  aurora: {
    type: "aurora",
    layout: "single",
    title: "AURORA HOTEL",
    metadataTitle: "Aurora Hotel",
  },
  "dulguun-restaurant": {
    type: "dulguun_restaurant",
    layout: "single",
    postId: "w8ju0ErksEFrOJqHxjMEb",
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
