import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import Provider from "@/lib/Provider";
import { Toaster } from "@/components/ui/Toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col ">
      <Navbar />
      {children}
      <Toaster />
      <Footer />
    </div>
  );
}
