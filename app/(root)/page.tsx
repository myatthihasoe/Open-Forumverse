// 'use client'
import { auth } from "@/auth";
import Filters from "@/components/Filters";
import { toast, Bounce } from "react-toastify";

export default async function page({
  searchParams,
}: {
  searchParams: { search: string | null, filter: string | null };
}) {
  const session = await auth();
  const { filter, search } = await searchParams;
  console.log("Github User Data", session);
  console.log("Google user data", session);
  
  return <>
    <Filters />
    <div>
      {filter}
    </div>
  </>;
}
