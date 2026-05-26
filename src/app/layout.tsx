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
  title: "Alejandro Vázquez | Software Developer",
  description:
    "Portfolio de Alejandro Vázquez, desarrollador de software. Proyectos en TypeScript, Python, React, Next.js y más.",
  openGraph: {
    title: "Alejandro Vázquez | Software Developer",
    description:
      "Desarrollador de software con proyectos en TypeScript, Python, React, Next.js y FastAPI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#030712] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
