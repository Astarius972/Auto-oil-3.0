import { MainHeader } from "../components/cards/main-header";
import { TopBar } from "../components/cards/top-bar";
import Sidebar from "../components/sidebar";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/footer";

export default function ProcurementPage() {
  return (
    <div className="min-h-screen  text-slate-200 font-sans antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />
      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        <Sidebar />
        <main className="w-full md:w-3/4 border-8 p-6 flex flex-col items-center justify-center text-center ">
          <div className="border-b-6 border-slate-300 pb-4 mb-6 w-full flex justify-center items-center text-center">
            <h1 className="text-xl font-bold text-black">Худалдан авалт</h1>
          </div>
          <Image
            className="w-auto h-auto shadow-md mt-6"
            src="/Web_items_2017.10.06.jpg"
            alt="Procurement"
            width={1000}
            height={1000}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}
