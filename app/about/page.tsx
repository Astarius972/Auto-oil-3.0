import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";

export const metadata = {
  title: "Бидний тухай",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Бидний тухай"
        title="Компаний танилцуулга"
        description="2001 оноос хойшхи аяллаа, үнэт зүйлс, алсын хараагаа танд хүргэж байна."
      />
      <div className="mx-auto max-w-4xl">
        <article className="app-card p-6 sm:p-8 leading-relaxed text-slate-700">
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            Захирлын мэндчилгээ
          </h3>

          <div className="flex flex-col gap-4">
              <div>
                "Авто Ойл" ХХК-ийн хамт олнохоо өмнөөс Танд энэ өдрийн амар
                амгаланг эрж, ажил үйлст тань амжилт хүсье. Манай "Авто Ойл" ХХК
                нь анх 2001 оноос бизнесийн гараагаа эхэлж байсан билээ.
              </div>

              <div>
                Өнөөдөр "Авто Ойл" ХХК нь бүх төрлийн суудлын болон хүнд даацын
                автомашин, техник, тоног төхөөрөмжийн тос тосолгооны материал,
                даацын дугуй, фильтр, төрөл бүрийн автохимийн бүтээгдэхүүн,
                аккумуляторын бөөнөөр худалдаа, автомашины засвар үйлчилгээ
                болон бусад чиглэлээр үйл ажиллагаагаа эрхлэн явуулж байна.
              </div>

              <div className="font-bold">Б.Ганбаатар</div>
              <div className="font-bold">"Авто Ойл" ХХК-ийн Захирал</div>

              <div className="font-bold text-[#1a3e75] text-2xl text-center">
                Компанийн тухай
              </div>

              <div className="text-black">
                2001 онд байгуулагдсан “АВТО ОЙЛ” ХХК нь бүх төрлийн автомашин
                техникийн тос тосолгооны материал, даацын дугуй, аккумулятор,
                бүх төрлийн автохими, фильтрийн бөөний худалдаа, автомашины тос
                солилгоо, засвар үйлчилгээ болон бусад чиглэлээр үйл
                ажиллагаагаа эрхлэн явуулдаг.
              </div>

              <div className="text-black">
                “АВТО ОЙЛ” ХХК нь дэлхийн “DELFIN GROUP WORLDWIDE”-ийн Орос дахь
                төлөөлөл болох АНУ, ОХУ-ын хамтарсан “Delfin Industry (LUXE)”,
                Германы “ROYAL DUTCH SHELL” “SCT MANNOL”, Солонгосын “Hyundai
                Emsys Inc (KORLUBE)”, “KNR Manufac (DELUXE)”, Турк улсын
                аккумулятор “MUTLU BATTERY” БНХАУ-ын дугуй үйлдвэрлэлийн шилдэг
                компани болох “TRIANGLE” групп компаниудын Монгол дахь албан
                ёсны дистрибьютер.
              </div>

              <div className="text-black">
                “LUXOIL” төв нь зочид буудал, ресторан, паб, тосны дэлгүүр болон
                тосолгоо үйлчилгээний чиглэлээр цогц үйл ажиллагаа явуулдаг.
                Харин Нарны зам дагуух “LUXE” төв нь бүх төрлийн япон автомашины
                сэлбэг, тос тосолгооны материалын дэлгүүр болон автомашины бүх
                төрлийн засвар үйлчилгээ эрхлэн явуулдаг.
              </div>

              <div className="text-black">
                Төмөр замын салаатай 12000м2 талбайтай өөрийн агуулахтай ба
                гадаадын бэлтгэн нийлүүлэгчдээс бараа бүтээгдэхүүнийг төмөр
                замаар дамжуулан шууд хүлээн авдаг тул өртөг хямд.
              </div>

              <div className="text-[#1a3e75] font-bold">Бидний зорилго:</div>
              <div className="text-black">
                Бид шилдэг инноваци, мэдлэгт тулгуурласан бүтээлч хандлагаар
                салбартаа манлайлагч байж, сэтгэл ханамж, мэргэжлийн ур
                чадвараар үргэлж тэргүүлнэ.
              </div>

              <div className="text-[#1a3e75] font-bold">Үнэт зүйлс:</div>
              <div className="text-black">Сэтгэл ханамж /SS</div>
              <div className="text-black">Мэргэжлийн ур чадвар /PS</div>
              <div className="text-black">Чанар, стандарт /QS</div>

              <div className="text-[#1a3e75] font-bold">Алсын хараа:</div>
              <div className="text-black">
                Бид 2040 он гэхэд үйл ажиллагааны цар хүрээг системтэйгээр
                өргөжүүлж, нягт хөгжлийг бүтээх замаар салбарын чиг хандлагыг
                хүчтэй тэргүүлэгчдийн нэг болсон байна.
              </div>

              <div className="text-[#1a3e75] font-bold">Уриа үг:</div>
              <div className="text-black">
                AUTO OIL <br /> Drive your happiness/ Аз жаргалаа жолоод
              </div>
            </div>
          </article>

          <div className="app-card mt-6 overflow-hidden p-2">
            <img
              src="/Time_line.jpg"
              alt="Auto Oil Time Line"
              className="h-auto w-full rounded-xl"
            />
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Гэрчилгээ, өргөмжлөл
            </h3>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              <div className="w-[300px] flex-none snap-center">
                <img
                  src="/urgumjlil-3.jpg"
                  alt="Auto Oil Urgumjilil 3"
                  className="h-auto w-full rounded-xl border border-slate-200 shadow-sm"
                />
              </div>
              <div className="w-[300px] flex-none snap-center">
                <img
                  src="/urgumjlul-2.jpg"
                  alt="Auto Oil Urgumjilil 4"
                  className="h-auto w-full rounded-xl border border-slate-200 shadow-sm"
                />
              </div>
              <div className="w-[300px] flex-none snap-center">
                <img
                  src="/urgumjlol.jpg"
                  alt="Auto Oil Urgumjilil 5"
                  className="h-auto w-full rounded-xl border border-slate-200 shadow-sm"
                />
              </div>
            </div>
          </div>
      </div>
    </PageShell>
  );
}
