type CmsPostGalleryProps = {
  images: Array<{ url: string; alt: string }>;
};

export function CmsPostGallery({ images }: CmsPostGalleryProps) {
  if (images.length === 0) return null;

  const [featured, ...rest] = images;

  return (
    <>
      <div className="app-card mt-6 overflow-hidden p-2">
        <img
          src={featured.url}
          alt={featured.alt}
          className="h-auto w-full rounded-xl"
        />
      </div>

      {rest.length > 0 ? (
        <div className="mt-6">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {rest.map((image, index) => (
              <div
                key={`${image.url}-${index}`}
                className="w-[300px] flex-none snap-center"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-auto w-full rounded-xl border border-slate-200 shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
