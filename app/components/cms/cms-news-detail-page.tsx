import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "../layout/page-shell";
import type { CmsNewsSectionKey } from "@/lib/cms-news";
import { getCmsNewsBasePath } from "@/lib/cms-news";
import { CMS_SECTIONS } from "@/lib/cms-config";
import { fetchCmsPostById, fetchCmsPostsRaw } from "@/lib/cms";
import { resolveCmsHtmlContent, resolveCmsImageUrl } from "@/lib/cms-image";
import { fetchNewsListItems } from "./cms-post-list-page";

type CmsNewsDetailPageProps = {
  section: CmsNewsSectionKey;
  slug: string;
};

export async function CmsNewsDetailPage({
  section,
  slug,
}: CmsNewsDetailPageProps) {
  const config = CMS_SECTIONS[section];
  const basePath = getCmsNewsBasePath(section);
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();

  const posts = await fetchCmsPostsRaw({ type: config.type });
  let post =
    posts.find((item) => item.slug?.trim().toLowerCase() === normalizedSlug) ??
    null;

  if (!post && config.postId) {
    const linkedPost = await fetchCmsPostById(config.postId);
    if (linkedPost?.slug?.trim().toLowerCase() === normalizedSlug) {
      post = linkedPost;
    }
  }

  if (!post) notFound();

  const coverImage = resolveCmsImageUrl(
    post.thumbnail?.url ?? post.images?.[0]?.url,
  );
  const contentHtml = resolveCmsHtmlContent(post.content);

  return (
    <PageShell>
      <Link
        href={basePath}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark transition-colors hover:text-brand-deep"
      >
        ← Буцах
      </Link>

      <article className="app-card mx-auto max-w-3xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          {post.title}
        </h1>

        {coverImage ? (
          <img
            src={coverImage}
            alt={post.title}
            className="mt-6 h-auto w-full rounded-xl object-cover"
          />
        ) : null}

        {post.content ? (
          <div
            className="prose prose-slate mt-6 max-w-none text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : post.excerpt ? (
          <p className="mt-6 text-base leading-relaxed text-slate-700">
            {post.excerpt}
          </p>
        ) : null}

        {post.images && post.images.length > 1 ? (
          <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {post.images.map((image, index) => (
              <div
                key={`${image.url ?? "image"}-${index}`}
                className="w-[280px] flex-none snap-center"
              >
                <img
                  src={resolveCmsImageUrl(image.url)}
                  alt={image.name ?? `Image ${index + 1}`}
                  className="h-auto w-full rounded-xl border border-slate-200 shadow-sm"
                />
              </div>
            ))}
          </div>
        ) : null}
      </article>
    </PageShell>
  );
}

export async function generateCmsNewsStaticParams(section: CmsNewsSectionKey) {
  const items = await fetchNewsListItems(section);
  return items.map((item) => ({ slug: item.slug! }));
}

export async function generateCmsNewsMetadata(
  section: CmsNewsSectionKey,
  slug: string,
) {
  const config = CMS_SECTIONS[section];
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  const posts = await fetchCmsPostsRaw({ type: config.type });
  const post = posts.find(
    (item) => item.slug?.trim().toLowerCase() === normalizedSlug,
  );

  return { title: post?.title ?? config.metadataTitle };
}
