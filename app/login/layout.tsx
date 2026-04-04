import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Iniciar Sesión",
  description:
    "Sign in to Baby Voice Generator to start creating baby voice audio for your gender reveal party. " +
    "Inicia sesión en el Generador de Voz de Bebé para crear audio de voz de bebé para tu revelación de género.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
