type PdfEmbedProps = {
  url: string;
  title: string;
};

export function PdfEmbed({ url, title }: PdfEmbedProps) {
  return (
    <div className="w-full max-w-3xl space-y-3">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <iframe
          src={url}
          title={title}
          className="h-[600px] w-full border-0"
        />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-blue-600 hover:text-blue-800"
      >
        PDF-ийг шинэ цонхонд нээх →
      </a>
    </div>
  );
}
