import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Авто Ойл — Тос, тосолгооны материал, авто үйлчилгээ",
    template: "%s | Авто Ойл",
  },
  description:
    "АВТО ОЙЛ ХХК — Shell, LUXE, Mannol, Deluxe зэрэг дэлхийн тэргүүлэгч брэндүүдийн тос тосолгооны материал, дугуй, аккумулятор, автохимийн албан ёсны дистрибьютер.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
