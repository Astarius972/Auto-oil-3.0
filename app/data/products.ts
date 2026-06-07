import type { ProductInput } from "../components/cards/product-types";

/**
 * ADD NEW PRODUCTS HERE
 * ---------------------
 * 1. Copy PRODUCT_TEMPLATE below into PRODUCT_ENTRIES.
 * 2. Put your image in the /public folder (example: /public/products/my-item.jpg).
 * 3. Use imageUrl: "/products/my-item.jpg".
 * 4. Pick a unique id (example: "shell-helix-5w40").
 * 5. Set categoryId to one of:
 *    - "auto-care"   → Авто арчилгаа
 *    - "travel"      → Аяллын бараа
 *    - "tires"       → Дугуй
 *    - "oils"        → Тос, тосолгоо
 *    - "chemistry"   → Автохими
 *
 * Optional fields (can be removed):
 * - shortDescription → shown on product detail page
 * - description      → "Барааны мэдээлэл" tab
 * - specifications   → "Техник үзүүлэлт" tab
 * - images           → extra gallery images
 *
 * Brands and category counts update automatically.
 * Price filter max also updates automatically from your prices.
 */

export const PRODUCT_TEMPLATE: ProductInput = {
  id: "unique-product-id",
  name: "Бүтээгдэхүүний нэр",
  brand: "Brand name",
  price: 10_000,
  imageUrl: "/products/your-image.jpg",
  categoryId: "oils",
  shortDescription: "Short summary shown near the price.",
  description: "Full product information for the detail page.",
  specifications: "Brand: Example\nType: Oil\nSize: 4L",
  images: ["/products/your-image.jpg"],
};

const DEFAULT_DESCRIPTION =
  "Автомашины хөдөлгүүр, хурдны хайрцаг, картер, гидроус, карбюратор, радиатор, ус насос, шүршүүр, шингэн дулаах системд ашиглана. Температур -50°C-ээс +300°C хүртэл ажиллана.";

export const PRODUCT_ENTRIES: ProductInput[] = [
  {
    id: "3ton-gasket-gray",
    name: "3ton АВТОГЕРМЕТИК-ПРОКЛАДКА СЕРЫЙ ТЕРМОСТОЙКИЙ / ГЕРМЕТИК",
    brand: "3ton",
    price: 18_500,
    imageUrl: "/shell.png",
    categoryId: "chemistry",
    shortDescription: DEFAULT_DESCRIPTION,
    description:
      "Автомашины хөдөлгүүр, хурдны хайрцаг, картер, гидроус, карбюратор, радиатор, ус насос, шүршүүр, шингэн дулаах системд ашиглана. Температур -50°C-ээс +300°C хүртэл ажиллана. Хэрэглэхийн өмнө гадаргууг цэвэрлэж, өргөсгөлтгүй болгох шаардлагатай.",
    specifications:
      "Брэнд: 3ton\nТөрөл: Автогерметик\nӨнгө: Саарал\nТемператур: -50°C ~ +300°C\nХэрэглээ: Хөдөлгүүр, хурдны хайрцаг, радиатор",
    images: ["/shell.png", "/luxe.png"],
  },
  {
    id: "3ton-gasket-red",
    name: "3ton АВТОГЕРМЕТИК-ПРОКЛАДКА КРАСНЫЙ",
    brand: "3ton",
    price: 18_500,
    imageUrl: "/luxe.png",
    categoryId: "chemistry",
    shortDescription: DEFAULT_DESCRIPTION,
    description: DEFAULT_DESCRIPTION,
    specifications:
      "Брэнд: 3ton\nТөрөл: Автогерметик\nӨнгө: Улаан\nТемператур: -50°C ~ +300°C",
  },
  {
    id: "3ton-gasket-black",
    name: "3ton АВТОГЕРМЕТИК-ПРОКЛАДКА ЧЕРНЫЙ",
    brand: "3ton",
    price: 18_500,
    imageUrl: "/mannol.png",
    categoryId: "chemistry",
    shortDescription: DEFAULT_DESCRIPTION,
    description: DEFAULT_DESCRIPTION,
    specifications:
      "Брэнд: 3ton\nТөрөл: Автогерметик\nӨнгө: Хар\nТемператур: -50°C ~ +300°C",
  },
  {
    id: "shell-helix-ultra-5w40",
    name: "Shell Helix Ultra 5W-40",
    brand: "Shell",
    price: 125_000,
    imageUrl: "/shell.png",
    categoryId: "oils",
    shortDescription:
      "Өндөр гүйцэтгэлтэй синтетик моторын тос. Хөдөлгүүрийг бүрэн хамгаалж, түлшний хэмнэлтийг сайжруулна.",
    description:
      "Shell Helix Ultra 5W-40 нь хөдөлгүүрийн эд ангийг цэвэр байлгаж, өргөөн температурын нөхцөлд тогтвортой ажиллана.",
    specifications: "Брэнд: Shell\nЗагвар: 5W-40\nТөрөл: Синтетик моторын тос",
  },
  {
    id: "luxe-motor-oil-10w40",
    name: "LUXE Моторын тос 10W-40",
    brand: "Luxe",
    price: 45_000,
    imageUrl: "/luxe.png",
    categoryId: "oils",
    shortDescription: "LUXE брэндийн өндөр чанарын моторын тос.",
    description:
      "Бүх төрлийн бензин болон дизель хөдөлгүүрийн автомашинд тохиромжтой.",
    specifications: "Брэнд: Luxe\nЗагвар: 10W-40",
  },
  {
    id: "mannol-filter-element",
    name: "Mannol Filter Element",
    brand: "Mannol",
    price: 32_000,
    imageUrl: "/mannol.png",
    categoryId: "auto-care",
    shortDescription: "Mannol брэндийн шүүлтүүрийн элемент.",
    description: "Автомашины шүүлтүүр солиход ашиглах сэлбэг.",
    specifications: "Брэнд: Mannol\nТөрөл: Шүүлтүүр",
  },
  {
    id: "deluxe-brake-fluid-dot4",
    name: "Deluxe Brake Fluid DOT-4",
    brand: "Deluxe",
    price: 22_000,
    imageUrl: "/deluxe.png",
    categoryId: "chemistry",
    shortDescription: "Тормосны шингэн DOT-4 стандарттай.",
    description: "Автомашины тормосны системд ашиглана.",
    specifications: "Брэнд: Deluxe\nСтандарт: DOT-4",
  },
  {
    id: "alyaska-antifreeze-40",
    name: "АЛЯСКА Антифриз -40°C",
    brand: "АЛЯСКА",
    price: 38_000,
    imageUrl: "/alyaska.png",
    categoryId: "chemistry",
    shortDescription: "Хүйтэн улиралд хөдөлгүүрийн хөргөлтийн системд ашиглана.",
    description: "Антифриз -40°C хүртэл хөргөлтийн хамгаалалт өгнө.",
    specifications: "Брэнд: АЛЯСКА\nТемператур: -40°C",
  },
  {
    id: "brilltex-car-shampoo-1l",
    name: "Brilltex Car Shampoo 1L",
    brand: "Brilltex",
    price: 12_500,
    imageUrl: "/deluxe.png",
    categoryId: "auto-care",
    shortDescription: "Автомашин угаах шампунь 1 литр.",
    description: "Автомашины гадаргууг зөөлөн цэвэрлэнэ.",
    specifications: "Брэнд: Brilltex\nХэмжээ: 1L",
  },
];
