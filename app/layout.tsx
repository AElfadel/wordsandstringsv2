import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/Toaster";
import Provider from "@/lib/Provider";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Words & Strings",
  description: "Spoken Word & Poetry in Qatar",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.variable, "bg-black")}>
        <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  );
}
