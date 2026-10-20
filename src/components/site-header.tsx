"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";
import { useTheme } from "@/components/theme-provider";
import { useI18n } from "@/components/language-provider";
import { LANGUAGES, type Lang } from "@/lib/i18n";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useI18n();

  const tabClass = (active: boolean) =>
    active
      ? "px-3.5 py-2 rounded-lg bg-[#0B5345] text-white font-bold"
      : "px-3.5 py-2 rounded-lg hover:bg-[var(--secondary)] text-[var(--foreground)] font-bold";

  const controlClass =
    "border border-[var(--border)] hover:bg-[var(--secondary)] text-[var(--foreground)] font-bold rounded-xl";

  const handleAuthButtonClick = () => {
    if (isAdmin) {
      logout();
      alert("You have signed out. Admin queue is now locked.");
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="bg-[var(--card)] border-b border-[var(--border)] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center gap-2 sm:gap-4">
        {/* Brand Logo & Titles */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B5345] to-[#073B31] flex items-center justify-center text-amber-400 font-black text-xl border-2 border-amber-400 shadow-md">
            CF
          </div>
          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl text-[#0B5345] dark:text-emerald-400 tracking-tight">
                CIVICFORCE
              </span>
              <span className="bg-amber-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide">
                TN
              </span>
            </div>
            <span className="text-xs text-[var(--muted-foreground)] font-semibold">
              {t("header.tagline")}
            </span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-bold">
          <Link href="/" className={tabClass(pathname === "/")}>
            {t("nav.home")}
          </Link>
          <Link href="/challenges" className={tabClass(pathname === "/challenges")}>
            {t("nav.challenges")}
          </Link>
          <Link href="/map" className={tabClass(pathname === "/map")}>
            <span>🗺️</span> {t("nav.map")}
          </Link>
          <Link
            href={isAdmin ? "/admin" : "/login"}
            className={tabClass(pathname === "/admin")}
          >
            <span>🛡️</span> {t("nav.admin")}
          </Link>
        </nav>

        {/* Action, Theme, Language & Auth Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? t("header.themeToLight")
                : t("header.themeToDark")
            }
            title={
              theme === "dark"
                ? t("header.themeToLight")
                : t("header.themeToDark")
            }
            className={`${controlClass} px-2 py-2 text-sm leading-none`}
          >
            <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
          </button>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            aria-label={t("header.language")}
            title={t("header.language")}
            className={`${controlClass} px-1.5 sm:px-2 py-2 text-[11px] sm:text-xs bg-[var(--card)] cursor-pointer`}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>

          <Link
            href="/report"
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition-transform hover:scale-[1.02]"
          >
            <span>✍️</span> <span className="hidden sm:inline">{t("header.report")}</span>
          </Link>
          <button
            onClick={handleAuthButtonClick}
            className={`${controlClass} text-xs sm:text-sm px-2.5 sm:px-3 py-2`}
          >
            {isAdmin ? (
              <>
                🚪 <span className="hidden sm:inline">{t("header.signOut")}</span>
              </>
            ) : (
              <>
                🔐 <span className="hidden sm:inline">{t("header.signIn")}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
