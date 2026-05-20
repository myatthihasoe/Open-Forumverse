// 'use client'
import { auth } from "@/auth";
import ButtonLink from "@/components/ButtonLink";
import Filters from "@/components/Filters";
import ThreadCard from "@/components/ThreadCard";
import { GetDiscussion } from "@/lib/actions/GetDiscussion.action";
import { api } from "@/lib/api";
import ROUTES from "@/routes";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const session = await auth();
  const { page, pageSize, filter, search } = await searchParams;

  const {success, data, message, details} = await GetDiscussion({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter: filter || "",
    search: search || "",
  });

  const {questions} = data || {}


  return (
    <>
      <div className="flex justify-between items-center p-5">
        <div>
          <h1 className="font-extrabold text-3xl text-white">All Threads</h1>
        </div>
        <div>
          <ButtonLink href={ROUTES.DISCUSSION_CREATE}>
            Create New Thread
          </ButtonLink>
        </div>
      </div>
      <Filters /> {
        success && data ? (
          questions?.length ? questions?.map((question,i) => (
            <ThreadCard key={i} question={question} />
          )): (
            <div className="text-center text-[22px] text-gray-400 mt-40">No threads found !</div>
          )
        ) : (
          <div className="text-red-400 text-center">{message}</div>
        )
      }
    </>
  );
}
