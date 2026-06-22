import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";

type InfoBoxProps = {
  title: string;
  imageUrl: string;
  address: string;
  phone: string;
  schedule: string;
};

export default function InfoBox({
  title,
  imageUrl,
  address,
  phone,
  schedule,
}: InfoBoxProps) {
  return (
    <article className="app-card app-card-hover group flex h-full w-full flex-col overflow-hidden">
      <div className="overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={700}
          height={700}
          unoptimized={imageUrl.startsWith("http")}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-base font-bold leading-snug text-blue-900 sm:text-lg">
          {title}
        </h2>

        <div className="mt-4 space-y-4 text-sm">
          <div>
            <div className="flex items-center gap-2 font-semibold text-blue-800">
              <MapPin size={16} className="shrink-0 text-red-600" />
              <span>Хаяг</span>
            </div>
            <p className="ml-6 mt-1 leading-relaxed text-slate-600">{address}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold text-blue-800">
              <Phone size={16} className="shrink-0 text-red-600" />
              <span>Утас</span>
            </div>
            <p className="ml-6 mt-1 text-slate-600">{phone}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold text-blue-800">
              <Clock size={16} className="shrink-0 text-red-600" />
              <span>Цагийн хуваарь</span>
            </div>
            <p className="ml-6 mt-1 text-slate-600">{schedule}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
