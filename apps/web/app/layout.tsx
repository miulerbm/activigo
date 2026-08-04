import type { Metadata } from "next";
import Link from "next/link";
import { CalendarHeart } from "lucide-react";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemedToaster } from "./components/ThemedToaster";

export const metadata: Metadata = {
  title: "Activigo",
  description: "Actividades recreativas para el grupo",
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
                <Link
                  href="/admin/login"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  Admin
                </Link>
                <ThemeToggle />
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
