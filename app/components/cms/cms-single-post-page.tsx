import { PageShell } from "../layout/page-shell";
import { PageHeader } from "../layout/page-header";
import type { CmsSectionKey } from "@/lib/cms-config";
import { CMS_SECTIONS } from "@/lib/cms-config";
import { fetchCmsPostById, fetchCmsPostByType } from "@/lib/cms";
import { resolveCmsHtmlContent, getCmsPostGalleryImages } from "@/lib/cms-image";
import { CmsPostGallery } from "./cms-post-gallery";

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
  const contentHtml = resolveCmsHtmlContent(post?.content);
  const galleryImages = getCmsPostGalleryImages(post);

  return (
    <PageShell>
      <PageHeader
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

            <CmsPostGallery images={galleryImages} />
          </>
        ) : (
          <CmsEmptyState type={config.type} />
        )}
      </div>
    </PageShell>
  );
}
