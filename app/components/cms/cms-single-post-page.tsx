import { PageShell } from "../layout/page-shell";
import { PageHeader } from "../layout/page-header";
import type { CmsSectionKey } from "@/lib/cms-config";
import { CMS_SECTIONS } from "@/lib/cms-config";
import { fetchCmsPostById, fetchCmsPostByType } from "@/lib/cms";
import { resolveCmsHtmlContent, resolveCmsImageUrl } from "@/lib/cms-image";

type CmsSinglePostPageProps = {
  section: CmsSectionKey;
};

function CmsEmptyState({ type }: { type: string }) {
  return (
    <article className="app-card p-6 sm:p-8 leading-relaxed text-slate-700">
      <p className="text-center text-slate-500">
        CMS дээр <strong>type: {type}</strong> post үүсгээд{" "}
        <strong>Published</strong> болгоно уу.
      </p>
      <p className="mt-2 text-center text-xs text-slate-400">
        Posts → Add → type={type}
      </p>
    </article>
  );
}

export async function CmsSinglePostPage({ section }: CmsSinglePostPageProps) {
  const config = CMS_SECTIONS[section];
  const post = config.postId
    ? await fetchCmsPostById(config.postId)
    : await fetchCmsPostByType(config.type);
  const coverImage = resolveCmsImageUrl(
    post?.thumbnail?.url ?? post?.images?.[0]?.url,
  );
  const contentHtml = resolveCmsHtmlContent(post?.content);

  return (
    <PageShell>
      <PageHeader
        eyebrow={config.eyebrow}
        title={post?.title ?? config.title}
        description={post?.excerpt ?? config.description}
      />
      <div className="mx-auto max-w-4xl">
        {post?.content ? (
          <>
            <article className="app-card p-6 sm:p-8 leading-relaxed text-slate-700">
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </article>

            {coverImage ? (
              <div className="app-card mt-6 overflow-hidden p-2">
                <img
                  src={coverImage}
                  alt={post.title}
                  className="h-auto w-full rounded-xl"
                />
              </div>
            ) : null}

            {post.images && post.images.length > 1 ? (
              <div className="mt-6">
                <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
                  {post.images.map((image, index) => (
                    <div
                      key={`${image.url ?? "image"}-${index}`}
                      className="w-[300px] flex-none snap-center"
                    >
                      <img
                        src={resolveCmsImageUrl(image.url)}
                        alt={image.name ?? `Image ${index + 1}`}
                        className="h-auto w-full rounded-xl border border-slate-200 shadow-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <CmsEmptyState type={config.type} />
        )}
      </div>
    </PageShell>
  );
}
