import Footer from "../components/footer";
import { TopBar } from "../components/cards/top-bar";
import { MainHeader } from "../components/cards/main-header";
import Sidebar from "../components/sidebar";

export default function JobsPage() {
  return (
    <div className="min-h-screen  text-slate-200 font-sans antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />
      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        <Sidebar />
        <main className="w-full md:w-3/4 border-8 p-6">
          <h1 className="text-xl font-bold border-b text-black border-slate-300 pb-4 mb-6">
            Ажлын байр
          </h1>
        </main>
      </div>
      <Footer />
    </div>
  );
}