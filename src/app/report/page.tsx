import type { Metadata } from "next";
import ReportForm from "@/components/report-form";
import { T } from "@/components/t";

export const metadata: Metadata = {
  title: "Report a Societal Challenge | CIVICFORCE",
  description:
    "Report a societal issue in Tamil Nadu — the live map automatically points to your location and AI triage runs on submission.",
};

export default function ReportPage() {
  return (
    <div id="page-report" className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black mb-1">
          <T k="report.h1" />
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          <T k="report.intro.a" />{" "}
          <strong>
            <T k="report.intro.strong" />
          </strong>{" "}
          <T k="report.intro.b" />
        </p>
      </div>

      <ReportForm />
    </div>
  );
}
