import Link from "next/link";
import { MainHeader } from "../components/cards/main-header";
import { TopBar } from "../components/cards/top-bar";
import Sidebar from "../components/sidebar";
import Image from "next/image";
import Footer from "../components/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen  text-slate-200 font-sans antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />
      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        <Sidebar />
        <main className="w-full md:w-3/4 border-8 p-6">
          <h1 className="text-xl font-bold border-b text-black border-slate-300 pb-4 mb-6">
            Холбоо барих
          </h1>
          <Image
            src="/contact.jpg"
            alt="Contact"
            width={1000}
            height={1000}
            className="w-auto h-auto shadow-md mt-6"
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}
