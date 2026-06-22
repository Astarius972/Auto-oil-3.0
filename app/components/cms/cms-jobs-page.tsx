import { Briefcase, Mail, Phone } from "lucide-react";
import { PageShell } from "../layout/page-shell";
import { PageHeader } from "../layout/page-header";
import { fetchCmsPostById, fetchCmsPostByType } from "@/lib/cms";
import { CMS_SECTIONS } from "@/lib/cms-config";
import { parseJobsContact, phoneToTel } from "@/lib/cms-jobs";

export async function CmsJobsPage() {
  const config = CMS_SECTIONS.jobs;
  const post = config.postId
    ? await fetchCmsPostById(config.postId)
    : await fetchCmsPostByType(config.type);

  const contact = parseJobsContact(post?.content, post?.excerpt);

  return (
    <PageShell>
      <PageHeader
        eyebrow={config.eyebrow}
        title={post?.title ?? config.title}
        description={config.description}
      />
      <div className="mx-auto max-w-2xl">
        {post ? (
          <article className="app-card flex flex-col items-center gap-6 p-8 text-center sm:p-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
              <Briefcase size={28} />
            </span>

            <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
              {contact.intro}
            </p>

            <div className="grid w-full gap-4 sm:grid-cols-2">
              {contact.phone ? (
                <a
                  href={phoneToTel(contact.phone)}
                  className="app-card app-card-hover flex items-center gap-4 p-5 text-left transition-colors"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Phone size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Утас
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-800">
                      {contact.phone}
                    </p>
                  </div>
                </a>
              ) : null}

              {contact.email ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="app-card app-card-hover flex items-center gap-4 p-5 text-left transition-colors"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      И-мэйл
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-800">
                      {contact.email}
                    </p>
                  </div>
                </a>
              ) : null}
            </div>
          </article>
        ) : (
          <article className="app-card p-8 text-center text-slate-500">
            CMS дээр <strong>type: jobs</strong> post үүсгээд{" "}
            <strong>Published</strong> болгоно уу.
          </article>
        )}
      </div>
    </PageShell>
  );
}
