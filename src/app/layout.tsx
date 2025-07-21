"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname.startsWith("/login");
  const isSignup = pathname.startsWith("/signup");
  const isVerifyOtp = pathname.startsWith("/verify-otp");
  const isForgotPassword = pathname.startsWith("/forgot-password");
  const isResetPassword = pathname.startsWith("/reset-password");

  const shouldHideLayout =
    isDashboard ||
    isLogin ||
    isSignup ||
    isVerifyOtp ||
    isForgotPassword ||
    isResetPassword;

  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!shouldHideLayout && <Navbar />}
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        {!shouldHideLayout && <Footer />}
      </body>
    </html>
  );
}
