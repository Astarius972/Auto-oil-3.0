import { CmsPostListPage } from "../components/cms/cms-post-list-page";

export const metadata = {
  title: "Хууль зүйн зөвлөгөө",
};

export const revalidate = 60;

export default function LegalAdvicePage() {
  return <CmsPostListPage section="legal-advice" />;
}
