import { CmsPostListPage } from "../components/cms/cms-post-list-page";

export const metadata = {
  title: "Авто зөвлөгөө",
};

export const revalidate = 60;

export default function AutoAdvicePage() {
  return <CmsPostListPage section="auto-advice" />;
}
