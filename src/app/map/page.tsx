import type { Metadata } from "next";
import DistrictMapView from "@/components/district-map-view";
import { T } from "@/components/t";

export const metadata: Metadata = {
  title: "Live District Map | CIVICFORCE",
  description:
    "Live interactive OpenStreetMap of Tamil Nadu with active incident pins, urgency pulses, and district clusters.",
};

export default function MapPage() {
  return (
    <div id="page-map" className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black mb-1">
          <T k="map.h1" />
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          <T k="map.p" />
        </p>
      </div>

      <DistrictMapView />
    </div>
  );
}
