import React from "react";
import GetUser from "@/lib/actions/GetUserForProfile";
import ProfileHeader from "../components/ProfileHeader";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const result = await GetUser({ userId: id });

  if (!result.success || !result.data) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 text-zinc-700 dark:text-zinc-300">
        {result.message || "Failed to load user profile. Please try again later."}
      </div>
    );
  }

  const { user, totalQuestions, totalAnswers } = result.data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ProfileHeader user={user} totals={{ totalQuestions, totalAnswers }} />
    </div>
  );
};

export default Page;