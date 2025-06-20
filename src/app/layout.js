'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import StarryBackground from '@/components/StarryBackground';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = !pathname.includes('/learncourse');

  return (
    <html lang="en">
      <head>
        <title>EduStake</title>
        <link rel="icon" href="../assets/logo.png" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        {showNavbar && <Navbar />}
        <StarryBackground />
        {children}
        <Footer />
        </AuthProvider>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark" // optional: dark/light/colored
      />
      </body>
    </html>
  );
}