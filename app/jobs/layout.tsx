import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Recordings | Mis Grabaciones",
  description:
    "View and manage your baby voice recordings and gender reveal audio jobs. " +
    "Ver y gestionar tus grabaciones de voz de bebé y trabajos de audio para revelación de género.",
  robots: { index: false, follow: false },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
