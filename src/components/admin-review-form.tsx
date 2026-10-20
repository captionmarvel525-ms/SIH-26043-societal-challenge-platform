"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReports } from "@/components/providers";
import { useI18n } from "@/components/language-provider";
import { categoryKey, PARTNER_GROUP_KEYS, statusKey } from "@/lib/i18n";
import {
  CATEGORY_OPTIONS,
  PARTNER_GROUPS,
  STATUS_OPTIONS,
  formatDateTime,
  type Urgency,
} from "@/lib/data";

export default function AdminReviewForm({ id }: { id: string }) {
  const router = useRouter();
  const { reports, updateReport } = useReports();
  const { t } = useI18n();
  const report = reports.find((r) => r.id === id);

  const [category, setCategory] = useState(report?.category ?? CATEGORY_OPTIONS[0]);
  const [urgency, setUrgency] = useState<Urgency>(report?.urgency ?? "Normal");
  const [summary, setSummary] = useState(report?.ai_summary ?? "");
  const [status, setStatus] = useState(report?.status ?? "New");
  const [partner, setPartner] = useState(report?.partner ?? "");
  const [publicUpdate, setPublicUpdate] = useState("");

  const selectClass =
    "w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs font-semibold";

  if (!report) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Link
            href="/admin"
            className="text-xs font-bold text-[#0B5345] dark:text-emerald-400 hover:underline"
          >
            {t("review.back")}
          </Link>
        </div>
        <div className="text-center py-12 bg-[var(--card)] border border-dashed border-[var(--border)] rounded-2xl">
          <span className="text-3xl">🔍</span>
          <h3 className="font-bold text-base mt-2">
            {t("review.notFound")} {id}
          </h3>
        </div>
      </div>
    );
  }

  const saveAdminReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUpdate = publicUpdate.trim();

    updateReport(
      id,
      {
        category,
        urgency,
        ai_summary: summary,
        status,
        partner: partner || null,
      },
      trimmedUpdate
        ? {
            status,
            date: formatDateTime(new Date()),
            note: trimmedUpdate,
          }
        : undefined
    );

    alert(`Changes saved for ${id}! Public timeline updated.`);
    router.push("/admin");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Link
          href="/admin"
          className="text-xs font-bold text-[#0B5345] dark:text-emerald-400 hover:underline"
        >
          {t("review.back")}
        </Link>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[var(--secondary)] text-[#0B5345] dark:text-emerald-400">
          {report.id}
        </span>
      </div>

      {/* Confidential Contact Box */}
      <div className="bg-[var(--card)] border-2 border-emerald-600 rounded-xl p-4 shadow-sm space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
            {t("review.confidential")}
          </span>
          <span className="text-[10px] bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 px-2 py-0.5 rounded-full font-bold">
            {t("review.protected")}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div>
            <strong>{t("review.citizen")}</strong>{" "}
            {report.contact_name || t("review.notGiven")}
          </div>
          <div>
            <strong>{t("review.phone")}</strong>{" "}
            {report.contact_phone || t("review.notGiven")}
          </div>
          <div>
            <strong>{t("review.email")}</strong>{" "}
            {report.contact_email || t("review.notGiven")}
          </div>
        </div>
      </div>

      {/* Editable Triage Box */}
      <form
        onSubmit={saveAdminReview}
        className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-5"
      >
        <h2 className="text-base font-bold">{t("review.h2")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold mb-1">{t("review.category")}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectClass}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {t(categoryKey(c)) || c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">
              {t("review.urgencyPriority")}
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as Urgency)}
              className={selectClass}
            >
              <option value="Normal">{t("urg.normalPriority")}</option>
              <option value="High">{t("urg.highPriority")}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">{t("review.summary")}</label>
          <textarea
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">{t("review.partner")}</label>
          <select
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            className={selectClass}
          >
            <option value="">{t("review.noPartner")}</option>
            {PARTNER_GROUPS.map((group, index) => (
              <optgroup
                key={group.label}
                label={t(PARTNER_GROUP_KEYS[index] ?? group.label)}
              >
                {group.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">{t("review.status")}</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={selectClass}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {t(statusKey(s)) || s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">
            {t("review.timelineUpdate")}
          </label>
          <input
            type="text"
            value={publicUpdate}
            onChange={(e) => setPublicUpdate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs font-medium"
            placeholder={t("review.timelinePh")}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-[#0B5345] hover:bg-[#073B31] text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-md"
          >
            {t("review.save")}
          </button>
          <Link
            href="/admin"
            className="border border-[var(--border)] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center"
          >
            {t("review.cancel")}
          </Link>
        </div>
      </form>
    </div>
  );
}
