import type { Metadata } from "next";
import { Gabarito, Lexend, Nunito } from "next/font/google";
import "./globals.css";

const gabarito = Nunito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      <body className={`${gabarito.className} antialiased`}>{children}</body>
    </html>
  );
}
