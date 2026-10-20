"use client";

import Link from "next/link";
import { useReports } from "@/components/providers";
import { useI18n } from "@/components/language-provider";
import { categoryKey, statusKey } from "@/lib/i18n";

export default function ChallengeDetail({ id }: { id: string }) {
  const { reports } = useReports();
  const { t } = useI18n();
  const report = reports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
          <Link
            href="/challenges"
            className="font-bold text-[#0B5345] dark:text-emerald-400 hover:underline"
          >
            {t("detail.back")}
          </Link>
        </div>
        <div className="text-center py-12 bg-[var(--card)] border border-dashed border-[var(--border)] rounded-2xl">
          <span className="text-3xl">🔍</span>
          <h3 className="font-bold text-base mt-2">
            {t("detail.notFound")} {id}
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            {t("detail.notFoundP")}
          </p>
        </div>
      </div>
    );
  }

  const copyTrackingLink = () => {
    alert(
      "Tracking Link: " + window.location.origin + "/challenges/" + report.id
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
        <Link
          href="/challenges"
          className="font-bold text-[#0B5345] dark:text-emerald-400 hover:underline"
        >
          {t("detail.back")}
        </Link>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-start flex-wrap gap-3 pb-4 border-b border-[var(--border)]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono font-bold text-xs bg-[var(--secondary)] px-2 py-0.5 rounded text-[#0B5345] dark:text-emerald-400">
                {report.id}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--secondary)]">
                {t(categoryKey(report.category)) || report.category}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  report.urgency === "High"
                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                    : "bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300"
                }`}
              >
                {t(report.urgency === "High" ? "urg.high" : "urg.normal")}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {t(statusKey(report.status)) || report.status}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[var(--foreground)]">
              {report.title}
            </h1>
          </div>
          <button
            onClick={copyTrackingLink}
            className="text-xs px-3 py-1.5 border border-[var(--border)] rounded-lg hover:bg-[var(--secondary)] font-bold"
          >
            {t("detail.copy")}
          </button>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
            {t("detail.description")}
          </h2>
          <p className="text-sm leading-relaxed">{report.description}</p>
        </div>

        {/* Facts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[var(--secondary)]/40 p-3.5 rounded-xl border border-[var(--border)]">
          <div>
            📍 <strong>{t("detail.district")}</strong> {report.district}
          </div>
          <div>
            🏛️ <strong>{t("detail.location")}</strong>{" "}
            {report.landmark || t("detail.noneSpecified")}
          </div>
          <div>
            📌 <strong>{t("detail.coords")}</strong> {report.lat.toFixed(4)}° N,{" "}
            {report.lng.toFixed(4)}° E
          </div>
          {report.pincode ? (
            <div>
              📮 <strong>{t("detail.pincode")}</strong> {report.pincode}
            </div>
          ) : null}
          <div>
            📅 <strong>{t("detail.submitted")}</strong> {report.created_at.slice(0, 10)}
          </div>
        </div>

        {/* AI Triage Assessment */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
            <span>🤖 {t("detail.ai")}</span>
            <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[10px] uppercase">
              {t("detail.aiSuggested")}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[var(--foreground)] font-medium">
            {report.ai_summary}
          </p>
        </div>

        {/* Assigned partner */}
        {report.partner ? (
          <div className="border-l-4 border-[#0B5345] bg-[var(--secondary)]/30 p-3.5 rounded-r-xl text-xs space-y-1">
            <div className="font-bold uppercase tracking-wider text-[var(--muted-foreground)] text-[10px]">
              {t("detail.partner")}
            </div>
            <div className="font-bold text-sm">{report.partner}</div>
          </div>
        ) : null}

        {/* Status Timeline */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
            {t("detail.timeline")}
          </h3>
          <div className="space-y-3 relative pl-4 border-l-2 border-emerald-500/30">
            {report.timeline.map((item, idx) => (
              <div className="relative" key={`${report.id}-tl-${idx}`}>
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div className="text-xs font-bold">
                  {t(statusKey(item.status)) || item.status}{" "}
                  <span className="text-[11px] font-normal text-[var(--muted-foreground)]">
                    · {item.date}
                  </span>
                </div>
                <div className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
