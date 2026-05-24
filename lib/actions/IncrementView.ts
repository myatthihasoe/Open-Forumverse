"use server";
import validateData from "@/lib/validateData";
import IncrementViewSchema from "../schemas/IncrementViewSchema";
import { actionError } from "../response";
import Question from "@/database/question.model";
export async function incrementViews(params: { questionId: string }): Promise<{
  success: boolean;
  data?: { views: number };
  message?: string;
  details?: object | null;
}> {
  const validatedData = validateData(params, IncrementViewSchema);
  const { questionId } = validatedData.data;

  try {
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!question) throw new Error("Question not found");

    return {
      success: true,
      data: {
        views: question.views,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
