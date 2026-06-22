import { CmsPostListPage } from "../components/cms/cms-post-list-page";

export const metadata = {
  title: "Авто мэдлэг",
};

export const revalidate = 60;

export default function AutoNewsPage() {
  return <CmsPostListPage section="auto-news" />;
}
