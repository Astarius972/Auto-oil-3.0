import { PageShell } from "../components/layout/page-shell";

export const metadata = {
  title: "Дөлгөөн ресторан",
};

const RestaurantSection = ({
  title,
  description,
  events,
}: {
  title: string;
  description: string;
  events: string[];
}) => (
  <div className="app-card app-card-hover p-6 sm:p-8">
    <h2 className="mb-3 text-xl font-bold text-slate-900 sm:text-2xl">
      {title}
    </h2>
    <p className="mb-6 leading-relaxed text-slate-600">{description}</p>
    <h3 className="mb-3 font-semibold text-slate-800">
      Зохион байгуулах үйл ажиллагаа:
    </h3>
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {events.map((event) => (
        <li key={event} className="flex items-center text-slate-700">
          <span className="mr-2 text-brand-accent">•</span> {event}
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
    <PageShell>
      <div className="mx-auto max-w-4xl space-y-6">
          <header className="mb-6 text-center">
            <p className="page-eyebrow mb-3">Зоог, үйлчилгээ</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-900 sm:text-4xl">
              Дөлгөөн Ресторан
            </h1>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand to-brand-accent" />
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

          <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-brand p-8 text-center text-white shadow-lg">
            <p className="mb-2 font-medium text-blue-200">Захиалга өгөх утас</p>
            <a
              href="tel:99995463"
              className="text-4xl font-bold transition-colors hover:text-blue-300"
            >
              99995463
            </a>
            <p className="mt-4 italic text-blue-100">Менежер Сэлэнгэ</p>
          </div>
      </div>
    </PageShell>
  );
}
