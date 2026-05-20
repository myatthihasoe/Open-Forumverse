import Image from "next/image";
import profile from "@/public/images/profile.jpg";
import { AiFillLike } from "react-icons/ai";
import { FaMessage } from "react-icons/fa6";
import { FaShareSquare } from "react-icons/fa";
import TagCard from "./TagCard";
import { QuestionType, QuestionWithTagsType } from "@/database/question.model";

export default function ThreadCard({question}: {question: QuestionWithTagsType}) {
  return (
    <div className="bg-card rounded-xl px-10 py-5 space-y-7 my-3">
      <h1 className="text-xl font-bold">{question.title}</h1>
      <div className="space-x-3">
        {question.tags?.map((tag, i) => (
          <TagCard key={i} href={"/?filter=" + tag.name }>{tag.name}</TagCard>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 text-gray-300 text-[14px]">
          <Image
            src={profile}
            alt="profile"
            width={30}
            height={30}
            className="aspect-square rounded-full"
          />
          <span>{question.author?.name} . 3 hr ago</span>
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
        </div>
      </div>
    </div>
  );
}
