import { notFound } from "next/navigation";
import { PageShell } from "../../components/layout/page-shell";
import { ProductDetailView } from "../../components/cards/product-detail-view";
import {
  getProductById,
  getSimilarProducts,
  PRODUCTS,
} from "../../components/cards/product-data";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  return { title: product?.name ?? "Бүтээгдэхүүн" };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const similarProducts = getSimilarProducts(product);

  return (
    <PageShell>
      <ProductDetailView product={product} similarProducts={similarProducts} />
    </PageShell>
  );
}
