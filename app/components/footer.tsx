import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b0f16] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 uppercase">Үндсэн Цэс</h3>

            <div className="space-y-4">
              <Link
                href="/about"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                About Us
              </Link>

              <Link
                href="/branch"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                Location
              </Link>

              <Link
                href="/products"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                Products
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                Contact
              </Link>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 uppercase">Мэдээ</h3>

            <div className="space-y-4">
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                Lux Мэдээ
              </Link>

              <Link
                href="#"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                Авто Зөвлөгөө
              </Link>

              <Link
                href="#"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                Хууль Зүйн Зөвлөгөө
              </Link>

              <Link
                href="#"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                Авто Мэдлэг
              </Link>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 uppercase">
              Бидний Тухай
            </h3>

            <div className="space-y-4">
              <Link
                href="/brand"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                Брэндүүд
              </Link>

              <Link
                href="/branch"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                Салбар Дэлгүүрүүд
              </Link>

              <Link
                href="/procurement"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <ChevronRight size={16} />
                Худалдан Авалт
              </Link>
            </div>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 uppercase">Холбогдох</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-red-600 h-9 p-2 rounded">
                  <MapPin size={18} />
                </div>

                <p className="text-slate-300 leading-7">
                  Улаанбаатар хот, 18080, Сонгинохайрхан дүүрэг, 18-р хороо,
                  Энхтайваны өргөн чөлөө-163
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-600 p-2 rounded">
                  <Phone size={18} />
                </div>

                <a
                  href="tel:70070088"
                  className="hover:text-blue-400 transition"
                >
                  70070088
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-600 p-2 rounded">
                  <Mail size={18} />
                </div>

                <a
                  href="mailto:info@auto-oil.mn"
                  className="hover:text-blue-400 transition"
                >
                  info@auto-oil.mn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-14 pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-slate-400 text-sm text-center lg:text-left flex items-center justify-center gap-4">
              © 2024 Зохиогчийн эрх хуулиар хамгаалагдсан.
              <Image
                src="/webecom.png"
                alt="Webecom Agency"
                width={90}
                height={24}
                className="h-5 w-auto object-contain"
              />
              <Image
                src="/footer-logo.png"
                alt="Auto Oil"
                width={72}
                height={28}
                className="h-6 w-auto object-contain"
              />
            </div>

            <div className="flex items-center justify-center gap-3 lg:justify-end">
              <Image
                src="/visa.png"
                alt="Visa"
                width={40}
                height={24}
                className="h-3 w-auto object-contain"
              />
              <Image
                src="/master.png"
                alt="Mastercard"
                width={40}
                height={24}
                className="h-5 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
