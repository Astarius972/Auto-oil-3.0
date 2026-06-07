import React from "react";
import { ChevronDown } from "lucide-react";
import { MainHeader } from "../components/cards/main-header";
import { TopBar } from "../components/cards/top-bar";
import Link from "next/link";
import Footer from "../components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-200 font-sans antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <main className="w-full border-8 p-6">
          <h1 className="text-xl font-bold border-b text-black border-slate-300 pb-4 mb-6">
            Компаний танилцуулга
          </h1>
          <article className="prose max-w-none leading-relaxed text-black">
            <h3 className="font-bold text-black mb-4">Захирлын мэндчилгээ</h3>

            <div className="flex flex-col text-black gap-4">
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

          <div className="mt-8">
            <img
              src="/Time_line.jpg"
              alt="Auto Oil Time Line"
              className="w-full h-auto"
            />
          </div>
          <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
            <div className="flex-none w-[300px] snap-center">
              <img
                src="/urgumjlil-3.jpg"
                alt="Auto Oil Urgumjilil 3"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="flex-none w-[300px] snap-center">
              <img
                src="/urgumjlul-2.jpg"
                alt="Auto Oil Urgumjilil 4"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="flex-none w-[300px] snap-center">
              <img
                src="/urgumjlol.jpg"
                alt="Auto Oil Urgumjilil 5"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
