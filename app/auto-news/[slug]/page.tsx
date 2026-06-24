import {
  CmsNewsDetailPage,
  generateCmsNewsMetadata,
  generateCmsNewsStaticParams,
} from "../../components/cms/cms-news-detail-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return generateCmsNewsStaticParams("auto-news");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generateCmsNewsMetadata("auto-news", slug);
}

export const revalidate = 60;
export const dynamicParams = true;

export default async function AutoNewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <CmsNewsDetailPage section="auto-news" slug={slug} />;
}
