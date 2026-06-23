import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandGallery } from "../../components/cards/brand-gallery";
import { PdfEmbed } from "../../components/cards/pdf-embed";
import { ScribdEmbed } from "../../components/cards/scribd-embed";
import { PageShell } from "../../components/layout/page-shell";
import { fetchCmsBrandBySlug, fetchCmsBrands } from "@/lib/cms-brand";

type BrandDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const brands = await fetchCmsBrands();
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = await fetchCmsBrandBySlug(slug);
  return { title: brand?.name ?? "Брэнд" };
}

export const revalidate = 60;
export const dynamicParams = true;

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = await fetchCmsBrandBySlug(slug);

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
              unoptimized={brand.imageUrl.startsWith("http")}
              className="mx-auto max-h-48 w-full object-contain"
            />
          </div>

          {brand.contentHtml ? (
            <div
              className="prose prose-slate max-w-2xl text-justify"
              dangerouslySetInnerHTML={{ __html: brand.contentHtml }}
            />
          ) : brand.description ? (
            <p className="max-w-2xl whitespace-pre-line text-justify leading-relaxed text-slate-700">
              {brand.description}
            </p>
          ) : null}

          {brand.pdfUrl ? (
            <PdfEmbed url={brand.pdfUrl} title={`${brand.name} каталог`} />
          ) : brand.scribdDocumentId ? (
            <ScribdEmbed
              documentId={brand.scribdDocumentId}
              secretPassword={brand.scribdSecretPassword}
              title={`${brand.name} каталог`}
            />
          ) : null}

          {brand.galleryImages && brand.galleryImages.length > 0 ? (
            <BrandGallery images={brand.galleryImages} alt={brand.name} />
          ) : null}
        </div>
      </div>
    </PageShell>
  );
}
