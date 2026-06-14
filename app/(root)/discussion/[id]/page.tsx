import AnswerForm from "@/components/AnswerForm";
import AnswerList from "@/components/AnswerList";
import PreviewMarkdown from "@/components/PreviewMarkdown";
import TagCard from "@/components/TagCard";
import ToggleBookMark from "@/components/ToggleBookMark";
import VoteButtons from "@/components/VoteButton";
import { GetQuestion } from "@/lib/actions/GetQuestion.action";
import GetUserVote from "@/lib/actions/GetUserVote";
import { incrementViews } from "@/lib/actions/IncrementView";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { Suspense } from "react";
import {
  AnswerSkeleton,
  VoteButtonsSkeleton,
} from "@/components/SkeletonLoaders";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: question } = await GetQuestion({
    questionId: id,
  });

  return {
    title: question?.title,
    description: question?.content.slice(0, 100),
  };
}

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { page, pageSize, filter } = await searchParams;
  const pageNum = page ? parseInt(Array.isArray(page) ? page[0] : page, 10) : 1;
  const pageSizeNum = pageSize
    ? parseInt(Array.isArray(pageSize) ? pageSize[0] : pageSize, 10)
    : 10;
  const filterStr = Array.isArray(filter) ? filter[0] : filter;
  const { data: question } = await GetQuestion({
    questionId: id,
  });

  after(async () => {
    await incrementViews({ questionId: id });
  });

  if (!question) notFound();

  // const isSaved = !!(question as any)?.saved;

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{question.title}</h1>
        <div className="flex justify-center items-center gap-3 text-xs text-gray-200">
          <Suspense fallback={<VoteButtonsSkeleton />}>
            <VoteButtons
              GetUserVotePromise={GetUserVote({
                type: "question",
                typeId: id,
              })}
              type="question"
              typeId={id.toString()}
              initialUpvotes={question.upvotes}
              initialDownvotes={question.downvotes}
            />
          </Suspense>
          <div>{question.answers} Answers</div>
          <div>{question.views} Shares</div>
          <div>
            <ToggleBookMark questionId={id} saved={question.saved} />
          </div>
        </div>
      </div>
      <div className="my-3">
        <PreviewMarkdown content={question.content} />
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag, i) => (
          <TagCard key={i} href={`/tags/${tag._id}`}>
            {tag.name}
          </TagCard>
        ))}
      </div>
      <div className="my-3">
        <Suspense fallback={<AnswerSkeleton />}>
          <AnswerList
            page={pageNum}
            pageSize={pageSizeNum}
            filter={filterStr as string}
            id={id}
          />
        </Suspense>
      </div>
      <div className="my-3">
        <AnswerForm
          questionId={id}
          questionTitle={question.title}
          questionContent={question.content}
        />
      </div>
    </div>
  );
}
