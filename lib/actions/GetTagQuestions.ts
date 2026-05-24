"use server";

import Tag, { TagDocument } from "@/database/tag.model";
import dbConnect from "../dbConnect";
import GetTagQuestionSchema from "../schemas/GetTagQuestionSchema";
import validateData from "../validateData";
import { QueryFilter } from "mongoose";
import Question, { QuestionFullType } from "@/database/question.model";
import { actionError } from "../response";

const getTagQuestions = async (params: {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  tagId: string;
}): Promise<{
  success: boolean;
  data?: {
    tag: TagDocument;
    questions: QuestionFullType[];
    isNext: boolean;
  };
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const validatedData = validateData(params, GetTagQuestionSchema);
  const { tagId, page = 1, pageSize = 10, search } = validatedData.data;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  try {
    const tag = await Tag.findById(tagId);
    if (!tag) throw new Error("Tag not found");

    const filterQuery: QueryFilter<typeof Question> = {
      tags: { $in: [tagId] },
    };

    if (search) {
      filterQuery.title = { $regex: search, $options: "i" };
    }

    const totalQuestions = await Question.countDocuments(filterQuery);

    const questions = await Question.find(filterQuery)
      .select("_id title views answers upvotes downvotes author createdAt")
      .populate({ path: "author", select: "name image" })
      .populate({ path: "tags", select: "name" })
      .lean()
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        tag: JSON.parse(JSON.stringify(tag)),
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
};

export default getTagQuestions;
