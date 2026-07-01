"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin, Navigation, Phone } from "lucide-react";
import type { BranchCardData } from "@/lib/cms-branch";
import { BranchMap } from "./branch-map";

type BranchLocatorProps = {
  branches: BranchCardData[];
  title: string;
  description?: string;
};

function getPrimaryPhone(phone: string): string {
  const first = phone.split(/[,;]/)[0]?.trim() ?? "";
  return first.replace(/[^\d+]/g, "");
}

export function BranchLocator({
  branches,
  title,
  description,
}: BranchLocatorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    branches[0]?.id ?? null,
  );

  return (
    <div className="flex min-h-[calc(100dvh-var(--header-height))] flex-col bg-white lg:h-[calc(100dvh-var(--header-height))] lg:overflow-hidden">
      <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white lg:min-h-0 lg:w-[min(100%,440px)] lg:overflow-y-auto lg:border-b-0 lg:border-r xl:w-[480px]">
          <div className="max-h-[420px] overflow-y-auto p-4 sm:p-5 lg:max-h-none">
            <div className="space-y-4">
              {branches.map((branch, index) => {
                const isSelected = branch.id === selectedId;
                const phoneHref = getPrimaryPhone(branch.phone);
                const mapUrl = branch.locationUrl.trim();

                return (
                  <article
                    key={branch.id}
                    className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                      isSelected
                        ? "border-brand-accent shadow-md ring-1 ring-brand-accent/20"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(branch.id)}
                      className="w-full text-left"
                    >
                      <div className="flex gap-4 p-4">
                        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          {branch.imageUrl ? (
                            <Image
                              src={branch.imageUrl}
                              alt={branch.title}
                              fill
                              unoptimized={branch.imageUrl.startsWith("http")}
                              className="object-cover"
                              sizes="112px"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-slate-400">
                              <MapPin className="h-6 w-6" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Салбар #{index + 1}
                          </p>
                          <h2 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-slate-900">
                            {branch.title}
                          </h2>
                          {branch.schedule ? (
                            <p className="mt-2 text-sm font-semibold text-brand-accent">
                              {branch.schedule}
                            </p>
                          ) : null}
                          {branch.address ? (
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                              {branch.address}
                            </p>
                          ) : null}
                          {branch.phone ? (
                            <p className="mt-2 text-sm font-semibold text-brand-accent">
                              {branch.phone}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </button>

                    <div className="grid grid-cols-2 gap-2 border-t border-slate-100 px-4 py-3 sm:grid-cols-3">
                      {phoneHref ? (
                        <a
                          href={`tel:${phoneHref}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-brand hover:text-brand-dark"
                        >
                          <Phone className="h-4 w-4" />
                          Залгах
                        </a>
                      ) : null}
                      {mapUrl ? (
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-brand hover:text-brand-dark"
                        >
                          <Navigation className="h-4 w-4" />
                          Зам заах
                        </a>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setSelectedId(branch.id)}
                        className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-brand hover:text-brand-dark sm:col-span-1"
                      >
                        <MapPin className="h-4 w-4" />
                        Газрын зураг
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="branch-map-host relative isolate z-0 min-h-[360px] w-full flex-1 bg-slate-100 p-0 lg:min-h-0 lg:overflow-hidden lg:p-4">
          <BranchMap
            branches={branches}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </section>
      </div>
    </div>
  );
}
