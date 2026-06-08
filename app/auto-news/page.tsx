import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";
import { NewsListView } from "../components/cards/news-list-view";
import { newsData } from "./auto-news-data";

export const metadata = {
  title: "Авто мэдлэг",
};

export default function AutoNewsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Мэдээ мэдээлэл" title="Авто Мэдлэг" />
      <NewsListView items={newsData} />
    </PageShell>
  );
}
