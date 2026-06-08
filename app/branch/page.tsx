import InfoBox from "../components/cards/box";
import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";

export const metadata = {
  title: "Салбарын байршил",
};

export default function BranchPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Бидэнтэй уулзах"
        title="Салбарын байршил"
        description="Манай салбар, агуулахын хаяг, утас болон ажиллах цагийн мэдээлэл."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </PageShell>
  );
}
