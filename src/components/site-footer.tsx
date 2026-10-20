"use client";

import Link from "next/link";
import { useI18n } from "@/components/language-provider";

export default function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="bg-[#073B31] text-[#E8F8F5] border-t border-[var(--border)] mt-auto py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm text-amber-400">CIVICFORCE</span>
          <span>{t("footer.network")}</span>
        </div>
        <div className="flex gap-4 text-emerald-200">
          <Link href="/privacy" className="hover:underline">
            {t("footer.privacy")}
          </Link>
          <Link href="/terms" className="hover:underline">
            {t("footer.terms")}
          </Link>
          <Link href="/challenges" className="hover:underline">
            {t("footer.register")}
          </Link>
        </div>
        <div className="text-emerald-300">{t("footer.rights")}</div>
      </div>
    </footer>
  );
}
