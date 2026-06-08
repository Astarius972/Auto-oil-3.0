import { MainHeader } from "../components/cards/main-header";
import { TopBar } from "../components/cards/top-bar";
import Footer from "../components/footer";

const RestaurantSection = ({
  title,
  description,
  events,
}: {
  title: string;
  description: string;
  events: string[];
}) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
    <h2 className="mb-3 text-2xl font-bold text-gray-900">{title}</h2>
    <p className="mb-6 leading-relaxed text-gray-600">{description}</p>
    <h3 className="mb-3 font-semibold text-gray-800">
      Зохион байгуулах үйл ажиллагаа:
    </h3>
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {events.map((event) => (
        <li key={event} className="flex items-center text-gray-700">
          <span className="mr-2 text-blue-500">•</span> {event}
        </li>
      ))}
    </ul>
  </div>
);

export default function DulguunRestaurantPage() {
  const branch1Events = [
    "Буяны цайллага",
    "Төрсөн өдөр",
    "Үсний найр",
    "Бусад зохион байгуулах",
  ];
  const branch2Events = [
    "Буяны цайллага",
    "Төрсөн өдөр",
    "Үсний найр",
    "Хуримын ёслол",
    "Хонхны баяр",
    "Тэмдэглэлт баяр",
    "Одонгийн найр",
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />

      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="mb-12 text-center">
            <h1 className="mb-2 text-4xl font-extrabold text-blue-900">
              Дөлгөөн Ресторан
            </h1>
            <div className="mx-auto h-1 w-20 rounded-full bg-blue-500" />
          </header>

          <RestaurantSection
            title="Салбар №1"
            description="Дөлгөөн ресторан нь ОУ зэрэглэлтэй мэргэжлийн тогоочоор танд үйлчилж байна. Бид халуун тогоо, ази, европ зэрэг төрөл бүрийн амтат хоол болон гаднаа 20 гаруй авто машины зогсоолтой 40-60 хүн хүлээн авах хүчин чадалтай."
            events={branch1Events}
          />

          <RestaurantSection
            title="Дөлгөөн Зоог Ресторан (Салбар №2)"
            description="Хотын баруун хэсэгт байрших энэхүү салбар нь 100-150 хүн хүлээн авах хүчин чадалтай. Тансаг, дундаа баганагүй саруул танхимтай, кофе шоп, халуун тогоо, европ ази хоол, мэргэжлийн тайз, дэлгэц, хөгжим, орчин үеийн тоног төхөөрөмжөөр тоноглогдсон."
            events={branch2Events}
          />

          <footer className="rounded-2xl bg-blue-900 p-8 text-center text-white shadow-xl">
            <p className="mb-2 font-medium text-blue-200">Захиалга өгөх утас</p>
            <a
              href="tel:99995463"
              className="text-4xl font-bold transition-colors hover:text-blue-300"
            >
              99995463
            </a>
            <p className="mt-4 italic text-blue-100">Менежер Сэлэнгэ</p>
          </footer>
        </div>
      </div>

      <Footer />
    </div>
  );
}
