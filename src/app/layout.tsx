import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chhaayachitrakaar.vercel.app"),
  title: "Chhaayachitrakaar | Cinematic Wedding Photography",
  description:
    "A premium wedding photography studio crafting intimate, editorial, and cinematic stories across India and destination celebrations.",
  openGraph: {
    title: "Chhaayachitrakaar | Cinematic Wedding Photography",
    description:
      "Elegant wedding photography shaped by light, emotion, family, and story.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 900,
        alt: "Cinematic wedding couple portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chhaayachitrakaar | Cinematic Wedding Photography",
    description:
      "Elegant wedding photography shaped by light, emotion, family, and story.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
