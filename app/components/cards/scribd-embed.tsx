type ScribdEmbedProps = {
  documentId: string;
  secretPassword?: string;
  title: string;
};

export function ScribdEmbed({
  documentId,
  secretPassword,
  title,
}: ScribdEmbedProps) {
  const params = new URLSearchParams({
    start_page: "1",
    view_mode: "scroll",
  });

  if (secretPassword) {
    params.set("secret_password", secretPassword);
  }

  const embedUrl = `https://www.scribd.com/embeds/${documentId}/content?${params.toString()}`;
  const viewUrl = `https://www.scribd.com/document/${documentId}/Luxe?secret_password=${secretPassword ?? ""}`;

  return (
    <div className="w-full max-w-3xl space-y-3">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <iframe
          src={embedUrl}
          title={title}
          className="h-[50vh] min-h-[320px] w-full border-0 sm:h-[600px]"
          allowFullScreen
        />
      </div>
      <a
        href={viewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-blue-600 hover:text-blue-800"
      >
        PDF-ийг шинэ цонхонд нээх →
      </a>
    </div>
  );
}
