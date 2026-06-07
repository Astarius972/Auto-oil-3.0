import { notFound } from "next/navigation";
import { MainHeader } from "../../components/cards/main-header";
import { ProductDetailView } from "../../components/cards/product-detail-view";
import {
  getProductById,
  getSimilarProducts,
  PRODUCTS,
} from "../../components/cards/product-data";
import { TopBar } from "../../components/cards/top-bar";
import Footer from "../../components/footer";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
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
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <ProductDetailView
          product={product}
          similarProducts={similarProducts}
        />
      </div>
      <Footer />
    </div>
  );
}
