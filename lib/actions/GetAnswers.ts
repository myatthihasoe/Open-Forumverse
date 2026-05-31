"use server";

import dbConnect from "../dbConnect";
import GetAnswerSchema from "../schemas/GetAnswerSchema";
import validateData from "../validateData";
import Answer, { AnswerResponseType } from "@/database/answer.model";

const GetAnswers = async (params: {
  questionId: string;
  page: number;
  pageSize: number;
  filter: string;
}): Promise<{
  data?: {
    answers: AnswerResponseType[];
    isNext: boolean;
    totalAnswers: number;
  };
  success: boolean;
  message?: string;
  details?: string | null;
}> => {
  await dbConnect();
  const validatedData = validateData(params, GetAnswerSchema);
  const { questionId, page = 1, pageSize = 10, filter } = validatedData.data;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  let sortCriteria = {};
  switch (filter) {
    case "latest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalAnswers = await Answer.countDocuments({
      question: questionId,
    });
    const answers = await Answer.find({
      question: questionId,
    })
      .populate("author", "_id name image")
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = skip + limit < totalAnswers; //totalAnswers > skip + answers.length
    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
        totalAnswers,
      },
    };
  } catch (e) {
    return {
      success: false,
      message: "Failed to get answers",
      details: String(e),
    };
  }
};
export default GetAnswers;
