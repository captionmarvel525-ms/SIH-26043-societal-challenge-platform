import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import PlatformBar from "@/components/platform-bar";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIVICFORCE | Tamil Nadu Societal Problem & Resolution Engine",
  description:
    "CIVICFORCE connects citizen-reported societal issues directly with leading universities, corporate industry R&D, and municipal departments across Tamil Nadu.",
};

// Applies the stored (or OS-preferred) theme before first paint so there is no
// light/dark flash. Mirrors the logic in ThemeProvider. See Next.js docs:
// node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("civicforce-theme");var d=s==="dark"||s==="light"?s:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var e=document.documentElement;if(d==="dark")e.classList.add("dark");else e.classList.remove("dark");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <Providers>
          {/* Top Ribbon */}
          <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-emerald-400 to-teal-800" />

          {/* Official Platform Bar */}
          <PlatformBar />

          {/* Main Navigation Header.
              SiteHeader reads the pathname with usePathname(), which cannot be
              resolved while prerendering dynamic routes ([id]) — it streams in
              behind Suspense with a same-height fallback to avoid layout shift. */}
          <Suspense
            fallback={
              <header className="bg-[var(--card)] border-b border-[var(--border)] sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B5345] to-[#073B31] flex items-center justify-center text-amber-400 font-black text-xl border-2 border-amber-400 shadow-md">
                      CF
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-xl text-[#0B5345] dark:text-emerald-400 tracking-tight">
                          CIVICFORCE
                        </span>
                        <span className="bg-amber-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide">
                          TN
                        </span>
                      </div>
                      <span className="text-xs text-[var(--muted-foreground)] font-semibold">
                        Tamil Nadu Societal Problem & Resolution Engine
                      </span>
                    </div>
                  </div>
                  <div className="w-40 h-9 rounded-xl bg-[var(--secondary)]" />
                </div>
              </header>
            }
          >
            <SiteHeader />
          </Suspense>

          {/* Prototype View Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">{children}</main>

          {/* Footer */}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
