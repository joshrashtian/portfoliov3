import type { Metadata } from "next";
import {
  Climate_Crisis,
  Gabarito,
  Google_Sans_Code,
  JetBrains_Mono,
  Lexend,
  Nunito,
  Space_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import Navigation from "./(components)/nav";
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
  variable: "--font-neue-local",
  display: "swap",
});

const mono = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "monospace"],
});

const editundo = localFont({
  src: "./(assets)/fonts/editundo.ttf",
  variable: "--font-editundo",
  display: "swap",
});

const satoshi = localFont({
  src: "./(assets)/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi-local",
  weight: "300 900",
  display: "swap",
});

const clashDisplay = localFont({
  src: "./(assets)/fonts/ClashDisplay-Variable.ttf",
  variable: "--font-clash-display-local",
  weight: "200 700",
  display: "swap",
});

const nippo = localFont({
  src: "./(assets)/fonts/Nippo-Variable.ttf",
  variable: "--font-nippo-local",
  weight: "200 700",
  display: "swap",
});

const climate_crisis = Climate_Crisis({
  variable: "--font-climate-crisis-google",
  subsets: ["latin"],
  weight: ["400"],
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
    <html
      lang="en"
      className={`${neue.variable} ${mono.variable} ${climate_crisis.variable} ${editundo.variable} ${satoshi.variable} ${clashDisplay.variable} ${nippo.variable}`}
    >
      <body className="antialiased">
        {children}
        <Navigation />
      </body>
    </html>
  );
}
