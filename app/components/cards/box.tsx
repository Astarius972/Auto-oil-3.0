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
    <div className="border w-[350px] h-[590px] rounded-lg p-4 shadow-md bg-white">
      <Image
        src={imageUrl}
        alt={title}
        width={700}
        height={700}
        className="w-full h-48 object-cover rounded-md shadow-md mt-4"
      />

      <h2 className="text-xl font-bold text-blue-900">{title}</h2>

      <div className="mt-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-blue-800 font-semibold">
            <MapPin size={18} className="text-red-600" />
            <span>Address</span>
          </div>
          <p className="text-gray-700 ml-7">{address}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-blue-800 font-semibold">
            <Phone size={18} className="text-red-600" />
            <span>Phone</span>
          </div>
          <p className="text-gray-700 ml-7">{phone}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-blue-800 font-semibold">
            <Clock size={18} className="text-red-600" />
            <span>Schedule</span>
          </div>
          <p className="text-gray-700 ml-7">{schedule}</p>
        </div>
      </div>
    </div>
  );
}
