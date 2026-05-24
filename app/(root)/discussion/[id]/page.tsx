import TagCard from "@/components/TagCard";
import { GetQuestion } from "@/lib/actions/GetQuestion.action";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: question, success } = await GetQuestion({
    questionId: id,
  });

  if (!question) notFound();

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{question.title}</h1>
        <div className="flex justify-center gap-3 text-xs text-gray-200">
          <div>{question.upvotes} Likes</div>
          <div>{question.downvotes} Dislikes</div>
          <div>{question.answers} Answers</div>
          <div>{question.views} Shares</div>
        </div>
      </div>
      <div className="my-3">{question.content}</div>
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag, i) => (
          <TagCard key={i} href={`/tags/${tag._id}`}>
            {tag.name}
          </TagCard>
        ))}
      </div>
    </div>
  );
}
