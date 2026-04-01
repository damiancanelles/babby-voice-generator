import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Nav from "@/components/Nav";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Baby Voice Generator",
  description: "Process videos and generate baby voice audio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} min-h-screen`}>
        <AuthProvider>
          <Nav />
          <main className="max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-10">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
