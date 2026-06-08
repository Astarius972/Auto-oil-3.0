import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";
import { NewsListView } from "../components/cards/news-list-view";
import { newsData } from "./legal-advice-data";

export const metadata = {
  title: "Хууль зүйн зөвлөгөө",
};

export default function LegalAdvicePage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Зөвлөгөө" title="Хууль Зүйн Зөвлөгөө" />
      <NewsListView items={newsData} />
    </PageShell>
  );
}
