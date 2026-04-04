import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Nav from "@/components/Nav";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Baby Voice Generator — Gender Reveal Voice Tool",
    template: "%s | Baby Voice Generator",
  },
  description:
    "Transform any video or audio clip into a magical baby voice for your gender reveal moment. Upload, record, and download in seconds.",
  keywords: ["baby voice", "gender reveal", "voice generator", "pitch shifter", "baby voice changer"],
  authors: [{ name: "Baby Voice Generator" }],
  openGraph: {
    type: "website",
    title: "Baby Voice Generator — Gender Reveal Voice Tool",
    description:
      "Transform any video or audio clip into a magical baby voice for your gender reveal moment.",
    siteName: "Baby Voice Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Voice Generator — Gender Reveal Voice Tool",
    description:
      "Transform any video or audio clip into a magical baby voice for your gender reveal moment.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
