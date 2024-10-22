import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./header/header";
import { Toaster } from "@/components/ui/toaster"
import Footer from "./(footer)/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fail archive",
  description: "Share your fail cases. Search other's fail cases with tags.",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <Header/>
        <main className="w-10/12 md:w-7/12 mx-auto">
          {children}
        </main>
        <Footer/>
        <Toaster/>
      </body>
    </html>
  );
}
