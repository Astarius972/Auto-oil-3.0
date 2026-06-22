export type JobsContactInfo = {
  intro: string;
  phone: string;
  email: string;
};

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

export function parseJobsContact(
  content?: string | null,
  excerpt?: string | null,
): JobsContactInfo {
  const text = [excerpt, stripHtml(content ?? "")].filter(Boolean).join("\n");

  const intro =
    text.match(/Та бүхэн[^\n]+/)?.[0]?.trim() ||
    "Та бүхэн дараах хаягаар холбогдоно уу.";

  const phone =
    text.match(/Утас:\s*([^\n]+)/i)?.[1]?.trim().replace(/\s+/g, " ") || "";

  const email =
    text.match(/И-мэйл:\s*([^\s\n\[]+)/i)?.[1]?.trim() ||
    text.match(/mailto:([^"'\s>]+)/i)?.[1]?.trim() ||
    "info@auto-oil.mn";

  return { intro, phone, email };
}

export function phoneToTel(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
