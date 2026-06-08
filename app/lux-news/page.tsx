import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";
import { NewsListView } from "../components/cards/news-list-view";
import { newsData } from "./lux-news-data";

export const metadata = {
  title: "Lux News",
};

export default function LuxNewsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Мэдээ мэдээлэл" title="Lux News" />
      <NewsListView items={newsData} />
    </PageShell>
  );
}
