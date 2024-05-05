import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col ">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
