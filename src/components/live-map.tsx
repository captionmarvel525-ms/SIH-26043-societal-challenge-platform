"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import type { Report } from "@/lib/data";
import { useI18n } from "@/components/language-provider";
import { categoryKey, statusKey } from "@/lib/i18n";

L.Icon.Default.mergeOptions({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIconRetinaUrl,
  shadowUrl: markerShadowUrl,
});

export type FlyRequest = { lat: number; lng: number; seq: number };

type Props = {
  reports: Report[];
  flyRequest: FlyRequest | null;
  onOpenReport: (id: string) => void;
};

// Live fully functional district map with pulsing urgency pins and popups.
export default function LiveMap({ reports, flyRequest, onOpenReport }: Props) {
  const { t } = useI18n();
  const viewLabel = t("map.viewChallenge");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const onOpenReportRef = useRef(onOpenReport);
  useEffect(() => {
    onOpenReportRef.current = onOpenReport;
  }, [onOpenReport]);

  // Initialize the map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([11.1271, 78.6569], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    const layer = L.layerGroup().addTo(map);

    mapRef.current = map;
    layerRef.current = layer;

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // (Re)draw incident pins whenever reports change.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();

    reports.forEach((r) => {
      if (!r.lat || !r.lng) return;
      const isUrgent = r.urgency === "High";
      const icon = L.divIcon({
        className: isUrgent ? "custom-pulse-pin" : "custom-norm-pin",
        iconSize: isUrgent ? [16, 16] : [14, 14],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([r.lat, r.lng], { icon }).addTo(layer);

      const content = document.createElement("div");
      content.style.minWidth = "190px";
      content.style.fontFamily = "inherit";
      content.innerHTML = `
        <div style="font-size: 11px; font-weight: 800; color: #0B5345;">${r.id} · ${r.district}</div>
        <h4 style="margin: 3px 0 6px 0; font-size: 13px; font-weight: 800;">${r.title}</h4>
        <div style="margin-bottom: 8px;">
          <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: #eee; font-weight: bold;">${t(categoryKey(r.category)) || r.category}</span>
          <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: ${
            isUrgent ? "#FDEDEC" : "#EAFAF1"
          }; color: ${isUrgent ? "#C0392B" : "#27AE60"}; font-weight: bold;">${t(statusKey(r.status)) || r.status}</span>
        </div>
        <button style="width: 100%; background: #0B5345; color: #fff; border: none; padding: 6px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: bold;">
          ${viewLabel}
        </button>
      `;
      const button = content.querySelector("button");
      if (button) {
        button.addEventListener("click", () => onOpenReportRef.current(r.id));
      }
      marker.bindPopup(content);
    });
  }, [reports, t, viewLabel]);

  // Smooth zoom to a district center on demand.
  useEffect(() => {
    if (flyRequest && mapRef.current) {
      mapRef.current.flyTo([flyRequest.lat, flyRequest.lng], 12, {
        duration: 1.2,
      });
    }
  }, [flyRequest]);

  return (
    <div
      ref={containerRef}
      className="h-96 rounded-xl border border-[var(--border)] shadow-[inset_0_2px_8px_rgba(0,0,0,0.12)]"
    />
  );
}
