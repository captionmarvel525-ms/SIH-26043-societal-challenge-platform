import type { Metadata } from "next";
import LoginForm from "@/components/login-form";

export const metadata: Metadata = {
  title: "Official Admin Sign-in | CIVICFORCE",
};

export default function LoginPage() {
  return (
    <div id="page-login" className="max-w-md mx-auto space-y-6 pt-6">
      <LoginForm />
    </div>
  );
}
