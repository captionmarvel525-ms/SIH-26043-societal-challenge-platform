import { Suspense } from "react";
import ChallengeDetail from "@/components/challenge-detail";

// Skeleton shown while the dynamic param streams in during prerendering
// (Next 16 Cache Components requires `params` reads behind a Suspense boundary).
function DetailFallback() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="h-3 w-36 rounded bg-[var(--secondary)]" />
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex gap-2">
          <div className="h-4 w-24 rounded bg-[var(--secondary)]" />
          <div className="h-4 w-20 rounded bg-[var(--secondary)]" />
        </div>
        <div className="h-7 w-3/4 rounded bg-[var(--secondary)]" />
        <div className="h-4 w-full rounded bg-[var(--secondary)]" />
        <div className="h-4 w-5/6 rounded bg-[var(--secondary)]" />
      </div>
    </div>
  );
}

async function ChallengeDetailShell({
  params,
}: {
  params: PageProps<"/challenges/[id]">["params"];
}) {
  const { id } = await params;
  return <ChallengeDetail id={id} />;
}

export default function ChallengeDetailPage(
  props: PageProps<"/challenges/[id]">,
) {
  return (
    <Suspense fallback={<DetailFallback />}>
      <ChallengeDetailShell params={props.params} />
    </Suspense>
  );
}
