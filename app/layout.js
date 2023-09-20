import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react"
import NextAuthProvider from "./context/NextAuthProvider";

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
        
        {children}
        </NextAuthProvider>
        
      
       
      </body>
    </html>
  );
}
