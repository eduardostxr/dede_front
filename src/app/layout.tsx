import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Cartas de Futebol",
  description: "Compra e venda de cartas de futebol",
  keywords: ['marketplace', 'cartas', 'futebol', 'coleção']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
