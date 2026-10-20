"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";

// STRICT AUTH PROTECTION: blocks the Admin Queue and Admin Review pages
// until administrator credentials have been verified.
export default function AdminGuard({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const alertedRef = useRef(false);

  useEffect(() => {
    if (isAdmin) return;
    if (!alertedRef.current) {
      alertedRef.current = true;
      alert(
        "🔒 Access Restricted: You must enter administrator credentials to access the Admin Queue."
      );
    }
    router.replace("/login");
  }, [isAdmin, router]);

  if (!isAdmin) return null;
  return <>{children}</>;
}
