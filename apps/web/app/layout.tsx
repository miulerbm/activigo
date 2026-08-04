import type { Metadata } from "next";
import Link from "next/link";
import { CalendarHeart, Lock } from "lucide-react";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemedToaster } from "./components/ThemedToaster";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Activigo",
  description: "Actividades recreativas para el grupo",
  openGraph: {
    title: "Activigo",
    description: "Actividades recreativas para el grupo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Activigo",
    description: "Actividades recreativas para el grupo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-lg font-bold text-slate-900 dark:text-slate-100"
              >
                <CalendarHeart className="h-5 w-5" />
                Activigo
              </Link>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                <Link
                  href="/sugerencias"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  Sugerir actividad
                </Link>
                <ThemeToggle />
                <Link
                  href="/admin/login"
                  title="Solo dale acá si eres molver :v"
                  aria-label="Admin"
                  className="text-slate-300 hover:text-slate-500 dark:text-slate-700 dark:hover:text-slate-500"
                >
                  <Lock className="h-3.5 w-3.5" />
                </Link>
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
          <ThemedToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
