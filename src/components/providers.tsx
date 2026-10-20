"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  INITIAL_REPORTS,
  type Report,
  type TimelineEntry,
} from "@/lib/data";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";

// ================= REPORTS STORE =================

type ReportsContextValue = {
  reports: Report[];
  addReport: (report: Report) => void;
  updateReport: (
    id: string,
    changes: Partial<Report>,
    timelineEntry?: TimelineEntry
  ) => void;
};

const ReportsContext = createContext<ReportsContextValue | null>(null);

export function useReports(): ReportsContextValue {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports must be used within a ReportsProvider");
  return ctx;
}

function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);

  const value = useMemo<ReportsContextValue>(
    () => ({
      reports,
      addReport: (report) => setReports((prev) => [report, ...prev]),
      updateReport: (id, changes, timelineEntry) =>
        setReports((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  ...changes,
                  timeline: timelineEntry
                    ? [...r.timeline, timelineEntry]
                    : r.timeline,
                }
              : r
          )
        ),
    }),
    [reports]
  );

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
}

// ================= STRICT ADMIN AUTH =================

type AuthContextValue = {
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAdmin,
      login: (email, password) => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          setIsAdmin(true);
          return true;
        }
        return false;
      },
      logout: () => setIsAdmin(false),
    }),
    [isAdmin]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ReportsProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReportsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
