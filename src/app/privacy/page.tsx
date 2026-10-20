import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/components/t";

export const metadata: Metadata = {
  title: "Privacy Policy | CIVICFORCE",
  description: "How CIVICFORCE handles citizen data and contact details.",
};

const SECTIONS = [
  {
    title: "What We Collect",
    body: "When you report a societal challenge, we store the problem details, the pinned location coordinates, and — optionally — your name, phone number, and email address. Photographs you attach are simulated in this prototype and are never uploaded to a server.",
  },
  {
    title: "How Contact Details Are Used",
    body: "Citizen contact information is strictly confidential. It is never displayed on public reports. Only authorized admin reviewers can view it, and only to coordinate resolution updates for the report you submitted.",
  },
  {
    title: "Public Anonymity",
    body: "Reports appear publicly without any identifying details. If you choose not to provide contact information, your report is listed as Anonymous and remains fully trackable through its TNCR tracking ID.",
  },
  {
    title: "AI Triage Classification",
    body: "CIVICFORCE automatically classifies submitted reports by category, urgency, and suggested partner using keyword-based triage. Admin reviewers can correct any AI classification at any time, and corrections are recorded on the public timeline.",
  },
  {
    title: "Data Retention",
    body: "This prototype keeps all reports in memory for the current session only. Reloading the application resets the register to its seed data. No personal data leaves your browser.",
  },
  {
    title: "Your Rights",
    body: "You may request correction or deletion of your report at any time by contacting the State Coordinator desk at admin@tn.gov.in or by calling the emergency civic desk on 1100 / 1913.",
  },
];

export default function PrivacyPage() {
  return (
    <div id="page-privacy" className="max-w-3xl mx-auto space-y-6">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black mb-1">
            <T k="privacy.h1" />
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            <T k="privacy.updated" />
          </p>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.title} className="space-y-1.5">
            <h2 className="text-sm font-bold">{section.title}</h2>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="inline-block w-full text-center bg-[#0B5345] hover:bg-[#073B31] text-white font-bold text-sm py-3 rounded-xl shadow-md"
      >
        <T k="common.returnHome" />
      </Link>
    </div>
  );
}
