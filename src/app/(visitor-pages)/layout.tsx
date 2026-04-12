import Navbar from "@/components/widgets/Navbar";
import Footer from "@/components/widgets/Footer";
import ProgressBarProvider from "./ProgressBarProvider";

export default function VisitorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgressBarProvider>
      <div className="relative flex w-screen min-h-screen justify-center items-stretch flex-col">
        <Navbar />
        <main className="flex w-full flex-1 flex-col justify-start items-start z-10">{children}</main>
        <Footer />
      </div>
    </ProgressBarProvider>
  );
}
