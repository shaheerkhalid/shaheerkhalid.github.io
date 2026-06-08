import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UAE Classifieds — Buy & Sell in the UAE",
    template: "%s | UAE Classifieds",
  },
  description:
    "Free classifieds in the UAE. Browse cars, apartments, electronics, jobs, furniture, and more across Dubai, Abu Dhabi, Sharjah, and all emirates.",
  keywords: [
    "UAE classifieds",
    "Dubai classifieds",
    "buy sell UAE",
    "used cars Dubai",
    "apartments Dubai",
    "jobs UAE",
  ],
  openGraph: {
    title: "UAE Classifieds",
    description: "Free classifieds in the UAE. Buy and sell anything.",
    type: "website",
    locale: "en_AE",
    siteName: "UAE Classifieds",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-slate-950 text-white antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
