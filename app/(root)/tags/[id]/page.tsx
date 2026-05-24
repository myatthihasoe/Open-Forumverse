// 'use client'
import { auth } from "@/auth";
import ButtonLink from "@/components/ButtonLink";
import DataRenderer from "@/components/DataRenderer";
import Filters from "@/components/Filters";
import ThreadCard from "@/components/ThreadCard";
import { GetDiscussion } from "@/lib/actions/GetDiscussion.action";
import getTagQuestions from "@/lib/actions/GetTagQuestions";
import { api } from "@/lib/api";
import ROUTES from "@/routes";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { id } = await params;
  const { page, pageSize, search } = await searchParams;

  const { success, data, message, details } = await getTagQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    tagId: id,
    sort: "newest",
    search: search || "",
  });

  const { questions = [], tag } = data || {};
  // console.log("Questions:", questions)
  console.log("Tag:", tag);

  return (
    <>
      <div className="flex justify-between items-center p-5">
        <div>
          <h1 className="font-extrabold text-3xl text-white">
            {tag?.name || ""}
          </h1>
        </div>
      </div>

      <DataRenderer
        success={success}
        data={questions}
        errorMessage={message}
        render={(questions) =>
          questions?.map((question, i) => (
            <ThreadCard key={i} question={question} />
          ))
        }
      />
    </>
  );
}
