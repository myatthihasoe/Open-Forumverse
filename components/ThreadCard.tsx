import Link from "next/link";
import Image from "next/image";
import profile from "@/public/images/profile.jpg";
import { AiFillLike } from "react-icons/ai";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { FaMessage } from "react-icons/fa6";
import { FaShareSquare } from "react-icons/fa";

export default function ThreadCard() {
  return (
    <div className="bg-card rounded-xl px-10 py-5 space-y-7">
      <h1 className="text-xl font-bold">What is Nextjs? How to use it?</h1>
      <div className="space-x-3">
        <Link
          href={"/?filter=nextjs"}
          className="w-[100px] rounded-xl bg-tertiary text-gray-300 px-4 py-2"
        >
          NextJs
        </Link>
        <Link
          href={"/?filter=react"}
          className="w-[100px] rounded-xl bg-tertiary text-gray-300 px-4 py-2"
        >
          React
        </Link>
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
          <span>Myat Thiha Soe . asked 4 hr ago</span>
        </div>
        <div className="flex space-x-3 items-center">
          <div className="flex items-center space-x-1 text-[14px] text-gray-300">
            <span>
              <AiFillLike />
            </span>
            <span>2.2k Likes</span>
          </div>
          <div className="flex items-center space-x-1 text-[14px] text-gray-300">
            <span>
              <FaMessage />
            </span>
            <span>1.1k Answers</span>
          </div>
          <div className="flex items-center space-x-1 text-[14px] text-gray-300">
            <span>
              <FaShareSquare />
            </span>
            <span>1k Shares</span>
          </div>
        </div>
      </div>
    </div>
  );
}
