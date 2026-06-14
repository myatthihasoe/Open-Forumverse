function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-700/50 ${className}`}
      aria-hidden="true"
    />
  );
}

export function VoteButtonsSkeleton() {
  return (
    <div
      className="flex items-center space-x-2 text-xs"
      role="status"
      aria-label="Loading votes"
    >
      <SkeletonBlock className="h-9 w-[86px] rounded-lg border border-white/20 bg-slate-700/40" />
      <SkeletonBlock className="h-9 w-[102px] rounded-lg border border-white/20 bg-slate-700/40" />
    </div>
  );
}

export function ProfileHeaderSkeleton() {
  return (
    <section
      className="w-full rounded-xl border border-tertiary bg-primary p-6 shadow-sm"
      role="status"
      aria-label="Loading profile"
    >
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <SkeletonBlock className="h-24 w-24 shrink-0 rounded-full bg-tertiary/80" />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <SkeletonBlock className="h-8 w-48 max-w-full" />
            <SkeletonBlock className="h-7 w-28 rounded-full" />
            <SkeletonBlock className="h-7 w-20 rounded-full bg-amber-900/30" />
          </div>

          <div className="space-y-2">
            <SkeletonBlock className="h-4 w-full max-w-xl" />
            <SkeletonBlock className="h-4 w-4/5 max-w-lg" />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-4 w-20" />
          </div>
        </div>

        <SkeletonBlock className="h-10 w-full rounded-lg sm:w-28" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {["Questions", "Answers", "Reputation"].map((label) => (
          <div key={label} className="rounded-lg border border-tertiary p-4">
            <SkeletonBlock className="h-3 w-20" />
            <SkeletonBlock className="mt-3 h-8 w-14" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CommunityPageSkeleton() {
  return (
    <div className="space-y-6 p-5" role="status" aria-label="Loading users">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SkeletonBlock className="h-9 w-40" />
        <SkeletonBlock className="h-10 w-36 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="flex h-32 flex-col items-center justify-center rounded-xl bg-tertiary p-2">
              <SkeletonBlock className="h-24 w-24 rounded-md bg-slate-600/50" />
            </div>
            <SkeletonBlock className="mx-auto h-4 w-24" />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <SkeletonBlock className="h-9 w-24 rounded-lg" />
        <SkeletonBlock className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function AnswerSkeleton() {
  return (
    <div className="w-full max-w-4xl p-6 space-y-6 text-white" role="status" aria-label="Loading answer">
      
      {/* 1. User Profile Header (Avatar, Name, Timestamp) */}
      <div className="flex items-center space-x-3">
        {/* Avatar circle */}
        <SkeletonBlock className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          {/* User Name */}
          <SkeletonBlock className="h-4 w-32" />
          {/* Timestamp */}
          <SkeletonBlock className="h-3 w-20 opacity-60" />
        </div>
      </div>

      {/* 2. Title (e.g., "useEffect") */}
      <SkeletonBlock className="h-10 w-48 mt-4" />

      {/* 3. Code Block Container */}
      <div className="w-full rounded-lg bg-slate-900/50 p-4 border border-white/5">
        <SkeletonBlock className="h-6 w-1/3" /> {/* Represents the line of code */}
      </div>

      {/* 4. Vote Buttons */}
      <div className="pt-2">
        <VoteButtonsSkeleton />
      </div>
      
    </div>
  );
}