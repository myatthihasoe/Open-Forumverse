import AnswerForm from "@/components/AnswerForm";
import AnswerList from "@/components/AnswerList";
import PreviewMarkdown from "@/components/PreviewMarkdown";
import TagCard from "@/components/TagCard";
import VoteButtons from "@/components/VoteButton";
import GetAnswers from "@/lib/actions/GetAnswers";
import { GetQuestion } from "@/lib/actions/GetQuestion.action";
import { incrementViews } from "@/lib/actions/IncrementView";
import { notFound } from "next/navigation";
import { after } from "next/server";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: question, success } = await GetQuestion({
    questionId: id,
  });

  after(async () => {
    await incrementViews({ questionId: id });
  });

  const {
    data: answersData,
    success: answersSuccess,
    message: errorAnswer,
  } = await GetAnswers({
    questionId: id,
    page: 1,
    pageSize: 10,
    filter: "",
  });

  const { answers = [], totalAnswers = 0 } = answersData || {};

  if (!question) notFound();

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{question.title}</h1>
        <div className="flex justify-center items-center gap-3 text-xs text-gray-200">
          <VoteButtons
            type="question"
            typeId={id.toString()}
            initialUpvotes={question.upvotes}
            initialDownvotes={question.downvotes}
          />
          <div>{question.answers} Answers</div>
          <div>{question.views} Shares</div>
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
        <AnswerList
          answers={answers}
          totalAnswers={totalAnswers}
          success={answersSuccess}
          errorMessage={errorAnswer}
        />
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
