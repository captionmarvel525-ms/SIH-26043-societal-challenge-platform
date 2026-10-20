"use client";

import Link from "next/link";
import { useReports } from "@/components/providers";
import ReportCard from "@/components/report-card";
import { useI18n } from "@/components/language-provider";

export default function RecentReports() {
  const { reports } = useReports();
  const { t } = useI18n();
  const recent = reports.slice(0, 6);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{t("home.recent.h2")}</h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            {t("home.recent.p")}
          </p>
        </div>
        <Link
          href="/challenges"
          className="text-xs sm:text-sm font-bold text-[#0B5345] dark:text-emerald-400 hover:underline"
        >
          {t("home.recent.viewAll")}
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recent.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}
