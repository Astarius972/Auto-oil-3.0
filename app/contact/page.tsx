import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";

export const metadata = {
  title: "Холбоо барих",
};

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: "Хаяг",
    value:
      "Улаанбаатар хот, 18080, Сонгинохайрхан дүүрэг, 18-р хороо, Энхтайваны өргөн чөлөө-163",
    href: undefined,
  },
  {
    icon: Phone,
    label: "Утас",
    value: "70070088",
    href: "tel:70070088",
  },
  {
    icon: Mail,
    label: "И-мэйл",
    value: "info@auto-oil.mn",
    href: "mailto:info@auto-oil.mn",
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Холбоо барих"
        title="Бидэнтэй холбогдох"
        description="Асуулт, санал хүсэлт байвал доорх мэдээллээр бидэнтэй холбогдоно уу."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          {CONTACT_DETAILS.map((detail) => {
            const Icon = detail.icon;
            return (
              <div key={detail.label} className="app-card flex gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="mt-1 block font-medium text-slate-800 transition-colors hover:text-brand-dark"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-1 leading-relaxed text-slate-700">
                      {detail.value}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="app-card overflow-hidden p-2 lg:col-span-2">
          <Image
            src="/contact.jpg"
            alt="Холбоо барих"
            width={1000}
            height={1000}
            className="h-auto w-full rounded-xl"
          />
        </div>
      </div>
    </PageShell>
  );
}
