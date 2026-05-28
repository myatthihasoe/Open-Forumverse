"use server";

import User, { UserType } from "@/database/user.model";
import dbConnect from "../dbConnect";
import validateData from "../validateData";
import PaginatedSearchParamsSchema from "../schemas/PaginatedSearchParamsSchema";
import { QueryFilter } from "mongoose";
import { actionError } from "../response";

const GetUsers = async (params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}): Promise<{
  success: boolean;
  data?: {
    users: UserType[];
    isNext: boolean;
  };
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const validatedData = validateData(params, PaginatedSearchParamsSchema);
  const { page = 1, pageSize = 10, search, filter } = validatedData.data;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: QueryFilter<typeof User> = {};

  if (search) {
    filterQuery.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { reputation: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalUsers = await User.countDocuments(filterQuery);
    const users = await User.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalUsers > skip + users.length;

    return {
      success: true,
      data: {
        users: JSON.parse(JSON.stringify(users)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
};

export default GetUsers;
