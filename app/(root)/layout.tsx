import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import Provider from "@/lib/Provider";
import { Toaster } from "@/components/ui/Toaster";
import { auth } from "@clerk/nextjs/server";
import { userPermissions } from "@/lib/actions/user.actions";
import NextNProgress from "nextjs-progressbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = await auth();
  const userId = (await sessionClaims?.userId) as string;
  const display = (await userPermissions(userId)) as boolean;

  return (
    <div className="flex h-full flex-col  ">
      <Navbar display={display} />
      {children}
      <Toaster />
      <Footer />
    </div>
  );
}
