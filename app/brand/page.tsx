import { MainHeader } from "../components/cards/main-header";
import { TopBar } from "../components/cards/top-bar";
import Link from "next/link";
import BrandBox from "../components/cards/brand-box";
import { BRANDS } from "../components/cards/brand-data";
import Footer from "../components/footer";

export default function BrandPage() {
  return (
    <div className="min-h-screen  text-slate-200 font-sans antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <main className="w-full border-8 p-6">
          <h1 className="text-xl font-bold border-b text-black border-slate-300 pb-4 mb-6">
            Брэндүүд
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 justify-items-center gap-9">
            {BRANDS.map((brand) => (
              <BrandBox
                key={brand.slug}
                imageUrl={brand.imageUrl}
                alt={brand.name}
                href={`/brand/${brand.slug}`}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
