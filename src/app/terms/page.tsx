import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/components/t";

export const metadata: Metadata = {
  title: "Terms of Service | CIVICFORCE",
  description: "Terms of use for the CIVICFORCE civic reporting platform.",
};

const SECTIONS = [
  {
    title: "1. Acceptable Use",
    body: "CIVICFORCE is a public civic reporting register. You agree to submit only genuine societal issues observed in Tamil Nadu. Deliberately false, defamatory, or duplicate reports may be removed and marked Rejected by admin reviewers.",
  },
  {
    title: "2. Accurate Locations",
    body: "The map auto-points to the location you type. You are responsible for confirming that the pinned coordinate matches the actual site of the issue before submitting. Draggable pin adjustments are encouraged for precision.",
  },
  {
    title: "3. No Emergency Guarantee",
    body: "CIVICFORCE is not an emergency response service. For immediate danger to life, call 1100 or 1913 directly. Reports flagged High Urgency are prioritised in the admin queue but are not dispatched automatically.",
  },
  {
    title: "4. Automated Classification",
    body: "AI triage assigns a category, urgency level, and suggested partner to every report on submission. These classifications are advisory until an authorized admin reviewer confirms or corrects them.",
  },
  {
    title: "5. Public Timeline",
    body: "Status updates written by admin reviewers — including notes you add during review — appear on the public challenge timeline. Do not include confidential citizen contact details in public timeline updates.",
  },
  {
    title: "6. Admin Access",
    body: "Access to the Admin Queue and Admin Review pages requires verified administrator credentials. Unauthorised attempts to access these routes will be redirected to the sign-in page.",
  },
  {
    title: "7. Prototype Status",
    body: "This deployment is a prototype built for the Smart India Hackathon (SIH-26043). Data is held in session memory only and resets on reload. No service-level commitments are made for this prototype environment.",
  },
];

export default function TermsPage() {
  return (
    <div id="page-terms" className="max-w-3xl mx-auto space-y-6">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black mb-1">
            <T k="terms.h1" />
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            <T k="terms.updated" />
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
