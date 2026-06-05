import React from "react";
import GetUser from "@/lib/actions/GetUserForProfile";
import ProfileHeader from "../components/ProfileHeader";
import GetUserQuestions from "@/lib/actions/GetUserQuestions";
import GetUserAnswers from "@/lib/actions/GetUserAnswers";
import AnswerCard from "@/components/AnswerCard";
import DataRenderer from "@/components/DataRenderer";
import ThreadCard from "@/components/ThreadCard";
import Link from "next/link";
import { AnswerResponseType } from "@/database/answer.model";
import { QuestionFullType } from "@/database/question.model";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ tab?: string }>;
}) => {
  const { id } = await params;
  const result = await GetUser({ userId: id });
  const activeTab = (await searchParams)?.tab  || "questions";

  if (!result.success || !result.data) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 text-zinc-700 dark:text-zinc-300">
        {result.message ||
          "Failed to load user profile. Please try again later."}
      </div>
    );
  }

  let isSuccess = false;
  let errorMessage: string | undefined;
  let questions: QuestionFullType[] = [];
  let answers: AnswerResponseType[] = [];

  if (activeTab === "questions") {
    const { success, data, message } = await GetUserQuestions({
      userId: id,
    });
    questions = data?.questions ?? [];
    isSuccess = success;
    errorMessage = message;
  } else {
    const { success, data, message } = await GetUserAnswers({
      userId: id,
    });
    answers = data?.answers ?? [];
    isSuccess = success;
    errorMessage = message;
  }
  const { user, totalQuestions, totalAnswers } = result.data;
  
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ProfileHeader user={user} totals={{ totalQuestions, totalAnswers }} />
      <div className="my-7 space-x-5">
        <Link
          href={`/profile/${id}?tab=questions`}
          className={` border-white border rounded-xl px-2 py-1 ${
            activeTab === "questions" ? "bg-main" : "bg-primary"
          }`}
        >
          Top Questions
        </Link>
        <Link
          href={`/profile/${id}?tab=answers`}
          className={` border-white border rounded-xl px-2 py-1 ${
            activeTab === "answers" ? "bg-main" : "bg-primary"
          }`}
        >
          Top Answers
        </Link>
      </div>
      {activeTab === "questions" ? (
        <DataRenderer<QuestionFullType>
          success={isSuccess}
          data={questions}
          errorMessage={errorMessage}
          render={(questions) =>
            questions.map((question) => (
              <ThreadCard key={String(question._id)} question={question} />
            ))
          }
        />
      ) : (
        <DataRenderer<AnswerResponseType>
          success={isSuccess}
          data={answers}
          errorMessage={errorMessage}
          render={(answers) =>
            answers.map((answer) => (
              <AnswerCard key={answer._id.toString()} answer={answer} />
            ))
          }
        />
      )}
    </div>
  );
};

export default Page;
