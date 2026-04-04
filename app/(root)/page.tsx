// 'use client'
import { auth } from "@/auth";
import Button from "@/components/Button";
import Filters from "@/components/Filters";
import ThreadCard from "@/components/ThreadCard";
import { toast, Bounce } from "react-toastify";

export default async function page({
  searchParams,
}: {
  searchParams: { search: string | null; filter: string | null };
}) {
  const session = await auth();
  const { filter, search } = await searchParams;
  console.log("Github User Data", session);
  console.log("Google user data", session);

  return (
    <>
      <div className="flex justify-between items-center p-5">
        <div>
          <h1 className="font-extrabold text-3xl text-white">All Threads</h1>
        </div>
        <div>
          <Button>Create New Thread</Button>
        </div>
      </div>
      <Filters />
      <ThreadCard />
    </>
  );
}
