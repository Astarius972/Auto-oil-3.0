import { CmsSinglePostPage } from "../components/cms/cms-single-post-page";

export const metadata = {
  title: "Aurora Hotel",
};

export const revalidate = 60;

export default function AuroraPage() {
  return <CmsSinglePostPage section="aurora" />;
}
