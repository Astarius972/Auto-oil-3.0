import { PageShell } from "../layout/page-shell";
import { PageHeader } from "../layout/page-header";
import type { CmsSectionKey } from "@/lib/cms-config";
import { CMS_SECTIONS } from "@/lib/cms-config";
import { fetchCmsPostsRaw } from "@/lib/cms";
import { resolveCmsHtmlContent, resolveCmsImageUrl } from "@/lib/cms-image";

type CmsPostGridPageProps = {
  section: CmsSectionKey;
};

export async function CmsPostGridPage({ section }: CmsPostGridPageProps) {
  const config = CMS_SECTIONS[section];
  const posts = await fetchCmsPostsRaw({ type: config.type });

  return (
    <PageShell>
      <PageHeader
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
      />
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => {
            const imageUrl = resolveCmsImageUrl(
              post.thumbnail?.url ?? post.images?.[0]?.url,
            );
            const contentHtml = resolveCmsHtmlContent(post.content);

            return (
              <article
                key={post._id}
                className="app-card app-card-hover group flex h-full flex-col overflow-hidden"
              >
                {imageUrl ? (
                  <div className="overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gradient-to-br from-slate-100 to-slate-200" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-base font-bold leading-snug text-blue-900">
                    {post.title}
                  </h2>
                  {post.content ? (
                    <div
                      className="prose prose-sm prose-slate mt-4 max-w-none text-slate-600"
                      dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                  ) : post.excerpt ? (
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {post.excerpt}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <article className="app-card p-6 sm:p-8 text-center text-slate-500">
          CMS дээр <strong>type: {config.type}</strong> post үүсгээд{" "}
          <strong>Published</strong> болгоно уу. Салбар бүр тусдаа post байна.
        </article>
      )}
    </PageShell>
  );
}
