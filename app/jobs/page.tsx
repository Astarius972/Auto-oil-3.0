import Link from "next/link";
import { Briefcase, Mail } from "lucide-react";
import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";

export const metadata = {
  title: "Ажлын байр",
};

export default function JobsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Карьер"
        title="Ажлын байр"
        description="Манай багт нэгдэх боломжуудын тухай мэдээлэл."
      />
      <div className="app-card flex flex-col items-center gap-4 p-12 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
          <Briefcase size={28} />
        </span>
        <h2 className="text-lg font-bold text-slate-900">
          Одоогоор нээлттэй ажлын байр алга байна
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-slate-600">
          Хамтран ажиллах сонирхолтой бол өөрийн анкетаа доорх хаягаар бидэнд
          илгээгээрэй. Бид тантай эргэн холбогдох болно.
        </p>
        <a href="mailto:info@auto-oil.mn" className="btn-primary">
          <Mail size={16} />
          info@auto-oil.mn
        </a>
      </div>
    </PageShell>
  );
}
