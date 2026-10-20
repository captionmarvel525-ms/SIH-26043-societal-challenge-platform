"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";
import { useI18n } from "@/components/language-provider";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleStrictLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login(email.trim(), password.trim())) {
      alert("✓ Login Successful: Welcome back, Administrator!");
      router.push("/admin");
    } else {
      setHasError(true);
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs font-medium";

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B5345] to-[#073B31] text-amber-400 font-black text-2xl flex items-center justify-center mx-auto mb-3 border-2 border-amber-400 shadow-sm">
          CF
        </div>
        <h1 className="text-xl font-black">{t("login.h1")}</h1>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">
          {t("login.p")}
        </p>
      </div>

      {/* Error Notice */}
      {hasError ? (
        <div className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 p-3 rounded-xl text-xs font-bold mb-4 border border-red-300">
          {t("login.error")}
        </div>
      ) : null}

      <form onSubmit={handleStrictLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold mb-1">
            {t("login.email")}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="admin@tn.gov.in"
          />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">{t("login.password")}</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        <div className="bg-[var(--secondary)] rounded-xl p-3 text-xs text-[var(--muted-foreground)] border border-[var(--border)]">
          {t("login.creds")}
          <br />
          {t("login.emailLabel")} <code>admin@tn.gov.in</code>
          <br />
          {t("login.passwordLabel")} <code>Admin@1234</code>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0B5345] hover:bg-[#073B31] text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md"
        >
          {t("login.submit")}
        </button>
      </form>
    </div>
  );
}
