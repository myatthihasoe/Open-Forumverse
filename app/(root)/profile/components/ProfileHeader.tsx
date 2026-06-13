import Button from "@/components/Button";
import Image from "next/image";
import GetUser from "@/lib/actions/GetUserForProfile";

function getInitials(name?: string) {
  if (!name) return "U";
  const parts = name.trim().split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase() || "U";
}

const ProfileHeader = async ({ userId }: { userId: string }) => {
  const result = await GetUser({ userId });
  if (!result.success || !result.data) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 text-slate-300">
        {result.message ||
          "Failed to load user profile. Please try again later."}
      </div>
    );
  }
  const { user, totalQuestions, totalAnswers } = result.data;

  const { name, username, bio, image, location, portfolio, reputation } = user;

  return (
    <section className="w-full rounded-xl border border-tertiary bg-primary p-6 shadow-sm">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-tertiary">
          {image ? (
            // Using img to avoid external domain config issues
            <Image
              src={image}
              alt={name || username}
              className="h-full w-full object-cover"
              width={96}
              height={96}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-slate-200">
              {getInitials(name || username)}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="truncate text-2xl font-semibold text-white">
              {name || username}
            </h1>
            <span className="rounded-full bg-tertiary px-3 py-1 text-sm text-slate-200">
              @{username}
            </span>
            <span className="rounded-full bg-amber-900/40 px-3 py-1 text-sm font-medium text-amber-300">
              {typeof reputation === "number" ? reputation : 0} rep
            </span>
          </div>

          {bio ? (
            <p className="max-w-prose text-sm text-slate-300">
              {bio}
            </p>
          ) : (
            <p className="text-sm text-slate-400">
              No bio provided.
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
            {location ? (
              <div className="inline-flex items-center gap-2 text-slate-300">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                <span>{location}</span>
              </div>
            ) : null}

            {portfolio ? (
              <a
                href={
                  /^https?:\/\//.test(portfolio)
                    ? portfolio
                    : `https://${portfolio}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline-offset-2 hover:underline"
              >
                Portfolio
              </a>
            ) : null}
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <Button variant="normal">Edit Profile</Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-tertiary p-4">
          <div className="text-xs uppercase text-slate-400">
            Questions
          </div>
          <div className="mt-1 text-2xl font-semibold text-white">
            {totalQuestions}
          </div>
        </div>
        <div className="rounded-lg border border-tertiary p-4">
          <div className="text-xs uppercase text-slate-400">
            Answers
          </div>
          <div className="mt-1 text-2xl font-semibold text-white">
            {totalAnswers}
          </div>
        </div>
        <div className="rounded-lg border border-tertiary p-4">
          <div className="text-xs uppercase text-slate-400">
            Reputation
          </div>
          <div className="mt-1 text-2xl font-semibold text-white">
            {typeof user.reputation === "number" ? user.reputation : 0}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
