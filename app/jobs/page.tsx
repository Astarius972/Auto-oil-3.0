import { CmsJobsPage } from "../components/cms/cms-jobs-page";

export const metadata = {
  title: "Ажлын байр",
};

export const revalidate = 60;

export default function JobsPage() {
  return <CmsJobsPage />;
}
