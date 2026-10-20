"use client";

import { useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useReports } from "@/components/providers";
import { useI18n } from "@/components/language-provider";
import {
  TN_DISTRICTS,
  TN_LOCALITIES,
  formatDateTime,
  runAiTriage,
  type Report,
} from "@/lib/data";

const ReportLeafletMap = dynamic(() => import("./report-leaflet-map"), {
  ssr: false,
});

// Quick Tamil Nadu locations (from the prototype's "Try clicking" chips).
const QUICK_LOCATIONS = [
  { label: "Anna Salai, Chennai", name: "Anna Salai, Chennai", lat: 13.0418, lng: 80.2481, district: "Chennai" },
  { label: "Ukkadam, Coimbatore", name: "Ukkadam, Coimbatore", lat: 10.9931, lng: 76.9612, district: "Coimbatore" },
  { label: "Periyar, Madurai", name: "Periyar Bus Stand, Madurai", lat: 9.9195, lng: 78.1193, district: "Madurai" },
  { label: "Hasthampatti, Salem", name: "Hasthampatti, Salem", lat: 11.6742, lng: 78.1468, district: "Salem" },
  { label: "Srirangam, Trichy", name: "Srirangam, Trichy", lat: 10.856, lng: 78.6948, district: "Tiruchirappalli" },
];

type QuickLocateArgs = {
  name: string;
  lat: number;
  lng: number;
  district?: string;
  existingLocation: string;
  existingDistrict: string;
};

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500";

