import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google"; // Remove Geist imports
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { Toaster } from "../components/ui/toaster";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Transformellica AI Marketing Analytics",
  description: "AI-Powered Social Media & Website Analysis",
  icons: {
    icon: "/Logo.webp",    
    shortcut: "/Logo.webp", 
    apple: "/Logo.webp", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Header/>
          {children}
          <Footer/>
          {/* <Toaster /> */}
      </body>
    </html>
  );
}
