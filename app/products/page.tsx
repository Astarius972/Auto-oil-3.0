import { MainHeader } from "../components/cards/main-header";
import { ProductsCatalog } from "../components/cards/products-catalog";
import { TopBar } from "../components/cards/top-bar";
import Footer from "../components/footer";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <ProductsCatalog />
      </div>
      <Footer />
    </div>
  );
}
