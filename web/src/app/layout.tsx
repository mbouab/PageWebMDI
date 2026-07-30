import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getStructuredData } from "@/lib/structuredData";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export { metadata } from "./metadata";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-data",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getStructuredData()),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} bg-cream font-body text-ink antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
