import {
  CmsNewsDetailPage,
  generateCmsNewsMetadata,
  generateCmsNewsStaticParams,
} from "../../components/cms/cms-news-detail-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return generateCmsNewsStaticParams("legal-advice");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generateCmsNewsMetadata("legal-advice", slug);
}

export const revalidate = 60;
export const dynamicParams = true;

export default async function LegalAdviceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <CmsNewsDetailPage section="legal-advice" slug={slug} />;
}