export default function ReportForm() {
  const router = useRouter();
  const { reports, addReport } = useReports();
  const { t, tCount } = useI18n();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photoCount, setPhotoCount] = useState(0);

  // Chennai Central by default — the map auto-points from here.
  const [pin, setPin] = useState({ lat: 13.0827, lng: 80.2707 });
  const [pinLabel, setPinLabel] = useState("Chennai Central (13.0827° N, 80.2707° E)");

  const quickLocate = ({
    name: locateName,
    lat,
    lng,
    district: locateDistrict,
    existingLocation,
    existingDistrict,
  }: QuickLocateArgs) => {
    setPin({ lat, lng });
    setPinLabel(`${locateName} (${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E)`);

    if (locateDistrict && !existingDistrict) setDistrict(locateDistrict);
    if (!existingLocation) setLocation(locateName);
  };

  const handleLocationInput = (text: string) => {
    setLocation(text);
    if (!text || text.trim().length < 3) return;
    const lower = text.toLowerCase();

    // Check known Tamil Nadu localities
    const matched = TN_LOCALITIES.find(
      (l) =>
        l.name.toLowerCase().includes(lower) ||
        lower.includes(l.name.toLowerCase().split(",")[0])
    );
    if (matched) {
      quickLocate({
        name: matched.name,
        lat: matched.lat,
        lng: matched.lng,
        district: matched.district,
        existingLocation: text,
        existingDistrict: district,
      });
      return;
    }

    // Check District name matches
    const distMatch = TN_DISTRICTS.find((d) => lower.includes(d.name.toLowerCase()));
    if (distMatch) {
      quickLocate({
        name: `${distMatch.name} District Center`,
        lat: distMatch.lat,
        lng: distMatch.lng,
        district: distMatch.name,
        existingLocation: text,
        existingDistrict: district,
      });
    }
  };

  const onDistrictSelected = (districtName: string) => {
    setDistrict(districtName);
    const dist = TN_DISTRICTS.find((d) => d.name === districtName);
    if (dist) {
      quickLocate({
        name: `${dist.name} District Center`,
        lat: dist.lat,
        lng: dist.lng,
        district: dist.name,
        existingLocation: location,
        existingDistrict: districtName,
      });
    }
  };

  // Digits only, capped at 6 — keeps the field a valid pincode as you type.
  const handlePincodeInput = (text: string) => {
    setPincode(text.replace(/\D/g, "").slice(0, 6));
  };

  const handlePinChange = (lat: number, lng: number) => {
    setPin({ lat, lng });
    setPinLabel(`Manual Pin (${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E)`);
  };

  const addSamplePhoto = () => {
    if (photoCount >= 3) {
      alert("Maximum of 3 photos reached.");
      return;
    }
    setPhotoCount(photoCount + 1);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Automated AI triage
    const { category, urgency } = runAiTriage(title, description);

    let newId = `TNCR-${Math.floor(1000 + Math.random() * 9000)}`;
    while (reports.some((r) => r.id === newId)) {
      newId = `TNCR-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const now = new Date();
    const dateStr = formatDateTime(now);

    const newReport: Report = {
      id: newId,
      title,
      description,
      district,
      category,
      urgency,
      status: "New",
      landmark: location,
      pincode: pincode || null,
      lat: pin.lat,
      lng: pin.lng,
      partner: null,
      ai_summary: `AI classified problem into ${category} with ${urgency} urgency based on reported location and risk factors.`,
      contact_name: name || null,
      contact_phone: phone || null,
      contact_email: email || null,
      created_at: now.toISOString(),
      timeline: [
        {
          status: "Received",
          date: dateStr,
          note: `Report received from citizen. Automated AI triage categorized as ${category} (${urgency} priority).`,
        },
      ],
    };

    addReport(newReport);

    alert(
      `Report ${newId} submitted! Automated AI triage categorized this problem as '${category}' (${
        urgency === "High" ? "High Urgency" : "Normal"
      }). Opening tracking view...`
    );
    router.push(`/challenges/${newId}`);
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm">
      <form onSubmit={handleFormSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-bold mb-1.5">
            {t("report.f.title")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder={t("report.f.titlePh")}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold mb-1.5">
            {t("report.f.description")} <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
            placeholder={t("report.f.descriptionPh")}
          />
        </div>

        {/* District + Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-bold mb-1.5">
              {t("report.f.district")} <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={district}
              onChange={(e) => onDistrictSelected(e.target.value)}
              className={`${inputClass} font-semibold`}
            >
              <option value="">{t("report.f.districtPh")}</option>
              {TN_DISTRICTS.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-bold mb-1.5" htmlFor="report-pincode">
              {t("report.f.pincode")} <span className="text-red-500">*</span>
            </label>
            <input
              id="report-pincode"
              name="pincode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              value={pincode}
              onChange={(e) => handlePincodeInput(e.target.value)}
              className={`${inputClass} font-semibold tracking-widest`}
              placeholder={t("report.f.pincodePh")}
              title={t("report.f.pincode")}
            />
          </div>
        </div>

        {/* AUTO-POINTING LOCATION INPUT */}
        <div>
          <label className="block text-sm font-bold mb-1.5">
            {t("report.f.locality")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => handleLocationInput(e.target.value)}
            className={`${inputClass} font-medium`}
            placeholder={t("report.f.localityPh")}
          />

          {/* Quick Tamil Nadu Locations */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-[11px] text-[var(--muted-foreground)] font-semibold self-center">
              {t("report.f.tryClicking")}
            </span>
            {QUICK_LOCATIONS.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() =>
                  quickLocate({
                    name: q.name,
                    lat: q.lat,
                    lng: q.lng,
                    district: q.district,
                    existingLocation: location,
                    existingDistrict: district,
                  })
                }
                className="text-xs px-2.5 py-1 rounded-md bg-[var(--secondary)] hover:bg-[#0B5345] hover:text-white font-medium border border-[var(--border)]"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Auto-pinned Confirmation Badge */}
          <div
            id="location-confirm-badge"
            className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold"
          >
            <span>{t("report.f.pinned")}</span>
            <span id="location-confirm-text">{pinLabel}</span>
          </div>
        </div>

        {/* LIVE INTERACTIVE LEAFLET MAP */}
        <div>
          <label className="block text-sm font-bold mb-1.5">
            {t("report.f.map")}
          </label>
          <ReportLeafletMap
            lat={pin.lat}
            lng={pin.lng}
            onPinChange={handlePinChange}
          />
          <p className="text-[11px] text-[var(--muted-foreground)] mt-1.5">
            {t("report.f.mapHelp")}
          </p>
        </div>

        {/* Up to 3 Photo Uploads */}
        <div>
          <label className="block text-sm font-bold mb-1.5">
            {t("report.f.photos")}
          </label>
          <div
            onClick={addSamplePhoto}
            className="border-2 border-dashed border-[var(--border)] rounded-xl p-4 text-center cursor-pointer hover:border-emerald-500 transition-colors bg-[var(--secondary)]/30"
          >
            <div className="text-xl mb-1">📷</div>
            <p className="text-xs font-bold">{t("report.f.photosCta")}</p>
            <p className="text-[11px] text-[var(--muted-foreground)]" id="photo-count-label">
              {tCount("report.f.photoCount", photoCount)}
            </p>
          </div>
          <div id="photos-preview-box" className="flex gap-2 mt-2">
            {Array.from({ length: photoCount }, (_, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-lg bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-800 dark:text-emerald-300"
              >
                {t("report.f.photo")} {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Automated AI Notice */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 text-xs text-emerald-800 dark:text-emerald-300">
          <strong>{t("report.f.aiNotice")}</strong> {t("report.f.aiNoticeBody")}
        </div>

        {/* Optional Citizen Contact */}
        <div className="border-t border-[var(--border)] pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              {t("report.f.contact")}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold">
              {t("report.f.confidential")}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs"
              placeholder={t("report.f.name")}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs"
              placeholder={t("report.f.phone")}
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs"
            placeholder={t("report.f.email")}
          />
          <p className="text-[11px] text-[var(--muted-foreground)]">
            {t("report.f.contactNote")}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-[#0B5345] hover:bg-[#073B31] text-white font-bold text-sm py-3 rounded-xl shadow-md transition-transform hover:scale-[1.01]"
          >
            {t("report.f.submit")}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="border border-[var(--border)] px-5 py-3 rounded-xl text-sm font-semibold"
          >
            {t("report.f.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}
