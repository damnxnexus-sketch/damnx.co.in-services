import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DamnxLanding from './components/HeroSection';
import Footer from './components/Footer';
import DamnxHeader from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DAMNX Solutions - Custom Software Development",
  description: "Damnx Solutions delivers custom websites, mobile apps, web applications, and software development services. Transform your ideas into powerful digital solutions. Get started today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <DamnxHeader />
        <DamnxLanding />
        <Footer />
      </body>
    </html>
  );
}
