import Image from "next/image";

type BrandGalleryProps = {
  images: string[];
  alt: string;
};

export function BrandGallery({ images, alt }: BrandGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col gap-4">
        {images.map((src) => (
          <div
            key={src}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              unoptimized={src.startsWith("http")}
              className="h-auto w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
