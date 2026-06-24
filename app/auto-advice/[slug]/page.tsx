import {
  CmsNewsDetailPage,
  generateCmsNewsMetadata,
  generateCmsNewsStaticParams,
} from "../../components/cms/cms-news-detail-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return generateCmsNewsStaticParams("auto-advice");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generateCmsNewsMetadata("auto-advice", slug);
}

export const revalidate = 60;
export const dynamicParams = true;

export default async function AutoAdviceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <CmsNewsDetailPage section="auto-advice" slug={slug} />;
}
