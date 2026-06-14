// 'use client'
import { auth } from "@/auth";
import ButtonLink from "@/components/ButtonLink";
import CommonFilter from "@/components/CommonFilter";
import DataRenderer from "@/components/DataRenderer";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import ThreadCard from "@/components/ThreadCard";
import { HomePageFilters, DefaultFilters } from "@/constant/filters";
import { GetDiscussion } from "@/lib/actions/GetDiscussion.action";
import { api } from "@/lib/api";
import ROUTES from "@/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Forumverse | Tags",
  description: "Tags for posts",
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const session = await auth();
  const { page, pageSize, filter, search } = await searchParams;

  const { success, data, message, details } = await GetDiscussion({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter: filter || DefaultFilters.HomePageFilters,
    search: search || "",
  });

  const { questions = [], isNext = false } = data || {};

  return (
    <>
      <div className="flex justify-between items-center p-5">
        <div>
          <h1 className="font-extrabold text-3xl text-white">All Threads</h1>
        </div>
        <div>
          <CommonFilter
            filters={HomePageFilters}
            defaultFilter={DefaultFilters.HomePageFilters}
          />
        </div>
        <div>
          <ButtonLink href={ROUTES.DISCUSSION_CREATE}>
            Create New Thread
          </ButtonLink>
        </div>
      </div>
      <Filters />
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
      <Pagination isNext={isNext} page={page} />
    </>
  );
}
