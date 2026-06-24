import { notFound } from "next/navigation";
import { PageShell } from "../../components/layout/page-shell";
import { ProductDetailView } from "../../components/cards/product-detail-view";
import {
  getOilRelatedProducts,
  getProductById,
  PRODUCTS,
} from "../../components/cards/product-data";
import { fetchCmsProductById, fetchCmsProducts } from "@/lib/cms-product";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const cmsProducts = await fetchCmsProducts();
  const source = cmsProducts.length > 0 ? cmsProducts : PRODUCTS;
  return source.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const cmsProduct = await fetchCmsProductById(id);
  const product = cmsProduct ?? getProductById(id);
  return { title: product?.name ?? "Бүтээгдэхүүн" };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const cmsProducts = await fetchCmsProducts();
  const catalog = cmsProducts.length > 0 ? cmsProducts : PRODUCTS;
  const cmsProduct = await fetchCmsProductById(id);
  const product = cmsProduct ?? getProductById(id);

  if (!product) {
    notFound();
  }

  const oilRelatedProducts = getOilRelatedProducts(product, catalog);

  return (
    <PageShell>
      <ProductDetailView
        product={product}
        oilRelatedProducts={oilRelatedProducts}
      />
    </PageShell>
  );
}
