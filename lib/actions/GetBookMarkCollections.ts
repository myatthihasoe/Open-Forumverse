"use server";

import Collection from "@/database/collection.model";
import type { CollectionWithQuestionType } from "@/database/collection.model";
import dbConnect from "../dbConnect";
import { auth } from "@/auth";
import validateData from "../validateData";
import PaginatedSearchParamsSchema from "../schemas/PaginatedSearchParamsSchema";
import Question from "@/database/question.model";
import { QueryFilter } from "mongoose";
import { actionError } from "../response";

const GetBookMarkCollections = async (params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}): Promise<{
  success: boolean;
  data?: {
    collections: CollectionWithQuestionType[];
    isNext: boolean;
  };
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const auth_session = await auth();
  const userId = auth_session?.user?.id;

  const validatedData = validateData(params, PaginatedSearchParamsSchema);
  const { page = 1, pageSize = 10, search, filter, sort } = validatedData.data;

  const skip = Number(page - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: QueryFilter<typeof Collection> = { author: userId };

  if (search) {
    const matchingQuestions = await Question.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
    }).select("_id"); // [{ _id: "123" }, { _id: "456" }]
    // console.log("Matching Q:", matchingQuestions)

    const matchingQuestionIds = matchingQuestions.map((q) => q._id); // ["123", "456"]
    if (matchingQuestionIds.length) {
      return {
        success: true,
        data: {
          collections: [],
          isNext: false,
        },
      };
    }
    filterQuery.question = { $in: matchingQuestionIds };
  }

  let sortCriteria = {};

  switch (filter) {
    case "most_recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    case "most_answered":
      sortCriteria = { answers: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalCollections = await Collection.countDocuments(filterQuery);
    const collections = await Collection.find(filterQuery)
      .populate({
        path: "question",
        populate: [
          { path: "tags", select: "_id name" },
          { path: "author", select: "_id name" },
        ],
      })
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalCollections > skip + collections.length;
    return {
      success: true,
      data: {
        collections: JSON.parse(JSON.stringify(collections)),
        isNext,
      },
      message: "Collections retrieved successfully",
    };
  } catch (e) {
    return actionError(e);
  }
};

export default GetBookMarkCollections;
