import { CmsSinglePostPage } from "../components/cms/cms-single-post-page";

export const metadata = {
  title: "Холбоо барих",
};

export const revalidate = 60;

export default function ContactPage() {
  return <CmsSinglePostPage section="contact" />;
}
