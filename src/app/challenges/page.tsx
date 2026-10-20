import type { Metadata } from "next";
import ChallengeBrowser from "@/components/challenge-browser";
import { T } from "@/components/t";

export const metadata: Metadata = {
  title: "Public Challenge Register | CIVICFORCE",
  description:
    "Browse and search societal challenges submitted across Tamil Nadu.",
};

export default function ChallengesPage() {
  return (
    <div id="page-challenges" className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black mb-1">
          <T k="ch.h1" />
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          <T k="ch.p" />
        </p>
      </div>

      <ChallengeBrowser />
    </div>
  );
}
