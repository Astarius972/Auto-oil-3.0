// src/data/newsData.ts

export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  fullContent: string;
};

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Хятадын Tencent Америкийн Tesla-гийн 5 хувийг худалдаж авлаа",
    excerpt: "Хятадын сошиал сүлжээний хамгийн том платформыг эзэмшигч...",
    imageUrl: "/images/tesla.jpg",
    fullContent: "Энд бүх дэлгэрэнгүй мэдээлэл орно...",
  },
  {
    id: 2,
    title: "Б.МӨНХЖАРГАЛ: ТЭЭВРИЙН ХЭРЭГСЛИЙН ТҮҮХИЙГ...",
    excerpt: "Орон нутагт авто үйлчилгээний ангилал тогтоож эхэлсэнтэй...",
    imageUrl: "/images/monkhjargal.jpg",
    fullContent: "Ярилцлагын дэлгэрэнгүй мэдээлэл энд байна...",
  },
];
