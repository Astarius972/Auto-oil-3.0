import { PageHeader } from "../components/layout/page-header";
import { PageShell } from "../components/layout/page-shell";
import { ProductsCatalog } from "../components/cards/products-catalog";
import { PRODUCTS } from "../components/cards/product-data";
import { CMS_SECTIONS } from "@/lib/cms-config";
import {
  fetchCmsAngilalCategories,
  fetchCmsBrandCategories,
  fetchCmsProducts,
} from "@/lib/cms-product";

export const metadata = {
  title: "Бараа бүтээгдэхүүн",
};

export const revalidate = 60;

export default async function ProductsPage() {
  const config = CMS_SECTIONS.products;
  const [cmsProducts, angilalCategories, brandCategories] = await Promise.all([
    fetchCmsProducts(),
    fetchCmsAngilalCategories(),
    fetchCmsBrandCategories(),
  ]);
  const products = cmsProducts.length > 0 ? cmsProducts : PRODUCTS;
  const useCmsFilters = cmsProducts.length > 0;

  return (
    <PageShell>
      <PageHeader title={config.title} description={config.description} />
      {cmsProducts.length === 0 ? (
        <p className="mb-4 text-center text-xs text-slate-400">
          CMS дээр <strong>type: product</strong> post нэмвэл энд автоматаар
          харагдана. Одоогоор локал жагсаалт ашиглаж байна.
        </p>
      ) : null}
      <ProductsCatalog
        products={products}
        angilalCategories={useCmsFilters ? angilalCategories : undefined}
        brandCategories={useCmsFilters ? brandCategories : undefined}
      />
    </PageShell>
  );
}
