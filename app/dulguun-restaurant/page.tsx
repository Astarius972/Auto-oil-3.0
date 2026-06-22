import { CmsPostListPage } from "../components/cms/cms-post-list-page";

export const metadata = {
  title: "Дөлгөөн ресторан",
};

export const revalidate = 60;

export default function DulguunRestaurantPage() {
  return <CmsPostListPage section="dulguun-restaurant" />;
}
