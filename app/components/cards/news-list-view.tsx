"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface NewsListItem {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  fullContent: string;
}

export interface NewsListViewProps {
  items: NewsListItem[];
}

export function NewsListView({ items }: NewsListViewProps) {
  const [selectedNews, setSelectedNews] = useState<NewsListItem | null>(null);

  if (selectedNews) {
    return (
      <article className="app-card mx-auto max-w-3xl p-6 sm:p-8 animate-fade-in-up">
        <button
          type="button"
          onClick={() => setSelectedNews(null)}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-deep"
        >
          <ArrowLeft size={16} />
          Буцах
        </button>
        <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          {selectedNews.title}
        </h2>
        <img
          src={selectedNews.imageUrl}
          alt={selectedNews.title}
          className="mt-6 h-64 w-full rounded-xl object-cover"
        />
        <p className="mt-6 text-base leading-relaxed text-slate-700">
          {selectedNews.fullContent}
        </p>
      </article>
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
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900">
              {item.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              {item.excerpt}
            </p>
            <button
              type="button"
              onClick={() => setSelectedNews(item)}
              className="btn-ghost mt-auto w-max px-0 hover:bg-transparent hover:text-brand-deep"
            >
              Дэлгэрэнгүй
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
