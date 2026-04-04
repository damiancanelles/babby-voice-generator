import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Recordings",
  description: "View and manage your baby voice recordings and gender reveal audio jobs.",
  robots: { index: false, follow: false },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
