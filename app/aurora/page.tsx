import { PageShell } from "../components/layout/page-shell";

export const metadata = {
  title: "Aurora Hotel",
};

export default function AuroraPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <p className="page-eyebrow mb-3">Зочид буудал</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-900 sm:text-4xl">
            AURORA HOTEL
          </h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand to-brand-accent" />
        </header>

        <div className="app-card p-6 sm:p-8">
          <p className="mb-6 leading-relaxed text-slate-700">
            Нэрнээс нь шууд мэдрэх туулийн туяа мэт сэтгэлийн тав тухыг
            мэдрүүлэх дээд зэрэглэлийн үйлчилгээ, оффис зориулалттай бүтээн
            байгуулалт. Энэхүү төв нь олон улсын шаардлагад нийцсэн А
            зэрэглэлийн оффис, ресторан, лоунж, зочид буудлын үйлчилгээ явуулах
            зориулалт бүхий барилга юм.
          </p>

          <div className="mb-6 rounded-xl border-l-4 border-brand bg-brand/5 p-6">
            <p className="font-semibold italic text-blue-900">
              "AURORA HOTEL сонгосноор таны өмнө байгууллагынхаа нэр хүндийг
              илүү өсгөх, бизнесийнхээ эзлэх орон зайг улам тэлэх өргөн
              боломжууд нээгдэх болно."
            </p>
          </div>

          <p className="leading-relaxed text-slate-700">
            Сүхбаатарын талбайгаас ердөө 4км зайтай байрлах чамин шийдэл,
            чанартай менежмент бүхий уг байгууламж нь худалдаа, үйлчилгээ, зочид
            буудал, зоогийн газруудын нийлэмжтэй цогц бүрдлээрээ олон улсын
            стандартын шаардлага хангасан төв болох юм.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
