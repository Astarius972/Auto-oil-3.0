import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANDS, getBrandBySlug } from "../../components/cards/brand-data";
import { BrandGallery } from "../../components/cards/brand-gallery";
import { ScribdEmbed } from "../../components/cards/scribd-embed";
import { PageShell } from "../../components/layout/page-shell";

type BrandDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BRANDS.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  return { title: brand?.name ?? "Брэнд" };
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  return (
    <PageShell>
      <Link
        href="/brand"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark transition-colors hover:text-brand-deep"
      >
        ← Брэндүүд рүү буцах
      </Link>

      <div className="app-card p-6 sm:p-8">
        <h1 className="page-title border-b border-slate-200 pb-4">
          {brand.name}
        </h1>
        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <Image
              src={brand.imageUrl}
              alt={brand.name}
              width={480}
              height={240}
              className="mx-auto max-h-48 w-full object-contain"
            />
          </div>
          <p className="max-w-2xl whitespace-pre-line text-justify leading-relaxed text-slate-700">
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
      </div>
    </PageShell>
  );
}
