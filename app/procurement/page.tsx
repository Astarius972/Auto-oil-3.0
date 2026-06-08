import Image from "next/image";
import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";

export const metadata = {
  title: "Худалдан авалт",
};

export default function ProcurementPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Үйлчилгээ"
        title="Худалдан авалт"
        description="Бөөний болон жижиглэн худалдааны нөхцөл, бүтээгдэхүүний мэдээлэл."
      />
      <div className="app-card overflow-hidden p-2">
        <Image
          className="mx-auto h-auto w-full rounded-xl"
          src="/Web_items_2017.10.06.jpg"
          alt="Худалдан авалт"
          width={1000}
          height={1000}
        />
      </div>
    </PageShell>
  );
}
