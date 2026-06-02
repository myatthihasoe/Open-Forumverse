import User, { UserType } from "@/database/user.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import GetUserParamsSchema from "../schemas/GetUserParamsSchema";
import validateData from "../validateData";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";

const GetUser = async (params: {
  userId: string;
}): Promise<{
  data?: {
    user: UserType;
    totalQuestions: number;
    totalAnswers: number;
  };
  success: boolean;
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const validatedData = validateData(params, GetUserParamsSchema);
  const { userId } = validatedData.data;

  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User Not Found");

    const [totalQuestions, totalAnswers] = await Promise.all([
      Question.countDocuments({ author: userId }),
      Answer.countDocuments({ author: userId }),
    ]);

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
        totalQuestions,
        totalAnswers,
      },
    };
  } catch (e) {
    return actionError(e);
  }
};

export default GetUser;
