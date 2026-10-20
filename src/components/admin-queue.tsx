"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, useReports } from "@/components/providers";
import { useI18n } from "@/components/language-provider";
import { categoryKey, statusKey } from "@/lib/i18n";
import { QUEUE_TABS } from "@/lib/data";

export default function AdminQueue() {
  const { reports } = useReports();
  const { logout } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const [queueTab, setQueueTab] = useState("All");

  const counts: Record<string, number> = { All: reports.length };
  for (const tab of QUEUE_TABS) {
    if (tab !== "All") counts[tab] = reports.filter((r) => r.status === tab).length;
  }

  const list = (queueTab === "All"
    ? reports
    : reports.filter((r) => r.status === queueTab)
  )
    .slice()
    .sort((a, b) =>
      (a.urgency === "High" ? 0 : 1) - (b.urgency === "High" ? 0 : 1)
    );

  const handleLogout = () => {
    logout();
    alert("You have signed out. Admin queue is now locked.");
    router.push("/");
  };

  const tabClass = (active: boolean) =>
    active
      ? "queue-tab px-3.5 py-1.5 rounded-lg bg-[#0B5345] text-white"
      : "queue-tab px-3.5 py-1.5 rounded-lg hover:bg-[var(--secondary)] text-[var(--foreground)]";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-1">
            <span>🛡️</span> {t("admin.badge")}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{t("admin.h1")}</h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            {t("admin.loggedInAs")} <strong>{t("admin.coordinator")}</strong> ·{" "}
            <code>admin@tn.gov.in</code>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-3.5 py-2 border border-red-400 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold hover:bg-red-50 dark:hover:bg-red-950"
        >
          {t("admin.signOut")}
        </button>
      </div>

      {/* Queue Status Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-2 overflow-x-auto text-xs font-bold">
        {QUEUE_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setQueueTab(tab)}
            className={tabClass(queueTab === tab)}
            data-tab={tab}
          >
            {tab === "All" ? t("admin.allQueue") : t(statusKey(tab)) || tab} (
            {counts[tab] ?? 0})
          </button>
        ))}
      </div>

      {/* Queue Table */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--secondary)]/70 border-b border-[var(--border)] text-[var(--muted-foreground)] font-bold">
            <tr>
              <th className="p-3.5">{t("admin.thId")}</th>
              <th className="p-3.5">{t("admin.thTitle")}</th>
              <th className="p-3.5">{t("admin.thDistrict")}</th>
              <th className="p-3.5">{t("admin.thCategory")}</th>
              <th className="p-3.5">{t("admin.thUrgency")}</th>
              <th className="p-3.5">{t("admin.thStatus")}</th>
              <th className="p-3.5">{t("admin.thContact")}</th>
              <th className="p-3.5 text-right">{t("admin.thAction")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {list.map((r) => (
              <tr
                key={r.id}
                className={`hover:bg-[var(--secondary)]/40 ${
                  r.urgency === "High" ? "bg-red-500/5" : ""
                }`}
              >
                <td className="p-3.5 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {r.id}
                </td>
                <td className="p-3.5 font-bold max-w-[200px] truncate">{r.title}</td>
                <td className="p-3.5 font-medium">📍 {r.district}</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded bg-[var(--secondary)] font-bold">
                    {t(categoryKey(r.category)) || r.category}
                  </span>
                </td>
                <td className="p-3.5">
                  {r.urgency === "High" ? (
                    <span className="text-red-600 dark:text-red-400 font-extrabold">
                      {t("urg.highShort")}
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-neutral-400">
                      {t("urg.normal")}
                    </span>
                  )}
                </td>
                <td className="p-3.5">
                  <span className="font-extrabold">
                    {t(statusKey(r.status)) || r.status}
                  </span>
                </td>
                <td className="p-3.5 text-[11px] text-[var(--muted-foreground)]">
                  {r.contact_name ? (
                    <>
                      <strong>{r.contact_name}</strong>
                      <br />
                      {r.contact_phone || ""}
                    </>
                  ) : (
                    <em>{t("admin.anonymous")}</em>
                  )}
                </td>
                <td className="p-3.5 text-right">
                  <Link
                    href={`/admin/${r.id}`}
                    className="inline-block px-3 py-1 bg-[#0B5345] hover:bg-[#073B31] text-white rounded-lg font-bold text-[11px]"
                  >
                    {t("admin.review")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
