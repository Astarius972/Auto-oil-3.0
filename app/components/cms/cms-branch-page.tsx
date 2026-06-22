import InfoBox from "../cards/box";
import { PageShell } from "../layout/page-shell";
import { PageHeader } from "../layout/page-header";
import { fetchCmsPostById, fetchCmsPostsRaw } from "@/lib/cms";
import { mapCmsPostToBranchCard } from "@/lib/cms-branch";
import { CMS_SECTIONS } from "@/lib/cms-config";

export async function CmsBranchPage() {
  const config = CMS_SECTIONS.branch;

  let posts = await fetchCmsPostsRaw({ type: config.type });

  if (posts.length === 0 && config.postId) {
    const post = await fetchCmsPostById(config.postId);
    if (post) posts = [post];
  }

  const branches = posts.map((post) => mapCmsPostToBranchCard(post));

  return (
    <PageShell>
      <PageHeader
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
      />
      {branches.length > 0 ? (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {branches.map((branch) => (
            <InfoBox
              key={branch.id}
              title={branch.title}
              imageUrl={branch.imageUrl || "/salbar3.jpg"}
              address={branch.address}
              phone={branch.phone}
              schedule={branch.schedule}
            />
          ))}
        </div>
      ) : (
        <article className="app-card p-6 sm:p-8 text-center text-slate-500">
          CMS дээр <strong>type: branch</strong> post үүсгээд{" "}
          <strong>Published</strong> болгоно уу. Салбар бүр тусдаа post, thumbnail
          дээр зураг оруулна.
        </article>
      )}
    </PageShell>
  );
}
