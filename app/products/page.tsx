import { PageHeader } from "../components/layout/page-header";
import { PageShell } from "../components/layout/page-shell";
import { ProductsCatalog } from "../components/cards/products-catalog";

export const metadata = {
  title: "Бараа бүтээгдэхүүн",
};

export default function ProductsPage() {
  return (
    <PageShell>
      <PageHeader
        title="Бараа бүтээгдэхүүн"
        description="Дэлхийн тэргүүлэгч брэндүүдийн тос, тосолгооны материал, автохими болон сэлбэгийг ангилал, брэнд, үнээр шүүж сонгоно уу."
      />
      <ProductsCatalog />
    </PageShell>
  );
}
