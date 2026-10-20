"use client";

import Link from "next/link";
import { STATUS_BADGE_CLASSES, type Report } from "@/lib/data";
import { useI18n } from "@/components/language-provider";
import { categoryKey, statusKey } from "@/lib/i18n";

export default function ReportCard({ report }: { report: Report }) {
  const { t } = useI18n();

  const urgencyBadge =
    report.urgency === "High" ? (
      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
        ⚡ {t("urg.high")}
      </span>
    ) : (
      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--secondary)] text-[var(--muted-foreground)]">
        {t("urg.normal")}
      </span>
    );

  const statusBadge = (
    <span
      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
        STATUS_BADGE_CLASSES[report.status] || "bg-gray-100"
      }`}
    >
      {t(statusKey(report.status)) || report.status}
    </span>
  );

  return (
    <Link
      href={`/challenges/${report.id}`}
      className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center gap-2 mb-2">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[var(--secondary)] text-[var(--foreground)]">
            {t(categoryKey(report.category)) || report.category}
          </span>
          {urgencyBadge}
        </div>
        <h3 className="font-bold text-sm text-[var(--foreground)] mb-1 line-clamp-2">
          {report.title}
        </h3>
        <p className="text-xs text-[var(--muted-foreground)] line-clamp-3 mb-4 leading-relaxed">
          {report.description}
        </p>
      </div>
      <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--muted-foreground)]">
        <span className="font-bold">📍 {report.district}</span>
        {statusBadge}
      </div>
    </Link>
  );
}
