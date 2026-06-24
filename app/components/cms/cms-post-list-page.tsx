import Image from "next/image";
import Link from "next/link";
import { PageShell } from "../layout/page-shell";
import { PageHeader } from "../layout/page-header";
import {
  NewsListView,
  type NewsListItem,
} from "../cards/news-list-view";
import type { CmsNewsSectionKey } from "@/lib/cms-news";
import { getCmsNewsBasePath } from "@/lib/cms-news";
import { CMS_SECTIONS } from "@/lib/cms-config";
import {
  fetchCmsPostById,
  fetchCmsPostsRaw,
  mapCmsPostToNewsItem,
} from "@/lib/cms";

type CmsPostListPageProps = {
  section: CmsNewsSectionKey;
};

export async function fetchNewsListItems(section: CmsNewsSectionKey) {
  const config = CMS_SECTIONS[section];
  let posts = await fetchCmsPostsRaw({ type: config.type });

  if (config.postId && !posts.some((post) => post._id === config.postId)) {
    const linkedPost = await fetchCmsPostById(config.postId);
    if (linkedPost) posts = [linkedPost, ...posts];
  }

  const seen = new Set<string>();

  return posts
    .map((post) => mapCmsPostToNewsItem(post))
    .filter((item) => {
      if (!item.slug || seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    });
}

function CmsNewsGridView({
  items,
  basePath,
  emptyMessage,
}: {
  items: NewsListItem[];
  basePath: string;
  emptyMessage: string;
}) {
  if (items.length === 0) {
    return (
      <article className="app-card p-6 sm:p-8 text-center text-slate-500">
        {emptyMessage}
      </article>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const href = `${basePath}/${item.slug}`;

        return (
          <Link
            key={item.id}
            href={href}
            className="app-card app-card-hover group flex h-full flex-col overflow-hidden"
          >
            <div className="overflow-hidden">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={480}
                  height={280}
                  unoptimized={item.imageUrl.startsWith("http")}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-44 w-full bg-gradient-to-br from-slate-100 to-slate-200" />
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand-deep">
                {item.title}
              </h3>
              {item.excerpt ? (
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {item.excerpt}
                </p>
              ) : null}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export async function CmsPostListPage({ section }: CmsPostListPageProps) {
  const config = CMS_SECTIONS[section];
  const items = await fetchNewsListItems(section);
  const basePath = getCmsNewsBasePath(section);
  const emptyMessage = `CMS дээр type: ${config.type} post үүсгээд Published болгоно уу. Slug заавал оруулна.`;

  return (
    <PageShell>
      <PageHeader title={config.title} description={config.description} />
      {config.layout === "grid" ? (
        <CmsNewsGridView
          items={items}
          basePath={basePath}
          emptyMessage={emptyMessage}
        />
      ) : (
        <NewsListView
          items={items}
          basePath={basePath}
          emptyMessage={emptyMessage}
        />
      )}
    </PageShell>
  );
}
