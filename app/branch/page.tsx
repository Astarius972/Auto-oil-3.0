import { TopBar } from "../components/cards/top-bar";
import { MainHeader } from "../components/cards/main-header";
import Link from "next/link";
import InfoBox from "../components/cards/box";
import Footer from "../components/footer";

export default function BranchPage() {
  return (
    <div className="min-h-screen  text-slate-200 font-sans antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <main className="w-full border-8 p-6">
          <h1 className="text-xl font-bold border-b text-black border-slate-300 pb-4 mb-6">
            САЛБАРЫН БАЙРШИЛ
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <InfoBox
              title="САЛБАР 1 ТОСНЫ ХУДАЛДАА, ЗАСВАР ҮЙЛЧИЛГЭЭ"
              imageUrl="/salbar3.jpg"
              address="Нарны зам, “Өгөөмөр” техникийн захаас зүүнтийш 300м, “МТ” ШТС-ын баруун талд"
              phone="11-480-000, 99015238, 99432314"
              schedule="Бүх өдөр 9:00 - 20:00"
            />
            <InfoBox
              title="САЛБАР 2 ТОСНЫ ХУДАЛДАА, АГУУЛАХ, ЗАСВАР ҮЙЛЧИЛГЭЭ"
              imageUrl="/salbar2.jpg"
              address="Товчооны зам, Сонсголонгийн уулзвар Монос фармын замын хойно"
              phone="7019-6666, 88066688"
              schedule="Бүх өдөр 9:00 - 20:00"
            />
            <InfoBox
              title="САЛБАР 3 ТОСНЫ ХУДАЛДАА, ЗАСВАР ҮЙЛЧИЛГЭЭ"
              imageUrl="/salbar1.jpg"
              address="Улаанбаатар хот, 18080, Сонгинохайрхан дүүрэг, 18-р хороо, Энхтайваны өргөн чөлөө-163, “LUXOIL” төв, “АВТО ОЙЛ” ХХК"
              phone="7019-6666"
              schedule="БҮХ ӨДӨР 9:00 - 20:00"
            />
            <InfoBox
              title="АГУУЛАХ БӨӨНИЙ ХУДАЛДАА"
              imageUrl="/salbar2.jpg"
              address="Товчооны зам, Сонсголонгийн уулзвар Монос фармын замын хойно"
              phone="7019-6666"
              schedule="Бүх өдөр 9:00 - 20:00"
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
