import { CmsSinglePostPage } from "../components/cms/cms-single-post-page";

export const metadata = {
  title: "Худалдан авалт",
};

export const revalidate = 60;

export default function ProcurementPage() {
  return <CmsSinglePostPage section="procurement" />;
}
