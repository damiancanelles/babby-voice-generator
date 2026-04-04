import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Nav from "@/components/Nav";
import AuthProvider from "@/components/AuthProvider";
import LangProvider from "@/components/LangProvider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Baby Voice Generator — Gender Reveal Voice Tool | Generador de Voz de Bebé",
    template: "%s | Baby Voice Generator",
  },
  description:
    "Transform any video or audio into a magical baby voice for your gender reveal party. " +
    "Transforma cualquier video o audio en una mágica voz de bebé para tu revelación de género. " +
    "Upload, record, and download in seconds.",
  keywords: [
    // English
    "baby voice generator",
    "gender reveal voice",
    "gender reveal party",
    "baby voice changer",
    "pitch shifter baby",
    "gender reveal audio",
    "baby sound effect",
    "gender reveal idea",
    "baby voice effect",
    "voice pitch changer",
    "gender reveal tool",
    "baby shower voice",
    "funny baby voice",
    "online voice changer",
    "baby voice online",
    // Spanish
    "generador de voz de bebé",
    "revelación de género",
    "voz de bebé",
    "cambiar voz a bebé",
    "revelación de género audio",
    "baby shower voz",
    "efecto de voz bebé",
    "cambio de tono de voz",
    "herramienta revelación género",
    "voz graciosa de bebé",
    "generador voz online",
    "fiesta revelación género",
    "sorpresa de género bebé",
    "audio revelación de género",
    "voz aguda bebé",
  ],
  authors: [{ name: "Baby Voice Generator" }],
  openGraph: {
    type: "website",
    title: "Baby Voice Generator — Gender Reveal Voice Tool | Generador de Voz de Bebé",
    description:
      "Transform any video or audio into a magical baby voice for your gender reveal party. " +
      "Transforma cualquier video o audio en una mágica voz de bebé para tu revelación de género.",
    siteName: "Baby Voice Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Voice Generator — Gender Reveal Voice Tool | Generador de Voz de Bebé",
    description:
      "Transform any video or audio into a magical baby voice for your gender reveal party. " +
      "Transforma cualquier video o audio en una mágica voz de bebé para tu revelación de género.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      "en": "/",
      "es": "/",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} min-h-screen`}>
        <LangProvider>
          <AuthProvider>
            <Nav />
            <main className="max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-10">{children}</main>
          </AuthProvider>
        </LangProvider>
      </body>
    </html>
  );
}
