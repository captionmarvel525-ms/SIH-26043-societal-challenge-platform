"use client";

import { useState } from "react";
import { useReports } from "@/components/providers";
import ReportCard from "@/components/report-card";
import { useI18n } from "@/components/language-provider";
import { categoryKey, statusKey } from "@/lib/i18n";
import {
  CATEGORY_FILTER_OPTIONS,
  DISTRICT_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from "@/lib/data";

export default function ChallengeBrowser() {
  const { reports } = useReports();
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const q = search.toLowerCase();
  const filtered = reports.filter((r) => {
    const matchesQ =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.landmark !== null && r.landmark.toLowerCase().includes(q));
    const matchesDist = district === "All" || r.district === district;
    const matchesCat = category === "All" || r.category === category;
    const matchesStat = status === "All" || r.status === status;
    return matchesQ && matchesDist && matchesCat && matchesStat;
  });

  const resetFilters = () => {
    setSearch("");
    setDistrict("All");
    setCategory("All");
    setStatus("All");
  };

  const selectClass =
    "px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs font-semibold";

  return (
    <>
      {/* Filters Toolbar */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("ch.searchPh")}
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs"
          />
        </div>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className={selectClass}
        >
          {DISTRICT_FILTER_OPTIONS.map((d) => (
            <option key={d} value={d}>
              {d === "All" ? t("ch.allDistricts") : d}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectClass}
        >
          {CATEGORY_FILTER_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? t("ch.allCategories") : t(categoryKey(c)) || c}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={selectClass}
        >
          {STATUS_FILTER_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? t("ch.allStatuses") : t(statusKey(s)) || s}
            </option>
          ))}
        </select>
        <button
          onClick={resetFilters}
          className="px-3 py-2 border border-[var(--border)] rounded-lg text-xs font-bold hover:bg-[var(--secondary)]"
        >
          {t("ch.reset")}
        </button>
      </div>

      {/* Reports List Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-[var(--card)] border border-dashed border-[var(--border)] rounded-2xl">
            <span className="text-3xl">📂</span>
            <h3 className="font-bold text-base mt-2">{t("ch.empty")}</h3>
            <button
              onClick={resetFilters}
              className="mt-3 px-4 py-1.5 bg-[#0B5345] text-white text-xs font-semibold rounded-lg"
            >
              {t("ch.reset")}
            </button>
          </div>
        ) : (
          filtered.map((report) => <ReportCard key={report.id} report={report} />)
        )}
      </div>
    </>
  );
}
