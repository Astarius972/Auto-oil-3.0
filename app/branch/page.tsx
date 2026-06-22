import { CmsBranchPage } from "../components/cms/cms-branch-page";

export const metadata = {
  title: "Салбарын байршил",
};

export const revalidate = 60;

export default function BranchPage() {
  return <CmsBranchPage />;
}
