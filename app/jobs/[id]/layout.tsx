import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recording Details",
  description: "View the status and download your baby voice audio recording.",
  robots: { index: false, follow: false },
};

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return children;
}
