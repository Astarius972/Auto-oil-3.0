import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MainHeader } from "../../components/cards/main-header";
import { TopBar } from "../../components/cards/top-bar";
import { BRANDS, getBrandBySlug } from "../../components/cards/brand-data";
import { BrandGallery } from "../../components/cards/brand-gallery";
import { ScribdEmbed } from "../../components/cards/scribd-embed";
import Sidebar from "../../components/sidebar";

type BrandDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BRANDS.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  return (
    <div className="min-h-screen text-slate-200 font-sans antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />
      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        <Sidebar />
        <main className="w-full md:w-3/4 border-8 p-6">
          <Link
            href="/brand"
            className="mb-4 inline-block text-sm text-blue-600 hover:text-blue-800"
          >
            ← Брэндүүд рүү буцах
          </Link>
          <h1 className="text-xl font-bold border-b text-black border-slate-300 pb-4 mb-6">
            {brand.name}
          </h1>
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
              <Image
                src={brand.imageUrl}
                alt={brand.name}
                width={480}
                height={240}
                className="mx-auto max-h-48 w-full object-contain"
              />
            </div>
            <p className="max-w-2xl whitespace-pre-line text-justify text-black leading-relaxed">
              {brand.description}
            </p>
            {brand.scribdDocumentId && (
              <ScribdEmbed
                documentId={brand.scribdDocumentId}
                secretPassword={brand.scribdSecretPassword}
                title={`${brand.name} каталог`}
              />
            )}
            {brand.galleryImages && brand.galleryImages.length > 0 && (
              <BrandGallery images={brand.galleryImages} alt={brand.name} />
            )}
          </div>
        </main>
      </div>
      <footer className="bottom-0 border-t border-slate-900/80 bg-[#060912] text-xs text-slate-500 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LuxOil LLC. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
