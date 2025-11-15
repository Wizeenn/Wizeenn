import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wizeenn · Pilotage TVA temps réel",
  description: "SaaS Next.js + Supabase pour cabinets comptables.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.className} suppressHydrationWarning>
      <body className={cn("bg-background text-foreground antialiased")}>
        {children}
      </body>
    </html>
  );
}
