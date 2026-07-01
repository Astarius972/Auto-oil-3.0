import { PageShell } from "../layout/page-shell";
import { BranchLocator } from "../branch/branch-locator";
import { fetchCmsPostById, fetchCmsPostsRaw } from "@/lib/cms";
import { mapCmsPostsToBranchLocations } from "@/lib/cms-branch";
import { CMS_SECTIONS } from "@/lib/cms-config";

function CmsBranchEmptyState() {
  return (
    <div className="container-page py-10">
      <article className="app-card p-6 sm:p-8 leading-relaxed text-slate-700">
        <h1 className="text-2xl font-bold text-slate-900">Салбарын байршил</h1>
        <p className="mt-4 text-center text-slate-500">
          CMS дээр <strong>type: branch</strong> post үүсгээд{" "}
          <strong>Published</strong> болгоно уу.
        </p>
        <p className="mt-2 text-center text-xs text-slate-400">
          Хаяг, цагийн хуваарь, зураг, байршлын координат (latitude/longitude)
          custom field-үүдийг бөглөнө.
        </p>
      </article>
    </div>
  );
}

export async function CmsBranchPage() {
  const config = CMS_SECTIONS.branch;

  let posts = await fetchCmsPostsRaw({ type: config.type });

  if (posts.length === 0 && config.postId) {
    const post = await fetchCmsPostById(config.postId);
    if (post) posts = [post];
  }

  const branches = mapCmsPostsToBranchLocations(posts);

  if (branches.length === 0) {
    return (
      <PageShell>
        <CmsBranchEmptyState />
      </PageShell>
    );
  }

  return (
    <PageShell contained={false}>
      <BranchLocator
        branches={branches}
        title={config.title}
        description={config.description}
      />
    </PageShell>
  );
}
