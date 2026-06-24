export interface Brand {
  slug: string;
  name: string;
  imageUrl: string;
  description: string;
  contentHtml?: string;
  galleryImages?: string[];
  pdfUrl?: string;
  scribdDocumentId?: string;
  scribdSecretPassword?: string;
}
