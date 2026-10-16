import type { Metadata } from "next";
import { Anton_SC, Beth_Ellen, Asap_Condensed, Ballet } from "next/font/google"; // Trocado Ballet por Beth_Ellen
import "./globals.css";

// 1. Configurando as fontes
const anton = Anton_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton-next",
});

// Substituindo a Ballet pela Beth Ellen
const bethEllen = Beth_Ellen({
  subsets: ["latin"],
  weight: "400", // Beth Ellen só tem esse peso
  variable: "--font-beth-ellen-next", 
});

const ballet = Ballet({
  subsets: ["latin"],
  variable: "--font-ballet-next", // MUDOU AQUI
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