import { Suspense } from "react";
import AdminReviewForm from "@/components/admin-review-form";

// Skeleton shown while the dynamic param streams in during prerendering
// (Next 16 Cache Components requires `params` reads behind a Suspense boundary).
function ReviewFallback() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between">
        <div className="h-3 w-36 rounded bg-[var(--secondary)]" />
        <div className="h-5 w-24 rounded bg-[var(--secondary)]" />
      </div>
      <div className="bg-[var(--card)] border-2 border-emerald-600 rounded-xl p-4 shadow-sm space-y-2">
        <div className="h-3 w-72 rounded bg-[var(--secondary)]" />
        <div className="h-3 w-48 rounded bg-[var(--secondary)]" />
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="h-4 w-64 rounded bg-[var(--secondary)]" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-8 rounded-lg bg-[var(--secondary)]" />
          <div className="h-8 rounded-lg bg-[var(--secondary)]" />
        </div>
        <div className="h-8 rounded-lg bg-[var(--secondary)]" />
      </div>
    </div>
  );
}

async function AdminReviewShell({
  params,
}: {
  params: PageProps<"/admin/[id]">["params"];
}) {
  const { id } = await params;
  return <AdminReviewForm id={id} />;
}

export default function AdminReviewPage(props: PageProps<"/admin/[id]">) {
  return (
    <Suspense fallback={<ReviewFallback />}>
      <AdminReviewShell params={props.params} />
    </Suspense>
  );
}
