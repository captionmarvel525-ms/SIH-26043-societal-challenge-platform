"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useReports } from "@/components/providers";
import { useI18n } from "@/components/language-provider";
import type { FlyRequest } from "@/components/live-map";

const LiveMap = dynamic(() => import("./live-map"), { ssr: false });

// Quick district centers (click a card to smooth-zoom the live map).
const DISTRICT_CENTERS = [
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Coimbatore", lat: 11.0168, lng: 76.9558 },
  { name: "Madurai", lat: 9.9252, lng: 78.1198 },
  { name: "Salem", lat: 11.6643, lng: 78.146 },
  { name: "Tiruchirappalli", lat: 10.7905, lng: 78.7047 },
  { name: "Tirunelveli", lat: 8.7139, lng: 77.7567 },
];

export default function DistrictMapView() {
  const { reports } = useReports();
  const router = useRouter();
  const { t, tCount } = useI18n();
  const [flyRequest, setFlyRequest] = useState<FlyRequest | null>(null);

  const handleOpenReport = useCallback(
    (id: string) => router.push(`/challenges/${id}`),
    [router]
  );

  const flyToDistrict = (lat: number, lng: number) => {
    setFlyRequest((prev) => ({ lat, lng, seq: (prev?.seq ?? 0) + 1 }));
  };

  return (
    <>
      {/* Live Interactive Map Frame */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm space-y-4">
        <LiveMap
          reports={reports}
          flyRequest={flyRequest}
          onOpenReport={handleOpenReport}
        />

        {/* Legend & Attribution */}
        <div className="flex justify-between items-center flex-wrap gap-4 text-xs text-[var(--muted-foreground)] pt-2 border-t border-[var(--border)]">
          <div className="flex items-center gap-4 flex-wrap font-semibold">
            <span>{t("map.pins")}</span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#0B5345]" /> {t("map.normalPin")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#C0392B] animate-ping" />{" "}
              {t("map.urgentPin")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" /> {t("map.clusterPin")}
            </span>
          </div>
          <div>
            {t("map.attribution")}{" "}
            <a
              href="https://www.openstreetmap.org"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              OpenStreetMap
            </a>{" "}
            {t("map.attributionAfter")}
          </div>
        </div>
      </div>

      {/* District Count Cards (Click to Fly) */}
      <h2 className="text-base font-bold">{t("map.centers")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {DISTRICT_CENTERS.map((d) => {
          const count = reports.filter((r) => r.district === d.name).length;
          return (
            <div
              key={d.name}
              onClick={() => flyToDistrict(d.lat, d.lng)}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 text-center cursor-pointer hover:border-emerald-500 hover:shadow-sm"
            >
              <div className="font-bold text-sm">{d.name}</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                {tCount(count === 1 ? "map.reportCountOne" : "map.reportCount", count)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
