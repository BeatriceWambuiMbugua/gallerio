import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import NextAuthProvider from "./context/NextAuthProvider";
import "./globals.css";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gallerio",
  description: "Visual World Exploration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
