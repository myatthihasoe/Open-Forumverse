"use server";

import Question, {
  QuestionWithTagsAndSavedType,
} from "@/database/question.model";
import dbConnect from "../dbConnect";
import validateData from "../validateData";
import { actionError } from "../response";
import GetQuestionSchema from "../schemas/GetQuestionSchema";
import Tag from "@/database/tag.model";
import Collection from "@/database/collection.model";
import { auth } from "@/auth";
import { cache } from "react";

const GetQuestion = cache(async (questionId:string): Promise<{
  success: boolean;
  data?: QuestionWithTagsAndSavedType;
}> => {
  await dbConnect();
  const validatedData = validateData({questionId}, GetQuestionSchema);
  // const { questionId } = validatedData.data;


  try {
    const question = await Question.findById(questionId).populate({
      path: "tags",
      model: Tag, // Passing the actual model object instead of a string
    });
    // console.log("Question:", question);
    if (!question) {
      throw new Error("Question not found");
    }

    const auth_session = await auth();

    const collection = await Collection.findOne({
      question: questionId,
      author: auth_session?.user?.id,
    });
    return {
      success: true,
      data: { ...JSON.parse(JSON.stringify(question)), saved: !!collection },
    };
  } catch (error) {
    return actionError(error);
  }
})

export {GetQuestion}
