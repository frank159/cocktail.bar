import type { Metadata } from "next";
import { Anton_SC, Beth_Ellen, Asap_Condensed, Ballet } from "next/font/google";
import "./globals.css";


const anton = Anton_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton-next",
});

const bethEllen = Beth_Ellen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-beth-ellen-next",
});

const ballet = Ballet({
  subsets: ["latin"],
  variable: "--font-ballet-next",
});


const asap = Asap_Condensed({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-asap-next",
});

export const metadata: Metadata = {
  title: "Seu Cocktail Bar",
  description: "O melhor cocktail bar da cidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${anton.variable} ${bethEllen.variable} ${ballet.variable} ${asap.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}