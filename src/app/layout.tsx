import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SiteBackground from "./components/SiteBackground";
import PageTransition from "./components/PageTransition";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // TODO: replace with real domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Beanutts Games",
    template: "%s — Beanutts Games",
  },
  description:
    "Beanutts Games is a solo indie studio making atmospheric horror games, including The Last Wait. Follow development, devlogs, and releases.",
  keywords: [
    "Beanutts Games",
    "indie horror game",
    "solo dev",
    "The Last Wait",
    "psychological horror game",
    "indie game studio",
  ],
  authors: [{ name: "Beanutts Games" }],
  creator: "Beanutts Games",
  publisher: "Beanutts Games",

  applicationName: "Beanutts Games",
  category: "Video Games",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Beanutts Games",
    title: "Beanutts Games — Indie Game Studio",
    description:
      "Solo indie studio making atmospheric horror games. Follow development, devlogs, and releases.",
    images: [
      {
        url: "/images/BeanuttsGames_Logo_Transparent.png",
        width: 1200,
        height: 630,
        alt: "Beanutts Games logo",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@Beanuttsss",
    creator: "@Beanuttsss",
    title: "Beanutts Games — Indie Game Studio",
    description:
      "Solo indie studio making atmospheric horror games. Follow development, devlogs, and releases.",
    images: ["/images/BeanuttsGames_Logo_Transparent.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SiteBackground />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
