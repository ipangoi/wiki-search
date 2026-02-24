import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Search Engine",
  description: "Created by Engelzimmer",
};

const year = new Date().getFullYear()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="footer bg-amber-50">
            <div className="footer-content text-black">
                <p>&copy; {year} All rights reserved.</p>
                <p className="footer-tagline">Engelzimmer</p>
            </div>
        </footer>
      </body>
    </html>
  );
}
