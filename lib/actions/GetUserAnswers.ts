import dbConnect from "../dbConnect";
import validateData from "../validateData";
import GetUserAnswersSchema from "../schemas/GetUserAnswersSchema";
import { actionError } from "../response";
import Answer, { AnswerDocument } from "@/database/answer.model";


const GetUserAnswers = async (params: {
  userId: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  success: boolean;
  data?: {
    answers: AnswerDocument[];
    isNext: boolean;
  };
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const validatedData = validateData(params, GetUserAnswersSchema);
  const { userId, page = 1, pageSize = 10 } = validatedData.data;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  try {
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const answers = await Answer.find({ author: userId })
      .populate("question", "_id title")
      .populate("author", "_id name image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
};

export default GetUserAnswers;
