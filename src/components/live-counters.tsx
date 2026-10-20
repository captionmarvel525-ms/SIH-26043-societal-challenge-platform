"use client";

import { useReports } from "@/components/providers";
import { useI18n } from "@/components/language-provider";

export default function LiveCounters() {
  const { reports } = useReports();
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
        <div className="text-3xl font-black text-[var(--foreground)]" id="stat-total">
          {reports.length}
        </div>
        <div className="text-xs sm:text-sm text-[var(--muted-foreground)] font-semibold mt-1">
          {t("home.stat.total")}
        </div>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
        <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">2</div>
        <div className="text-xs sm:text-sm text-[var(--muted-foreground)] font-semibold mt-1">
          {t("home.stat.resolved")}
        </div>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
        <div className="text-3xl font-black text-amber-600 dark:text-amber-400">6</div>
        <div className="text-xs sm:text-sm text-[var(--muted-foreground)] font-semibold mt-1">
          {t("home.stat.districts")}
        </div>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
        <div className="text-3xl font-black text-blue-600 dark:text-blue-400">86%</div>
        <div className="text-xs sm:text-sm text-[var(--muted-foreground)] font-semibold mt-1">
          {t("home.stat.rate")}
        </div>
      </div>
    </div>
  );
}
