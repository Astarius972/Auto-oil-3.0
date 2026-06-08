import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";
import { NewsListView } from "../components/cards/news-list-view";
import { newsData } from "./auto-advice-data";

export const metadata = {
  title: "Авто зөвлөгөө",
};

export default function AutoAdvicePage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Зөвлөгөө" title="Авто Зөвлөгөө" />
      <NewsListView items={newsData} />
    </PageShell>
  );
}
