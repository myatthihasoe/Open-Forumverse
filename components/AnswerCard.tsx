import PreviewMarkdown from "@/components/PreviewMarkdown";
import { AnswerType } from "@/database/answer.model";
import { formatRelativeTime } from "@/lib/date";
import VoteButtons from "./VoteButton";

function AnswerCard({ answer }: { answer: AnswerType }) {
  const authorName =
    typeof answer.author === "object" && "name" in answer.author
      ? (answer.author.name as string)
      : "Anonymous";
  const upvotes = answer.upvotes ?? 0;
  const downvotes = answer.downvotes ?? 0;

  const initial = authorName?.charAt(0)?.toUpperCase?.() || "?";

  return (
    <article className="w-full  border-b-[0.5px] border-tertiary  shadow-sm transition hover:shadow  border-tertiary-800 dark:bg-tertiary-900 my-5 py-6">
      <header className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
            {authorName}
            <span className="text-gray-500">
              {" "}
              answered{" "}
              {formatRelativeTime(
                (answer as AnswerType & { createdAt?: string }).createdAt!
              )}
            </span>
          </p>
        </div>
      </header>

      <div className="prose prose-slate max-w-none text-slate-800 dark:prose-invert dark:text-slate-100">
        <PreviewMarkdown content={answer.content} />
      </div>

      <footer className="mt-4 flex items-center justify-between">
        <VoteButtons
          type="answer"
          typeId={answer?._id}
          initialUpvotes={answer.upvotes}
          initialDownvotes={answer.downvotes}
        />
      </footer>
    </article>
  );
}

export default AnswerCard;
