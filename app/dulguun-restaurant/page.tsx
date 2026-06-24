import { CmsSinglePostPage } from "../components/cms/cms-single-post-page";

export const metadata = {
  title: "Дөлгөөн ресторан",
};

export const revalidate = 60;

export default function DulguunRestaurantPage() {
  return <CmsSinglePostPage section="dulguun-restaurant" />;
}
