import { CmsPostListPage } from "../components/cms/cms-post-list-page";

export const metadata = {
  title: "Lux News",
};

export const revalidate = 60;

export default function LuxNewsPage() {
  return <CmsPostListPage section="lux-news" />;
}
