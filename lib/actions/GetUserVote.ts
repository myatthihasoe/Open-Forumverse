"use server";

import { auth } from "@/auth";
import Vote, { VoteTargetType } from "@/database/vote.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateData from "../validateData";
import GetUserVoteSchema from "../schemas/GetUserVoteSchema";

const GetUserVote = async (params: {
  type: "question" | "answer";
  typeId: string;
}): Promise<{
  success: boolean;
  data?: {
    userVote: "upvote" | "downvote" | null;
  };
  message?: string;
  details?: object | null;
}> => {
  try {
    await dbConnect();
    const auth_session = await auth();
    const userId = auth_session?.user?.id;
    if (!userId) throw new Error("Unauthorized");
    const validatedData = validateData(params, GetUserVoteSchema);

    const { type, typeId } = validatedData.data;
    const voteTargetType: VoteTargetType =
      type === "question" ? "Question" : "Answer";

    const vote = await Vote.findOne({
      author: userId,
      type_id: typeId,
      type: voteTargetType,
    });

    return {
      success: true,
      data: {
        userVote: vote?.voteType || null,
      },
    };
  } catch (e) {
    return actionError(e);
  }
};

export default GetUserVote;
