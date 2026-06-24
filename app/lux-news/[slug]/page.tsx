import {
  CmsNewsDetailPage,
  generateCmsNewsMetadata,
  generateCmsNewsStaticParams,
} from "../../components/cms/cms-news-detail-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return generateCmsNewsStaticParams("lux-news");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generateCmsNewsMetadata("lux-news", slug);
}

export const revalidate = 60;
export const dynamicParams = true;

export default async function LuxNewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <CmsNewsDetailPage section="lux-news" slug={slug} />;
}
