import Question, { QuestionFullType } from "@/database/question.model";
import dbConnect from "../dbConnect";
import validateData from "../validateData";
import GetUserQuestionsSchema from "../schemas/GetUserQuestionsSchema";
import { actionError } from "../response";

const GetUserQuestions = async (params: {
  userId: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  success: boolean;
  data?: {
    questions: QuestionFullType[];
    isNext: boolean;
  };
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const validatedData = validateData(params, GetUserQuestionsSchema);
  const { userId, page = 1, pageSize = 10 } = validatedData.data;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  try {
    const totalQuestions = await Question.countDocuments({ author: userId });
    const questions = await Question.find({ author: userId })
      .populate("tags", "name")
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
};

export default GetUserQuestions;
