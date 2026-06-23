import BrandBox from "../components/cards/brand-box";
import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";
import { fetchCmsBrands } from "@/lib/cms-brand";
import { CMS_SECTIONS } from "@/lib/cms-config";

export const metadata = {
  title: "Брэндүүд",
};

export const revalidate = 60;

export default async function BrandPage() {
  const config = CMS_SECTIONS.brand;
  const brands = await fetchCmsBrands();

  return (
    <PageShell>
      <PageHeader
        title={config.title}
        description={config.description}
      />
      {brands.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <BrandBox
              key={brand.slug}
              imageUrl={brand.imageUrl}
              alt={brand.name}
              href={`/brand/${brand.slug}`}
            />
          ))}
        </div>
      ) : (
        <article className="app-card p-6 sm:p-8 text-center text-slate-500">
          CMS дээр <strong>type: brand</strong> post үүсгээд{" "}
          <strong>Published</strong> болгоно уу. Cover зураг болон slug
          заавал байх ёстой.
        </article>
      )}
    </PageShell>
  );
}
