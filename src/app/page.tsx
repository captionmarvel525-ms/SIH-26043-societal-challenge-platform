import Link from "next/link";
import LiveCounters from "@/components/live-counters";
import RecentReports from "@/components/recent-reports";
import { T } from "@/components/t";

export default function HomePage() {
  return (
    <div id="page-home" className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--card)] via-[var(--card)] to-[var(--secondary)] border border-[var(--border)] p-6 sm:p-10 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 mb-4">
          <span>⚡</span> <T k="home.heroBadge" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
          <T k="home.h1a" />{" "}
          <span className="text-[#0B5345] dark:text-emerald-400">
            <T k="home.h1b" />
          </span>
        </h1>
        <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-3xl leading-relaxed mb-6 font-medium">
          <T k="home.hero.p1" />
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/report"
            className="bg-[#0B5345] hover:bg-[#073B31] text-white text-sm font-bold px-5 py-3 rounded-xl shadow-md flex items-center gap-2"
          >
            <span>✍️</span> <T k="home.ctaReport" />
          </Link>
          <Link
            href="/challenges"
            className="border border-[var(--border)] hover:bg-[var(--secondary)] text-sm font-bold px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <span>🔍</span> <T k="home.ctaBrowse" />
          </Link>
          <Link
            href="/map"
            className="border border-[var(--border)] hover:bg-[var(--secondary)] text-sm font-bold px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <span>🗺️</span> <T k="home.ctaMap" />
          </Link>
        </div>
      </div>

      {/* Live Counters Bar */}
      <LiveCounters />

      {/* 4-Stage Resolution Pipeline */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-black mb-1">
          <T k="home.pipeline.h2" />
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mb-6">
          <T k="home.pipeline.p" />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-[var(--secondary)]/50 rounded-xl p-4 border border-[var(--border)]"
            >
              <div className="w-8 h-8 rounded-full bg-[#0B5345] text-white flex items-center justify-center font-black text-xs mb-3">
                {n}
              </div>
              <h3 className="font-bold text-sm mb-1">
                <T k={`home.step${n}.title`} />
              </h3>
              <p className="text-xs text-[var(--muted-foreground)]">
                <T k={`home.step${n}.body`} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent 6 Reports */}
      <RecentReports />
    </div>
  );
}
