import BrandBox from "../components/cards/brand-box";
import { BRANDS } from "../components/cards/brand-data";
import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";

export const metadata = {
  title: "Брэндүүд",
};

export default function BrandPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Хамтрагчид"
        title="Брэндүүд"
        description="Бидний албан ёсоор төлөөлдөг дэлхийн тэргүүлэгч үйлдвэрлэгчид."
      />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {BRANDS.map((brand) => (
          <BrandBox
            key={brand.slug}
            imageUrl={brand.imageUrl}
            alt={brand.name}
            href={`/brand/${brand.slug}`}
          />
        ))}
      </div>
    </PageShell>
  );
}
