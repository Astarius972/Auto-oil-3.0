import { CmsSinglePostPage } from "../components/cms/cms-single-post-page";

export const metadata = {
  title: "Бидний тухай",
};

export const revalidate = 60;

export default function AboutPage() {
  return <CmsSinglePostPage section="about" />;
}
