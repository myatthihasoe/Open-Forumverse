"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateData from "../validateData";
import DeleteAnswerSchema from "../schemas/DeleteAnswerSchema";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Vote from "@/database/vote.model";
import { revalidatePath } from "next/cache";
import ROUTES from "@/routes";
import mongoose from "mongoose";

const deleteAnswer = async (params: { answerId: string }) => {
  await dbConnect();
  const validatedData = validateData(params, DeleteAnswerSchema);
  const { answerId } = validatedData.data;
  const auth_session = await auth();
  const user = auth_session?.user;

  if (!user) {
    throw new Error("Not authenticated");
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    if (answer.author.toString() !== user.id) {
      throw new Error("Not authorized");
    }

    await Question.findByIdAndUpdate(
      answer.question,
      {
        $inc: { answers: -1 },
      },
      { new: true, session }
    );

    await Vote.deleteMany({
      actionId: answerId,
      actionType: "answer",
    }, { session });

    await Answer.findByIdAndDelete(answerId).session(session);

    revalidatePath(ROUTES.PROFILE(user?.id as string));

    return { success: true };
  } catch (e) {
    await session.abortTransaction();
    return actionError(e);
  } finally {
    session.endSession();
  }
};

export default deleteAnswer;
