import type { Metadata } from "next";
import { Gabarito, Lexend, Nunito } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const gabarito = Nunito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const neue = localFont({
  src: [
    {
      path: "./(assets)/fonts/PPNeueMontreal-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./(assets)/fonts/PPNeueMontreal-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./(assets)/fonts/PPNeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./(assets)/fonts/PPNeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./(assets)/fonts/PPNeueMontreal-SemiBolditalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./(assets)/fonts/PPNeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joshua Rashtian | Software Engineer",
  description: "Joshua Rashtian's personal website",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${neue.className} antialiased`}>{children}</body>
    </html>
  );
}
