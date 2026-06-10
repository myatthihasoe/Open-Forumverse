import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { FaMessage } from "react-icons/fa6";
import { FaShareSquare } from "react-icons/fa";
import TagCard from "./TagCard";
import { QuestionFullType } from "@/database/question.model";
import ROUTES from "@/routes";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/date";
import Actions from "@/lib/actions/Actions";

export default function ThreadCard({
  question,
  showActions = false,
}: {
  question: QuestionFullType;
  showActions?: boolean;
}) {
  const discussionId = question._id ? String(question._id) : null;
  return (
    <div className="bg-card rounded-xl px-10 py-5 space-y-7 my-3">
      <div>
        {discussionId ? (
          <Link
            href={ROUTES.DISCUSSION_DETAIL(discussionId)}
            className="hover:text-main"
          >
            <h1 className="text-xl font-bold">{question.title}</h1>
          </Link>
        ) : (
          <h1 className="text-xl font-bold">{question.title}</h1>
        )}
      </div>
      <div className="space-x-3">
        {question.tags?.map((tag, i) => (
          <TagCard key={i} href={"/?filter=" + tag.name}>
            {tag.name}
          </TagCard>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 text-gray-300 text-[14px]">
          {question.author?.image && (
            <Image
              src={question.author?.image}
              alt="profile"
              width={30}
              height={30}
              className="aspect-square rounded-full"
              // unoptimized
            />
          )}
          <span>
            {question.author?.name}{" "}
            <i className="text-gray-500 ml-2">
              {formatRelativeTime(question.createdAt!)}
            </i>
          </span>
        </div>
        <div className="flex space-x-3 items-center">
          <div className="flex items-center space-x-1 text-[14px] text-gray-300">
            <span>
              <AiFillLike />
            </span>
            <span>{question.upvotes} Likes</span>
          </div>
          <div className="flex items-center space-x-1 text-[14px] text-gray-300">
            <span>
              <FaMessage />
            </span>
            <span>{question.answers} Answers</span>
          </div>
          <div className="flex items-center space-x-1 text-[14px] text-gray-300">
            <span>
              <FaShareSquare />
            </span>
            <span>{question.views} Shares</span>
          </div>
          <Actions
            type="question"
            typeId={question._id as string}
            showActions={showActions}
          />
        </div>
      </div>
    </div>
  );
}
