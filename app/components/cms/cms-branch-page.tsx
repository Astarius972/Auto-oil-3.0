import { PageShell } from "../layout/page-shell";
import { PageHeader } from "../layout/page-header";
import { fetchCmsPostById, fetchCmsPostsRaw } from "@/lib/cms";
import { mapCmsPostToBranchCard } from "@/lib/cms-branch";
import { CMS_SECTIONS } from "@/lib/cms-config";
import {
  getCmsPostCoverUrl,
  resolveCmsHtmlContent,
  resolveCmsImageUrl,
} from "@/lib/cms-image";

function CmsBranchEmptyState() {
  return (
    <article className="app-card p-6 sm:p-8 leading-relaxed text-slate-700">
      <p className="text-center text-slate-500">
        CMS дээр <strong>type: branch</strong> post үүсгээд{" "}
        <strong>Published</strong> болгоно уу.
      </p>
      <p className="mt-2 text-center text-xs text-slate-400">
        Posts → Add → type=branch
      </p>
    </article>
  );
}

export async function CmsBranchPage() {
  const config = CMS_SECTIONS.branch;

  let posts = await fetchCmsPostsRaw({ type: config.type });

  if (posts.length === 0 && config.postId) {
    const post = await fetchCmsPostById(config.postId);
    if (post) posts = [post];
  }

  const headerPost =
    (config.postId
      ? posts.find((post) => post._id === config.postId)
      : undefined) ?? posts[0] ?? null;

  return (
    <PageShell>
      <PageHeader
        title={headerPost?.title ?? config.title}
        description={headerPost?.excerpt ?? config.description}
      />
      <div className="mx-auto max-w-4xl">
        {posts.length > 0 ? (
          posts.map((post, index) => {
            const branch = mapCmsPostToBranchCard(post);
            const coverImage = getCmsPostCoverUrl(post);
            const contentHtml = resolveCmsHtmlContent(post.content);
            const hasContent = Boolean(post.content?.trim());
            const hasBranchInfo =
              branch.address || branch.phone || branch.schedule;

            return (
              <section key={post._id} className={index > 0 ? "mt-10" : ""}>
                {hasContent ? (
                  <article className="app-card p-6 sm:p-8 leading-relaxed text-slate-700">
                    <div
                      className="prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                  </article>
                ) : hasBranchInfo ? (
                  <article className="app-card p-6 sm:p-8 leading-relaxed text-slate-700">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {branch.title}
                    </h2>
                    <div className="prose prose-slate mt-4 max-w-none text-sm sm:text-base">
                      {branch.address ? (
                        <p>
                          <strong>Хаяг:</strong> {branch.address}
                        </p>
                      ) : null}
                      {branch.phone ? (
                        <p>
                          <strong>Утас:</strong> {branch.phone}
                        </p>
                      ) : null}
                      {branch.schedule ? (
                        <p>
                          <strong>Цагийн хуваарь:</strong> {branch.schedule}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ) : null}

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
                      {post.images.map((image, imageIndex) => (
                        <div
                          key={`${image.url ?? "image"}-${imageIndex}`}
                          className="w-[300px] flex-none snap-center"
                        >
                          <img
                            src={resolveCmsImageUrl(image.url)}
                            alt={image.name ?? `Image ${imageIndex + 1}`}
                            className="h-auto w-full rounded-xl border border-slate-200 shadow-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>
            );
          })
        ) : (
          <CmsBranchEmptyState />
        )}
      </div>
    </PageShell>
  );
}
