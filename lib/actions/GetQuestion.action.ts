"use server";

import Question, { QuestionWithTagsType } from "@/database/question.model";
import dbConnect from "../dbConnect";
import validateData from "../validateData";
import { actionError } from "../response";
import GetQuestionSchema from "../schemas/GetQuestionSchema";
import Tag from "@/database/tag.model";

export async function GetQuestion(params: { questionId: string }): Promise<{
  success: boolean;
  data?: QuestionWithTagsType;
}> {
  await dbConnect();
  const validatedData = validateData(params, GetQuestionSchema);
  const { questionId } = validatedData.data;
  //   console.log(questionId);

  try {
    const question = await Question.findById(questionId).populate({
      path: "tags",
      model: Tag, // Passing the actual model object instead of a string
    }); 
    // console.log("Question:", question);
    if (!question) {
      throw new Error("Question not found");
    }

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (error) {
    return actionError(error);
  }
}
