import { Syne, Inter } from "next/font/google";
import "./globals.css";
const syne = Syne({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-syne" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-inter" });
export const metadata = { title: "Rommar T. Samonte | Portfolio" };
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${syne.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
