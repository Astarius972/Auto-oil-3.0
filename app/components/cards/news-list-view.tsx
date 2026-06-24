import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface NewsListItem {
  id: number | string;
  slug?: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  fullContent: string;
  isHtml?: boolean;
}

export interface NewsListViewProps {
  items: NewsListItem[];
  basePath?: string;
  emptyMessage?: string;
}

export function NewsListView({
  items,
  basePath,
  emptyMessage = "Одоогоор нийтлэгдсэн мэдээ байхгүй байна.",
}: NewsListViewProps) {
  if (items.length === 0) {
    return (
      <div className="app-card mx-auto max-w-3xl p-8 text-center text-slate-600">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.id}
          className="app-card app-card-hover group flex flex-col overflow-hidden"
        >
          <div className="overflow-hidden">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-44 w-full bg-gradient-to-br from-slate-100 to-slate-200" />
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900">
              {item.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              {item.excerpt}
            </p>
            {basePath && item.slug ? (
              <Link
                href={`${basePath}/${item.slug}`}
                className="btn-ghost mt-auto w-max px-0 hover:bg-transparent hover:text-brand-deep"
              >
                Дэлгэрэнгүй
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
