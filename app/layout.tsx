import type { Metadata } from "next";
import { Playfair_Display_SC, Inter, Tangerine } from "next/font/google";
import "./globals.css";

const playfairDisplaySC = Playfair_Display_SC({
  variable: "--font-playfair-display-sc",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const tangerine = Tangerine({
  variable: "--font-tangerine",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shadentolu.com"),
  title: {
    default: "Shade & Tolu Wedding - December 26, 2024 | Lagos, Nigeria",
    template: "%s | Shade & Tolu Wedding",
  },
  description:
    "Join us as we celebrate the union of Shade and Tolu on December 26, 2024, in Lagos, Nigeria. RSVP, view our love story, explore wedding details, travel guide, and more.",
  keywords: [
    "wedding",
    "Shade and Tolu",
    "Lagos wedding",
    "Nigeria wedding",
    "December 26 2024",
    "wedding RSVP",
    "wedding invitation",
    "Lagos Nigeria",
    "destination wedding",
    "African wedding",
  ],
  authors: [{ name: "Shade & Tolu" }],
  creator: "Shade & Tolu",
  publisher: "Shade & Tolu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shadentolu.com",
    siteName: "Shade & Tolu Wedding",
    title: "Shade & Tolu Wedding - December 26, 2024",
    description:
      "Join us as we celebrate our love on December 26, 2024, in Lagos, Nigeria. Share in our joy as we begin our journey together.",
    images: [
      {
        url: "/first.jpg",
        width: 1200,
        height: 630,
        alt: "Shade & Tolu Wedding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shade & Tolu Wedding - December 26, 2024",
    description:
      "Join us as we celebrate our love on December 26, 2024, in Lagos, Nigeria.",
    images: ["/first.jpg"],
    creator: "@shadentolu",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://shadentolu.com",
  },
};

import { SmoothScroll } from "@/src/ui/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfairDisplaySC.variable} ${inter.variable} ${tangerine.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
