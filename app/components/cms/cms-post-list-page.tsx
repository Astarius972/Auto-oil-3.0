import { PageShell } from "../layout/page-shell";
import { PageHeader } from "../layout/page-header";
import { NewsListView } from "../cards/news-list-view";
import type { CmsSectionKey } from "@/lib/cms-config";
import { CMS_SECTIONS } from "@/lib/cms-config";
import { fetchCmsPosts } from "@/lib/cms";

type CmsPostListPageProps = {
  section: CmsSectionKey;
};

export async function CmsPostListPage({ section }: CmsPostListPageProps) {
  const config = CMS_SECTIONS[section];
  const items = await fetchCmsPosts({ type: config.type });

  return (
    <PageShell>
      <PageHeader
        title={config.title}
        description={config.description}
      />
      <NewsListView
        items={items}
        emptyMessage={`CMS дээр type: ${config.type} post үүсгээд Published болгоно уу.`}
      />
    </PageShell>
  );
}
