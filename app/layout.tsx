import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/Toaster";

import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Words & Strings",
  description: "Spoken Word & Poetry in Qatar",
  icons: {
    icon: "/assets/images/was.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={poppins.variable}>
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
